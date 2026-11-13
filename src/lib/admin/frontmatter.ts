import yaml from "js-yaml";

/** Reading and writing the markdown files behind sessions, news, board and partners. */

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export interface ParsedEntry {
  data: Record<string, unknown>;
  body: string;
}

export function parseEntry(source: string): ParsedEntry {
  const m = FRONTMATTER.exec(source);
  if (!m) return { data: {}, body: source };
  const data = (yaml.load(m[1]) ?? {}) as Record<string, unknown>;
  return { data, body: m[2].replace(/^\r?\n/, "") };
}

/** YAML turns a bare 2026-12-11 into a Date; the form wants the string back. */
export const toIso = (v: unknown): string =>
  v instanceof Date ? v.toISOString().slice(0, 10) : v == null ? "" : String(v);

/**
 * `data` in the order the keys should appear. Keys of `previous` that the
 * form does not know (a `cover` image added by hand, say) are kept, so an
 * edit never silently drops them. `undefined` values are left out.
 */
export function serializeEntry(data: Record<string, unknown>, body: string | null, previous?: ParsedEntry): string {
  const out: Record<string, unknown> = { ...data };
  for (const [k, v] of Object.entries(previous?.data ?? {})) {
    if (!(k in data)) out[k] = v instanceof Date ? toIso(v) : v;
  }
  for (const k of Object.keys(out)) if (out[k] === undefined) delete out[k];

  const front = yaml.dump(out, { lineWidth: -1, quotingType: '"' });
  const text = (body ?? previous?.body ?? "").replace(/\r\n/g, "\n").trim();
  return `---\n${front}---\n${text ? `\n${text}\n` : ""}`;
}

/** File names the editor may touch. Also stops `../` in a URL reaching the disk or the API. */
export const ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,79}$/;

export function slugify(text: string, suffix = ""): string {
  const base = text
    .toLowerCase()
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  if (!base) return suffix ? `entry-${suffix}` : "entry";
  return suffix && !base.includes(suffix) ? `${base}-${suffix}` : base;
}
