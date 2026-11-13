import { promises as fs } from "node:fs";
import path from "node:path";
import { getSecret } from "astro:env/server";
import { ID_PATTERN } from "./session-doc";

/**
 * Where session files are read from and written to.
 *
 * On Vercel: the GitHub repo, through the contents API, with GITHUB_TOKEN (a
 * fine-grained token limited to this one repo, Contents: read and write).
 * Every save is a commit on GITHUB_BRANCH, and Vercel rebuilds the site from
 * it. Members never see GitHub.
 *
 * In `astro dev` without a token: the files on this machine, so the editor
 * can be tried locally without touching the repo.
 */

const DIR = "src/content/sessions";

export interface StoredFile {
  id: string;
  content: string;
  /** GitHub blob sha: guards against overwriting someone else's newer save. */
  sha?: string;
}

export class ConflictError extends Error {}
export class StoreError extends Error {}

export interface Store {
  kind: "github" | "local";
  list(): Promise<StoredFile[]>;
  get(id: string): Promise<StoredFile | null>;
  /** Create a new file. Fails if one with this id exists. */
  create(id: string, content: string, message: string): Promise<void>;
  /** Replace a file. `sha` is the version the editor opened. */
  update(id: string, content: string, message: string, sha?: string): Promise<void>;
  remove(id: string, message: string, sha?: string): Promise<void>;
}

const fileFor = (id: string) => {
  if (!ID_PATTERN.test(id)) throw new StoreError("Invalid session id");
  return `${DIR}/${id}.md`;
};

/* ---------------------------------------------------------------- GitHub */

function githubStore(token: string, repo: string, branch: string): Store {
  const api = `https://api.github.com/repos/${repo}/contents`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "eyp-az-admin",
  };
  const ref = `ref=${encodeURIComponent(branch)}`;

  async function call(url: string, init?: RequestInit) {
    const res = await fetch(url, { ...init, headers });
    // 409: the sha is stale. 422: a create hit an existing file (no sha sent).
    if (res.status === 409 || res.status === 422) {
      throw new ConflictError("Someone else changed this session after you opened it. Go back to the list and try again.");
    }
    return res;
  }

  async function get(id: string): Promise<StoredFile | null> {
    const res = await call(`${api}/${fileFor(id)}?${ref}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new StoreError(`GitHub returned ${res.status} reading ${id}`);
    const j = (await res.json()) as { content: string; sha: string };
    return { id, content: Buffer.from(j.content, "base64").toString("utf8"), sha: j.sha };
  }

  async function put(id: string, content: string, message: string, sha?: string) {
    const res = await call(`${api}/${fileFor(id)}`, {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: Buffer.from(content, "utf8").toString("base64"),
        branch,
        ...(sha ? { sha } : {}),
      }),
    });
    if (!res.ok) throw new StoreError(`GitHub returned ${res.status} saving ${id}`);
  }

  return {
    kind: "github",
    get,
    async list() {
      const res = await call(`${api}/${DIR}?${ref}`);
      if (res.status === 404) return [];
      if (!res.ok) throw new StoreError(`GitHub returned ${res.status} listing sessions`);
      const entries = (await res.json()) as { name: string; type: string }[];
      const ids = entries
        .filter((e) => e.type === "file" && e.name.endsWith(".md"))
        .map((e) => e.name.slice(0, -3))
        .filter((id) => ID_PATTERN.test(id));
      const files = await Promise.all(ids.map(get));
      return files.filter((f): f is StoredFile => f !== null);
    },
    create: (id, content, message) => put(id, content, message),
    update: (id, content, message, sha) => {
      if (!sha) throw new StoreError("Missing version for an update");
      return put(id, content, message, sha);
    },
    async remove(id, message, sha) {
      if (!sha) throw new StoreError("Missing version for a delete");
      const res = await call(`${api}/${fileFor(id)}`, {
        method: "DELETE",
        body: JSON.stringify({ message, sha, branch }),
      });
      if (!res.ok) throw new StoreError(`GitHub returned ${res.status} deleting ${id}`);
    },
  };
}

/* ----------------------------------------------------------------- local */

function localStore(): Store {
  const abs = (id: string) => path.resolve(process.cwd(), fileFor(id));

  async function get(id: string): Promise<StoredFile | null> {
    try {
      return { id, content: await fs.readFile(abs(id), "utf8") };
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw e;
    }
  }

  return {
    kind: "local",
    get,
    async list() {
      const names = await fs.readdir(path.resolve(process.cwd(), DIR));
      const ids = names
        .filter((n) => n.endsWith(".md"))
        .map((n) => n.slice(0, -3))
        .filter((id) => ID_PATTERN.test(id));
      const files = await Promise.all(ids.map(get));
      return files.filter((f): f is StoredFile => f !== null);
    },
    async create(id, content) {
      try {
        await fs.writeFile(abs(id), content, { encoding: "utf8", flag: "wx" });
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "EEXIST") throw new ConflictError("A session with this id already exists.");
        throw e;
      }
    },
    async update(id, content) {
      await fs.writeFile(abs(id), content, "utf8");
    },
    async remove(id) {
      await fs.unlink(abs(id));
    },
  };
}

/** null = not configured (deployed without a token). */
export function getStore(): Store | null {
  const token = getSecret("GITHUB_TOKEN");
  if (token) {
    return githubStore(token, getSecret("GITHUB_REPO") ?? "aykhanstoic/openpar", getSecret("GITHUB_BRANCH") ?? "dev");
  }
  return import.meta.env.DEV ? localStore() : null;
}
