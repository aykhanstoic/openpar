import {
  SESSION_LANGS,
  SESSION_STATUSES,
  SESSION_TYPES,
  LANG_LABELS,
  STATUS_LABELS,
  TYPE_LABELS,
} from "../session-fields";
import { DEPARTMENTS, DEPARTMENT_NAMES, type DepartmentKey } from "../department-fields";
import { parseEntry, serializeEntry, slugify, toIso, type ParsedEntry } from "./frontmatter";
import type { Folder } from "./store";
import type { ImageKind } from "./images";

/**
 * Everything the /admin editor knows about sessions, news, board members and
 * partners: which fields the form shows, in plain words, and the rules a save
 * must pass. The rules mirror src/content.config.ts, so a form that passes
 * here also passes the build: a mistake gets an error on the form instead of
 * a failed deploy. Change a schema there, change it here.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "date"
  | "select"
  | "checkbox"
  | "checkboxes"
  | "url"
  | "email"
  | "number"
  | "reference"
  | "image";

export interface Field {
  name: string;
  label: string;
  hint?: string;
  type: FieldType;
  required?: boolean;
  max?: number;
  options?: { value: string; label: string }[];
  /** For `reference`: which collection the choice comes from. */
  ref?: CollectionId;
  /** Value written when the field is left at this (kept out of the file). */
  omitWhen?: string;
  /** Group heading the field sits under on the form. */
  group: string;
  /** For `image`: photos are shrunk and saved as JPG, logos keep transparency as PNG. */
  kind?: ImageKind;
}

export type CollectionId = "sessions" | "news" | "board" | "departments" | "partners";

export interface Collection {
  id: CollectionId;
  folder: Folder;
  label: string;
  singular: string;
  description: string;
  fields: Field[];
  /** The long text written below the frontmatter, if the site shows it. */
  body?: { label: string; hint: string; group: string };
  /** Builds the file name for a new entry. */
  slug(values: Values): string;
  /** One-line summary shown in the list. */
  summary(data: Record<string, unknown>): string[];
  sortKey(data: Record<string, unknown>): string;
  /** Rules that span several fields. */
  check?(values: Values): Record<string, string>;
  /** Where the entry appears on the public site, if it has its own page. */
  publicPath?(id: string): string;
}

export type Values = Record<string, string>;

const opts = <T extends string>(values: readonly T[], labels: Record<T, string>) =>
  values.map((v) => ({ value: v, label: labels[v] }));

const year = (d: string) => d.slice(0, 4);

