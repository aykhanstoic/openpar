import yaml from "js-yaml";
import { z } from "astro/zod";
import { SESSION_LANGS, SESSION_STATUSES, SESSION_TYPES } from "../session-fields";

/**
 * A session as the /admin form sees it, and the conversion to and from the
 * markdown file in src/content/sessions/. The rules mirror the content schema
 * in src/content.config.ts, so a form that passes here also passes the build:
 * a bad entry gets an error on the form instead of a failed deploy.
 */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const text = (max: number) => z.string().trim().max(max, `At most ${max} characters`);
const required = (max: number) => text(max).min(1, "Required");
const optional = (max: number) => text(max).transform((v) => (v === "" ? undefined : v));
const date = z
  .string()
  .trim()
  .regex(ISO_DATE, "Pick a date")
  .refine((v) => !Number.isNaN(Date.parse(v)), "Not a real date");
const optionalDate = z
  .string()
  .trim()
  .refine((v) => v === "" || (ISO_DATE.test(v) && !Number.isNaN(Date.parse(v))), "Not a real date")
  .transform((v) => (v === "" ? undefined : v));
const https = z
  .string()
  .trim()
  .refine((v) => {
    if (v === "") return true;
    try {
      return new URL(v).protocol === "https:";
    } catch {
      return false;
    }
  }, "Must be a full link starting with https://")
  .transform((v) => (v === "" ? undefined : v));

export const sessionFormSchema = z
  .object({
    title: required(120),
    theme: required(200),
    summary: optional(300),
    venue: required(120),
    city: optional(60),
    startDate: date,
    endDate: date,
    status: z.enum(SESSION_STATUSES),
    applyDeadline: optionalDate,
    type: z.union([z.enum(SESSION_TYPES), z.literal("")]).transform((v) => (v === "" ? undefined : v)),
    outreach: z.boolean(),
    applyUrl: https,
    resolutionsUrl: https,
    lang: z.enum(SESSION_LANGS),
    draft: z.boolean(),
    body: text(20000),
    /** Who is saving. Goes into the commit message only, never onto the site. */
    editor: required(60),
  })
  .refine((d) => d.endDate >= d.startDate, {
    message: "End date must not be before the start date",
    path: ["endDate"],
  })
  .refine((d) => d.status !== "call-open" || Boolean(d.applyUrl), {
    message: "An open call needs an apply link",
    path: ["applyUrl"],
  });

export type SessionForm = z.infer<typeof sessionFormSchema>;

/** Raw form values, as strings, for re-filling the form after an error. */
export type SessionFormValues = Record<string, string>;

const FIELDS = [
  "title", "theme", "summary", "venue", "city", "startDate", "endDate", "status",
  "applyDeadline", "type", "applyUrl", "resolutionsUrl", "lang", "body", "editor",
] as const;

export function readForm(data: FormData): { values: SessionFormValues; input: Record<string, unknown> } {
  const values: SessionFormValues = {};
  for (const f of FIELDS) values[f] = String(data.get(f) ?? "");
  values.outreach = data.get("outreach") ? "on" : "";
  values.draft = data.get("draft") ? "on" : "";
  return {
    values,
    input: { ...values, outreach: values.outreach === "on", draft: values.draft === "on" },
  };
}

export type Validation = { ok: true; data: SessionForm } | { ok: false; errors: Record<string, string> };

/**
 * Zod skips object-level checks while any single field is invalid, so a form
 * with a missing name would hide "end date before start date" until the next
 * submit. The cross-field rules are therefore also checked by hand here, so
 * every problem shows at once.
 */
export function validateSession(input: Record<string, unknown>, values: SessionFormValues): Validation {
  const parsed = sessionFormSchema.safeParse(input);
  if (parsed.success) return { ok: true, data: parsed.data };

  const errors: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  const isDate = (v: string) => ISO_DATE.test(v);
  if (!errors.endDate && isDate(values.startDate) && isDate(values.endDate) && values.endDate < values.startDate) {
    errors.endDate = "End date must not be before the start date";
  }
  if (!errors.applyUrl && values.status === "call-open" && values.applyUrl.trim() === "") {
    errors.applyUrl = "An open call needs an apply link";
  }
  return { ok: false, errors };
}

/* ------------------------------------------------------------- markdown */

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

const toIso = (v: unknown): string =>
  v instanceof Date ? v.toISOString().slice(0, 10) : typeof v === "string" ? v : "";

export interface ParsedSession {
  data: Record<string, unknown>;
  body: string;
}

export function parseSessionFile(source: string): ParsedSession {
  const m = FRONTMATTER.exec(source);
  if (!m) return { data: {}, body: source };
  const data = (yaml.load(m[1]) ?? {}) as Record<string, unknown>;
  return { data, body: m[2].replace(/^\r?\n/, "") };
}

/** Values for the edit form from a stored file. */
export function formValuesFrom(parsed: ParsedSession): SessionFormValues {
  const d = parsed.data;
  const str = (k: string) => (d[k] == null ? "" : String(d[k]));
  return {
    title: str("title"),
    theme: str("theme"),
    summary: str("summary"),
    venue: str("venue"),
    city: str("city"),
    startDate: toIso(d.startDate),
    endDate: toIso(d.endDate),
    status: str("status") || "announced",
    applyDeadline: toIso(d.applyDeadline),
    type: str("type"),
    outreach: d.outreach ? "on" : "",
    applyUrl: str("applyUrl"),
    resolutionsUrl: str("resolutionsUrl"),
    lang: str("lang") || "both",
    draft: d.draft ? "on" : "",
    body: parsed.body.trimEnd(),
    editor: "",
  };
}

/**
 * The file to store. Fields the form does not know about (a `cover` image
 * added by hand, say) are kept from `previous`, so editing never drops them.
 */
export function toSessionFile(form: SessionForm, previous?: ParsedSession): string {
  const ordered: Record<string, unknown> = {
    title: form.title,
    theme: form.theme,
    summary: form.summary,
    venue: form.venue,
    city: form.city,
    startDate: form.startDate,
    endDate: form.endDate,
    status: form.status,
    applyDeadline: form.applyDeadline,
    applyUrl: form.applyUrl,
    type: form.type,
    outreach: form.outreach,
    resolutionsUrl: form.resolutionsUrl,
    lang: form.lang === "both" ? undefined : form.lang,
    draft: form.draft || undefined,
  };
  const known = new Set(Object.keys(ordered));
  for (const [k, v] of Object.entries(previous?.data ?? {})) {
    if (!known.has(k)) ordered[k] = v instanceof Date ? toIso(v) : v;
  }
  for (const k of Object.keys(ordered)) if (ordered[k] === undefined) delete ordered[k];

  const front = yaml.dump(ordered, { lineWidth: -1, quotingType: '"' });
  const body = form.body.replace(/\r\n/g, "\n").trim();
  return `---\n${front}---\n${body ? `\n${body}\n` : ""}`;
}

/* ------------------------------------------------------------------ ids */

/** File names the editor may touch. Also stops `../` in a URL reaching the disk or API. */
export const ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,79}$/;

export function slugFor(title: string, startDate: string): string {
  const base = title
    .toLowerCase()
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  const year = startDate.slice(0, 4);
  if (!base) return `session-${year}`;
  return base.includes(year) ? base : `${base}-${year}`;
}
