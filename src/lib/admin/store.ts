import { promises as fs } from "node:fs";
import path from "node:path";
import { getSecret } from "astro:env/server";
import { ID_PATTERN } from "./frontmatter";

/**
 * Where the editable files are read from and written to.
 *
 * On Vercel: the GitHub repo, through the contents API, with GITHUB_TOKEN (a
 * fine-grained token limited to this one repo, Contents: read and write).
 * Every save is a commit on GITHUB_BRANCH, and Vercel rebuilds the site from
 * it. Members never see GitHub.
 *
 * In `astro dev` without a token: the files on this machine, so the editor
 * can be tried locally without touching the repo.
 */

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
  /**
   * Write and delete several repo files in one commit (an entry plus its
   * photo). `content: null` deletes. `expect` refuses the commit if that file
   * changed since the editor opened it (sha), or exists when it should not.
   */
  commit(changes: Change[], message: string, expect?: { path: string; sha?: string; mustNotExist?: boolean }): Promise<void>;
  /** Raw bytes of a repo file (for photo previews in /admin). */
  readRaw(repoPath: string): Promise<Buffer | null>;
}

export interface Change {
  /** Path from the repo root, e.g. src/assets/uploads/board/x.jpg */
  path: string;
  content: Buffer | string | null;
}

/** Repo path of an entry's file. */
export const pathOf = (folder: Folder, id: string) => fileFor(folder, id);

/** A folder of files, e.g. `src/content/sessions` with extension `md`. */
export interface Folder {
  dir: string;
  ext: "md" | "json";
}

const fileFor = (folder: Folder, id: string) => {
  if (!ID_PATTERN.test(id)) throw new StoreError("Invalid id");
  return `${folder.dir}/${id}.${folder.ext}`;
};

const idsFrom = (names: string[], folder: Folder) =>
  names
    .filter((n) => n.endsWith(`.${folder.ext}`))
    .map((n) => n.slice(0, -(folder.ext.length + 1)))
    .filter((id) => ID_PATTERN.test(id));

/* ---------------------------------------------------------------- GitHub */