export const COLLECTIONS: Record<CollectionId, Collection> = {
  /* -------------------------------------------------------------- sessions */
  sessions: {
    id: "sessions",
    folder: { dir: "src/content/sessions", ext: "md" },
    label: "Sessions",
    singular: "session",
    description: "Upcoming and past sessions, open calls and apply links.",
    fields: [
      { group: "The session", name: "title", label: "Title", type: "text", required: true, max: 120 },
      { group: "The session", name: "theme", label: "Theme", type: "text", required: true, max: 200 },
      { group: "The session", name: "summary", label: "Card summary", type: "textarea", max: 300, hint: "One or two sentences for the session card. If empty, the theme is shown." },
      { group: "The session", name: "venue", label: "Venue", type: "text", required: true, max: 120 },
      { group: "The session", name: "city", label: "City", type: "text", max: 60 },
      { group: "The session", name: "startDate", label: "Start date", type: "date", required: true },
      { group: "The session", name: "endDate", label: "End date", type: "date", required: true },
      { group: "Applications", name: "status", label: "Status", type: "select", required: true, options: opts(SESSION_STATUSES, STATUS_LABELS), hint: "\"Call open\" shows an Apply button and needs an apply link. It turns into \"Call closed\" by itself the day after the deadline." },
      { group: "Applications", name: "applyDeadline", label: "Application deadline", type: "date" },
      { group: "Applications", name: "applyUrl", label: "Apply link", type: "url", hint: "The Members Platform page, or the Google Form for an outreach session. Needed while the call is open." },
      { group: "The session", name: "cover", label: "Cover photo", type: "image", kind: "photo", hint: "Shown on the session card and at the top of its page. A wide (landscape) photo works best." },
      { group: "The session", name: "type", label: "Type", type: "select", options: [{ value: "", label: "Not set" }, ...opts(SESSION_TYPES, TYPE_LABELS)] },
      { group: "Applications", name: "outreach", label: "Outreach session", type: "checkbox", hint: "Tick this when applications go through a Google Form instead of the Members Platform." },
      { group: "Applications", name: "resolutionsUrl", label: "Resolutions booklet link", type: "url", hint: "After the session." },
      { group: "Azerbaijani version", name: "titleAz", label: "Title in Azerbaijani", type: "text", max: 120, hint: "If empty, the English title is shown." },
      { group: "Azerbaijani version", name: "themeAz", label: "Theme in Azerbaijani", type: "text", max: 200, hint: "If empty, the English theme is shown." },
      { group: "Azerbaijani version", name: "summaryAz", label: "Card summary in Azerbaijani", type: "textarea", max: 300, hint: "If empty, the English summary is shown." },
      { group: "Azerbaijani version", name: "bodyAz", label: "Description in Azerbaijani", type: "textarea", max: 20000, hint: "If empty, the English description is shown. Same formatting as the English description." },
      { group: "Publishing", name: "lang", label: "Show on", type: "select", required: true, options: opts(SESSION_LANGS, LANG_LABELS), omitWhen: "both" },
      { group: "Publishing", name: "draft", label: "Draft", type: "checkbox", hint: "Saved, but hidden from the website until you untick this." },
    ],
    body: { group: "The session", label: "Description", hint: "Shown on the session's own page." },
    slug: (v) => slugify(v.title, year(v.startDate)),
    summary: (d) => [toIso(d.startDate), STATUS_LABELS[d.status as keyof typeof STATUS_LABELS] ?? String(d.status ?? "")],
    sortKey: (d) => toIso(d.startDate),
    check(v) {
      const e: Record<string, string> = {};
      if (v.startDate && v.endDate && v.endDate < v.startDate) e.endDate = "End date must not be before the start date";
      if (v.status === "call-open" && !v.applyUrl.trim()) e.applyUrl = "An open call needs an apply link";
      return e;
    },
    publicPath: (id) => `sessions/${id}/`,
  },

  /* ------------------------------------------------------------------ news */
  news: {
    id: "news",
    folder: { dir: "src/content/news", ext: "md" },
    label: "News",
    singular: "news post",
    description: "Announcements, open calls and session recaps.",
    fields: [
      { group: "The post", name: "title", label: "Title", type: "text", required: true, max: 160 },
      { group: "The post", name: "date", label: "Date", type: "date", required: true },
      { group: "The post", name: "excerpt", label: "Short summary", type: "textarea", max: 300, hint: "One or two sentences shown on the news list and under the title." },
      { group: "The post", name: "lang", label: "Written in", type: "select", required: true, options: [{ value: "en", label: "English" }, { value: "az", label: "Azerbaijani" }], hint: "A post exists in one language. It is shown on both language versions of the site, marked with its language." },
      { group: "The post", name: "tags", label: "Category", type: "checkboxes", options: ["Announcement", "Open call", "Session recap", "Message from the board"].map((t) => ({ value: t, label: t })) },
      { group: "The post", name: "cover", label: "Photo", type: "image", kind: "photo", hint: "Shown on the news list and at the top of the post. A wide (landscape) photo works best." },
      { group: "The post", name: "session", label: "Related session", type: "reference", ref: "sessions", hint: "Optional. Adds a link to that session." },
      { group: "Publishing", name: "draft", label: "Draft", type: "checkbox", hint: "Saved, but hidden from the website until you untick this." },
    ],
    body: { group: "The post", label: "Text of the post", hint: "The full post." },
    slug: (v) => slugify(v.title, year(v.date)),
    summary: (d) => [toIso(d.date), String(d.lang ?? "").toUpperCase()],
    sortKey: (d) => toIso(d.date),
    publicPath: (id) => `news/${id}/`,
  },

  /* ----------------------------------------------------------------- board */
  board: {
    id: "board",
    folder: { dir: "src/content/board", ext: "md" },
    label: "Board members",
    singular: "board member",
    description: "The people on the Executive and Supervisory Boards.",
    fields: [
      { group: "The person", name: "name", label: "Full name", type: "text", required: true, max: 80, hint: "Only publish someone's name with their consent." },
      { group: "The person", name: "role", label: "Role (English)", type: "text", required: true, max: 80, hint: "For example: President, Treasurer." },
      { group: "The person", name: "roleAz", label: "Role (Azerbaijani)", type: "text", max: 80, hint: "If empty, the English role is shown on the Azerbaijani page." },
      { group: "The person", name: "group", label: "Board", type: "select", required: true, options: [{ value: "executive", label: "Executive Board" }, { value: "supervisory", label: "Supervisory Board" }] },
      { group: "The person", name: "order", label: "Position in the list", type: "number", required: true, hint: "1 is shown first." },
      { group: "The person", name: "email", label: "Email", type: "email", hint: "A role address (like president@…), never a personal one." },
      { group: "The person", name: "photo", label: "Photo", type: "image", kind: "photo", hint: "A portrait, cropped to a square on the site. Only with the person's consent. Without a photo, their initials are shown." },
      { group: "The person", name: "linkedin", label: "LinkedIn", type: "url", hint: "Their LinkedIn profile, e.g. https://www.linkedin.com/in/name. Only with their consent." },
      { group: "The person", name: "year", label: "Board year", type: "number", required: true, hint: "The year this board's term began: 2026 for a 2026–2027 board. The newest year is shown as the current board; older years appear in the board's history, back to 2020." },
      { group: "The person", name: "term", label: "Term", type: "text", max: 40, hint: "For example: 2026–2027." },
    ],
    /* The year is in the file name, so someone who served on two boards gets two entries. */
    slug: (v) => slugify(`${v.role} ${v.name}`, v.year),
    summary: (d) => [String(d.role ?? ""), d.group === "supervisory" ? "Supervisory Board" : "Executive Board", d.year ? String(d.year) : "Year not set"],
    /* Newest board first, then by board and position. */
    sortKey: (d) => `${String(9999 - (Number(d.year) || 9999)).padStart(4, "0")}${d.group === "supervisory" ? "b" : "a"}${String(d.order ?? 0).padStart(4, "0")}`,
    check(v) {
      const e: Record<string, string> = {};
      const y = Number(v.year);
      if (v.year && (!Number.isInteger(y) || y < 2000 || y > 2100)) e.year = "A year between 2000 and 2100";
      if (v.linkedin) {
        let host = "";
        try { host = new URL(v.linkedin).hostname; } catch { /* the url check reports it */ }
        if (host && !/(^|\.)linkedin\.com$/.test(host)) e.linkedin = "Must be a linkedin.com link";
      }
      return e;
    },
  },

  /* ----------------------------------------------------------- departments */
  departments: {
    id: "departments",
    folder: { dir: "src/content/departments", ext: "md" },
    label: "Department members",
    singular: "department member",
    description: "The people in each department, shown under Departments on the About page.",
    fields: [
      { group: "The person", name: "name", label: "Full name", type: "text", required: true, max: 80, hint: "Only publish someone's name with their consent." },
      { group: "The person", name: "role", label: "Role (English)", type: "text", required: true, max: 80, hint: "For example: Head of Department, Member." },
      { group: "The person", name: "roleAz", label: "Role (Azerbaijani)", type: "text", max: 80, hint: "If empty, the English role is shown on the Azerbaijani page." },
      { group: "The person", name: "department", label: "Department", type: "select", required: true, options: DEPARTMENTS.map((d) => ({ value: d, label: DEPARTMENT_NAMES[d].en })), hint: "The site shows the name in English or Azerbaijani to match the page." },
      { group: "The person", name: "order", label: "Position in the department", type: "number", required: true, hint: "1 is shown first, so give the head of the department 1." },
      { group: "The person", name: "email", label: "Email", type: "email", hint: "A role address (like communications@…), never a personal one." },
      { group: "The person", name: "photo", label: "Photo", type: "image", kind: "photo", hint: "A portrait, cropped to a square on the site. Only with the person's consent. Without a photo, their initials are shown." },
      { group: "The person", name: "linkedin", label: "LinkedIn", type: "url", hint: "Their LinkedIn profile, e.g. https://www.linkedin.com/in/name. Only with their consent." },
    ],
    slug: (v) => slugify(`${v.department} ${v.name}`),
    summary: (d) => [DEPARTMENT_NAMES[d.department as DepartmentKey]?.en ?? String(d.department ?? ""), String(d.role ?? "")],
    /* By department in the site's order, then by position. */
    sortKey: (d) => `${String(DEPARTMENTS.indexOf(d.department as DepartmentKey) + 1).padStart(2, "0")}|${String(d.order ?? 0).padStart(4, "0")}`,
    check(v) {
      const e: Record<string, string> = {};
      if (v.linkedin) {
        let host = "";
        try { host = new URL(v.linkedin).hostname; } catch { /* the url check reports it */ }
        if (host && !/(^|\.)linkedin\.com$/.test(host)) e.linkedin = "Must be a linkedin.com link";
      }
      return e;
    },
    publicPath: () => "about/#departments",
  },

  /* -------------------------------------------------------------- partners */
  partners: {
    id: "partners",
    folder: { dir: "src/content/partners", ext: "md" },
    label: "Partners",
    singular: "partner",
    description: "Organisations shown on the Partners page and in the footer.",
    fields: [
      { group: "The partner", name: "name", label: "Name", type: "text", required: true, max: 120 },
      { group: "The partner", name: "url", label: "Website", type: "url" },
      { group: "The partner", name: "tier", label: "Kind of partner", type: "select", required: true, options: [{ value: "supporting", label: "Supporting partner" }, { value: "principal", label: "Principal partner" }, { value: "in-kind", label: "In-kind partner" }] },
      { group: "The partner", name: "logo", label: "Logo", type: "image", kind: "logo", hint: "A PNG with a transparent background looks best. Without a logo, the name is shown." },
      { group: "The partner", name: "order", label: "Position in the list", type: "number", required: true, hint: "Lower numbers are shown first." },
    ],
    slug: (v) => slugify(v.name),
    summary: (d) => [String(d.tier ?? "")],
    sortKey: (d) => String(d.order ?? 50).padStart(4, "0"),
  },
};

export function getCollection(id: string | undefined): Collection | null {
  return id && id in COLLECTIONS ? COLLECTIONS[id as CollectionId] : null;
}

/* --------------------------------------------------------- form <-> file */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Form values for a stored entry, or blank ones for a new entry. */
export function valuesFrom(c: Collection, parsed?: ParsedEntry): Values {
  const d = parsed?.data ?? {};
  const v: Values = {};
  for (const f of c.fields) {
    const raw = d[f.name];
    if (f.type === "checkbox") v[f.name] = raw ? "on" : "";
    else if (f.type === "checkboxes") v[f.name] = Array.isArray(raw) ? raw.join("\n") : "";
    else if (raw === undefined || raw === null) v[f.name] = f.type === "select" && f.required ? (f.omitWhen ?? f.options?.[0]?.value ?? "") : "";
    else v[f.name] = toIso(raw);
  }
  if (!parsed && c.id === "news") v.date = new Date().toISOString().slice(0, 10);
  if (c.body) v.body = parsed?.body.trimEnd() ?? "";
  v.editor = "";
  return v;
}

export function readValues(c: Collection, form: FormData): Values {
  const v: Values = {};
  for (const f of c.fields) {
    if (f.type === "checkbox") v[f.name] = form.get(f.name) ? "on" : "";
    else if (f.type === "checkboxes") v[f.name] = form.getAll(f.name).map(String).join("\n");
    else if (f.type === "textarea") v[f.name] = String(form.get(f.name) ?? "").replace(/\r\n?/g, "\n").trim();
    else v[f.name] = String(form.get(f.name) ?? "").trim();
  }
  if (c.body) v.body = String(form.get("body") ?? "");
  v.editor = String(form.get("editor") ?? "").trim();
  return v;
}