function githubStore(folder: Folder, token: string, repo: string, branch: string): Store {
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
      throw new ConflictError("Someone else changed this after you opened it. Go back, open it again, and redo your change.");
    }
    if (res.status === 401 || res.status === 403) {
      throw new StoreError(
        `GitHub refused (${res.status}). The GITHUB_TOKEN in Vercel is missing, expired, or lacks "Contents: Read and write" on ${repo}.`,
      );
    }
    return res;
  }

  async function get(id: string): Promise<StoredFile | null> {
    const res = await call(`${api}/${fileFor(folder, id)}?${ref}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new StoreError(`GitHub returned ${res.status} reading ${id}`);
    const j = (await res.json()) as { content: string; sha: string };
    return { id, content: Buffer.from(j.content, "base64").toString("utf8"), sha: j.sha };
  }

  async function put(id: string, content: string, message: string, sha?: string) {
    const res = await call(`${api}/${fileFor(folder, id)}`, {
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
      const res = await call(`${api}/${folder.dir}?${ref}`);
      if (res.status === 404) return [];
      if (!res.ok) throw new StoreError(`GitHub returned ${res.status} listing ${folder.dir}`);
      const entries = (await res.json()) as { name: string; type: string }[];
      const ids = idsFrom(entries.filter((e) => e.type === "file").map((e) => e.name), folder);
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
      const res = await call(`${api}/${fileFor(folder, id)}`, {
        method: "DELETE",
        body: JSON.stringify({ message, sha, branch }),
      });
      if (!res.ok) throw new StoreError(`GitHub returned ${res.status} deleting ${id}`);
    },
    async readRaw(repoPath) {
      const res = await fetch(`${api}/${repoPath}?${ref}`, { headers: { ...headers, Accept: "application/vnd.github.raw" } });
      if (res.status === 404) return null;
      if (!res.ok) throw new StoreError(`GitHub returned ${res.status} reading ${repoPath}`);
      return Buffer.from(await res.arrayBuffer());
    },
    async commit(changes, message, expect) {
      const git = `https://api.github.com/repos/${repo}/git`;
      const json = async (url: string, init?: RequestInit) => {
        const res = await call(url, { ...init, headers });
        if (!res.ok) throw new StoreError(`GitHub returned ${res.status} (${url.replace(git, "git")})`);
        return res.json();
      };

      /* Checked at `head`, the commit the new one is built on. The ref update below
         is fast-forward only, so if the tip moved after this check it fails and the
         next attempt checks again. A missing sha never matches, so a form that lost
         its sha fails safe; callers saving a file that did not exist pass mustNotExist. */
      const check = async (head: string) => {
        if (!expect) return;
        const res = await call(`${api}/${expect.path}?ref=${head}`);
        if (!res.ok && res.status !== 404) throw new StoreError(`GitHub returned ${res.status} reading ${expect.path}`);
        const found = res.status === 404 ? null : ((await res.json()) as { sha: string }).sha;
        if (expect.mustNotExist ? found !== null : found !== expect.sha) {
          throw new ConflictError(
            expect.mustNotExist
              ? "Something with this name already exists."
              : "Someone else changed this after you opened it. Go back, open it again, and redo your change.",
          );
        }
      };

      // Two tries: if someone else committed in between, start again from the new tip.
      for (let attempt = 0; attempt < 2; attempt++) {
        const head = (await json(`${git}/ref/heads/${encodeURIComponent(branch)}`)).object.sha as string;
        await check(head);
        const baseTree = (await json(`${git}/commits/${head}`)).tree.sha as string;
        const tree = await Promise.all(
          changes.map(async (c) => {
            if (c.content === null) return { path: c.path, mode: "100644", type: "blob", sha: null };
            const buf = typeof c.content === "string" ? Buffer.from(c.content, "utf8") : c.content;
            const blob = await json(`${git}/blobs`, { method: "POST", body: JSON.stringify({ content: buf.toString("base64"), encoding: "base64" }) });
            return { path: c.path, mode: "100644", type: "blob", sha: blob.sha as string };
          }),
        );
        const newTree = await json(`${git}/trees`, { method: "POST", body: JSON.stringify({ base_tree: baseTree, tree }) });
        const commit = await json(`${git}/commits`, { method: "POST", body: JSON.stringify({ message, tree: newTree.sha, parents: [head] }) });
        const res = await fetch(`${git}/refs/heads/${encodeURIComponent(branch)}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ sha: commit.sha, force: false }),
        });
        if (res.ok) return;
        if (res.status !== 422 || attempt === 1) throw new StoreError(`GitHub returned ${res.status} saving`);
      }
    },
  };
}

/* ----------------------------------------------------------------- local */

function localStore(folder: Folder): Store {
  const abs = (id: string) => path.resolve(process.cwd(), fileFor(folder, id));

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
      let names: string[] = [];
      try {
        names = await fs.readdir(path.resolve(process.cwd(), folder.dir));
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
      }
      const files = await Promise.all(idsFrom(names, folder).map(get));
      return files.filter((f): f is StoredFile => f !== null);
    },
    async create(id, content) {
      try {
        await fs.writeFile(abs(id), content, { encoding: "utf8", flag: "wx" });
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "EEXIST") throw new ConflictError("Something with this name already exists.");
        throw e;
      }
    },
    async update(id, content) {
      await fs.writeFile(abs(id), content, "utf8");
    },
    async remove(id) {
      await fs.unlink(abs(id));
    },
    async readRaw(repoPath) {
      try {
        return await fs.readFile(path.resolve(process.cwd(), repoPath));
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
        throw e;
      }
    },
    async commit(changes, _message, expect) {
      if (expect?.mustNotExist) {
        const exists = await fs.access(path.resolve(process.cwd(), expect.path)).then(() => true, () => false);
        if (exists) throw new ConflictError("Something with this name already exists.");
      }
      for (const c of changes) {
        const target = path.resolve(process.cwd(), c.path);
        if (c.content === null) await fs.rm(target, { force: true });
        else {
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.writeFile(target, c.content);
        }
      }
    },
  };
}

/** null = not configured (deployed without a token). */
export function getStore(folder: Folder): Store | null {
  const token = getSecret("GITHUB_TOKEN");
  if (token) {
    return githubStore(folder, token, getSecret("GITHUB_REPO") ?? "aykhanstoic/openpar", getSecret("GITHUB_BRANCH") ?? "dev");
  }
  return import.meta.env.DEV ? localStore(folder) : null;
}

/** "Saved." follow-up line: where the change went. */
export function publishNote(kind: Store["kind"] | undefined): string {
  return kind === "local"
    ? "Local mode: only the files on this computer changed. Nothing was sent to GitHub."
    : "The website updates in about two minutes.";
}