const isHttps = (s: string) => {
  try {
    return new URL(s).protocol === "https:";
  } catch {
    return false;
  }
};

export type Validation =
  | { ok: true; data: Record<string, unknown>; body: string | null }
  | { ok: false; errors: Record<string, string> };

/** Checks every field and turns the form into the data written to the file. */
export function validate(c: Collection, v: Values, refIds: Record<string, string[]> = {}): Validation {
  const errors: Record<string, string> = {};
  const data: Record<string, unknown> = {};

  for (const f of c.fields) {
    const s = v[f.name] ?? "";
    const fail = (msg: string) => (errors[f.name] ??= msg);

    if (f.required && f.type !== "checkbox" && s === "") {
      fail("Required");
      continue;
    }
    if (f.max && s.length > f.max) fail(`At most ${f.max} characters`);

    switch (f.type) {
      case "checkbox":
        data[f.name] = s === "on" ? true : f.name === "outreach" ? false : undefined;
        break;
      case "checkboxes": {
        const picked = s ? s.split("\n") : [];
        const allowed = new Set(f.options?.map((o) => o.value));
        if (picked.some((p) => !allowed.has(p))) fail("Pick from the list");
        data[f.name] = picked.length ? picked : undefined;
        break;
      }
      case "date":
        if (s && (!ISO_DATE.test(s) || Number.isNaN(Date.parse(s)))) fail("Pick a date");
        data[f.name] = s || undefined;
        break;
      case "url":
        if (s && !isHttps(s)) fail("Must be a full link starting with https://");
        data[f.name] = s || undefined;
        break;
      case "email":
        if (s && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) fail("Not an email address");
        data[f.name] = s || undefined;
        break;
      case "number":
        if (s && !/^-?\d{1,4}$/.test(s)) fail("A whole number");
        data[f.name] = s ? Number(s) : undefined;
        break;
      case "select":
        if (s && !f.options?.some((o) => o.value === s)) fail("Pick from the list");
        data[f.name] = s === "" || s === f.omitWhen ? undefined : s;
        break;
      case "image":
        // Only paths the editor itself writes (../../assets/...) are accepted.
        if (s && !isImageValue(s)) fail("Choose the photo again");
        data[f.name] = s || undefined;
        break;
      case "reference":
        if (s && !(refIds[f.ref ?? ""] ?? []).includes(s)) fail("Pick from the list");
        data[f.name] = s || undefined;
        break;
      default:
        data[f.name] = s || undefined;
    }
  }

  let body: string | null = null;
  if (c.body) {
    body = v.body ?? "";
    if (body.length > 20000) errors.body = "At most 20000 characters";
  }
  if (!v.editor) errors.editor = "Required";
  else if (v.editor.length > 60) errors.editor = "At most 60 characters";

  for (const [k, msg] of Object.entries(c.check?.(v) ?? {})) errors[k] ??= msg;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data, body };
}

export function toFile(c: Collection, result: Extract<Validation, { ok: true }>, previous?: ParsedEntry): string {
  return serializeEntry(result.data, c.body ? result.body : null, previous);
}

export { parseEntry };

/* ---------------------------------------------------------------- photos */

/** "../../assets/uploads/board/x.jpg" (as written in an entry) → "src/assets/uploads/board/x.jpg". */
export const repoPathOfImage = (value: string) => value.replace(/^\.\.\/\.\.\//, "src/");
/** The reverse: how an entry in src/content/<collection>/ points at an upload. */
export const imageValueOf = (repoPath: string) => repoPath.replace(/^src\//, "../../");

/** An entry's image path: under ../../assets/, no "." or ".." segments. */
export const isImageValue = (s: string) =>
  /^\.\.\/\.\.\/assets\/[A-Za-z0-9/_.-]+\.(jpe?g|png|webp)$/i.test(s) &&
  s.split("/").slice(2).every((seg) => seg !== "" && seg !== "." && seg !== "..");

export const imageFields = (c: Collection) => c.fields.filter((f) => f.type === "image");
