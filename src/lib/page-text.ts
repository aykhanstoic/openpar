/**
 * The text of each page, as editable data.
 *
 * Every page's wording lives in src/data/pages/<id>.json as
 * `{ "en": {...}, "az": {...} }`, with the same keys in both languages.
 * src/i18n/en.ts and az.ts read it from there, and /admin edits it. Labels
 * like the menu and buttons ("Read more", "Apply") stay in the .ts files:
 * they are part of the interface, not the content.
 *
 * Editors can change the wording of every piece of text, and add or remove
 * items in the lists named in LISTS. They cannot add, remove or rename the
 * keys themselves: the page templates rely on them.
 */

export interface PageInfo {
  /** File name in src/data/pages/, and the /admin/pages/<id> address. */
  id: string;
  label: string;
  description: string;
  /** Where the page is on the site, without the language prefix. */
  path: string;
}

export const PAGES: PageInfo[] = [
  { id: "home", label: "Home page", description: "The first page visitors see.", path: "" },
  { id: "what-is-eyp", label: "What is EYP?", description: "The session format, roles and who can take part.", path: "what-is-eyp" },
  { id: "about", label: "About us", description: "Mission, values, history, network and governance.", path: "about" },
  { id: "participate", label: "Get involved", description: "How to take part, routes for each audience, FAQ.", path: "participate" },
  { id: "sessions", label: "Sessions page", description: "Headings and notes around the list of sessions.", path: "sessions" },
  { id: "news", label: "News page", description: "Headings and notes around the list of news posts.", path: "news" },
  { id: "boards", label: "Board pages", description: "Introductions on the Executive and Supervisory Board pages.", path: "boards/executive" },
  { id: "alumni", label: "Alumni", description: "What alumni do and how to get back in touch.", path: "alumni" },
  { id: "partners", label: "Partners page", description: "Why partners matter and how to work with us.", path: "partners" },
  { id: "contact", label: "Contact", description: "Who to write to about what.", path: "contact" },
  { id: "privacy", label: "Privacy policy", description: "What data we collect and why.", path: "privacy" },
  { id: "legal", label: "Legal notice", description: "Who owns the website and the terms for using it.", path: "legal" },
];

export const getPage = (id: string | undefined) => PAGES.find((p) => p.id === id) ?? null;

/** Lists editors may add items to or remove items from, with each item's fields. */
export const LISTS: Record<string, { label: string; item: string; fields: { key: string; label: string; long?: boolean }[] }> = {
  "about:milestones": {
    label: "History milestones",
    item: "Milestone",
    fields: [
      { key: "year", label: "Year" },
      { key: "title", label: "Heading" },
      { key: "body", label: "Text", long: true },
    ],
  },
  "legal:sections": {
    label: "Sections",
    item: "Section",
    fields: [
      { key: "title", label: "Heading" },
      { key: "body", label: "Text", long: true },
    ],
  },
};

export type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
export type Lang = "en" | "az";
export type PageText = Record<Lang, Record<string, Json>>;

export const MAX_TEXT = 5000;

/* ------------------------------------------------------------ shape check */

/**
 * Differences between the English and Azerbaijani text, and empty texts.
 * An empty list means the page is fine. Used by the build (a broken file
 * fails the deploy instead of breaking a page) and by /admin before a save.
 */
export function problems(page: string, text: PageText): string[] {
  const out: string[] = [];
  if (!text || typeof text !== "object" || !text.en || !text.az) return [`${page}: needs "en" and "az"`];

  const walk = (en: Json, az: Json, at: string) => {
    if (typeof en === "string") {
      if (typeof az !== "string") out.push(`${page}: ${at} is text in English but not in Azerbaijani`);
      else {
        if (!en.trim()) out.push(`${page}: ${at} is empty in English`);
        if (!az.trim()) out.push(`${page}: ${at} is empty in Azerbaijani`);
      }
      return;
    }
    if (Array.isArray(en)) {
      if (!Array.isArray(az)) return void out.push(`${page}: ${at} is a list in English but not in Azerbaijani`);
      if (en.length !== az.length) out.push(`${page}: ${at} has ${en.length} items in English but ${az.length} in Azerbaijani`);
      en.forEach((item, i) => az[i] !== undefined && walk(item, az[i], `${at}.${i}`));
      return;
    }
    if (en && typeof en === "object") {
      if (!az || typeof az !== "object" || Array.isArray(az)) return void out.push(`${page}: ${at} differs between languages`);
      const a = Object.keys(en), b = Object.keys(az);
      for (const k of a) if (!(k in az)) out.push(`${page}: ${at ? `${at}.` : ""}${k} is missing in Azerbaijani`);
      for (const k of b) if (!(k in en)) out.push(`${page}: ${at ? `${at}.` : ""}${k} is missing in English`);
      for (const k of a) if (k in az) walk(en[k], (az as Record<string, Json>)[k], at ? `${at}.${k}` : k);
    }
  };
  walk(text.en, text.az, "");
  return out;
}

/* ----------------------------------------------------- the editing form */

export type FormItem =
  | { kind: "text"; path: string; label: string; long: boolean; en: string; az: string }
  | {
      kind: "list";
      path: string;
      label: string;
      itemLabel: string;
      fields: { key: string; label: string; long?: boolean }[];
      items: { en: Record<string, string>; az: Record<string, string> }[];
    };

export interface FormGroup {
  title: string;
  items: FormItem[];
}

const WORDS: Record<string, string> = {
  eyebrow: "Small label above the heading",
  title: "Heading",
  body: "Text",
  lead: "Intro text",
  cta: "Button",
  label: "Label",
  value: "Number",
  name: "Name",
  duration: "When",
  q: "Question",
  a: "Answer",
  note: "Note",
  accent: "Second line of the heading",
  primary: "main",
  secondary: "second",
  none: "when there is none",
  empty: "when the list is empty",
  button: "Button",
};

const GROUP_TITLES: Record<string, string> = {
  top: "Top of the page",
  what: "What is the EYP",
  faq: "Frequently asked questions",
  not: "What it is not",
  s: "Policy sections",
  next: "Next session box",
  glance: "Numbers",
  numbers: "Numbers",
  number: "Numbers",
  route: "Two ways in",
  routes: "Two ways in",
  types: "Names of session types",
  milestones: "History milestones",
  sections: "Sections",
  role: "Roles",
  roles: "Roles",
  way: "Ways to stay involved",
  ways: "Ways to stay involved",
  step: "Steps",
  steps: "Steps",
  value: "Values",
  values: "Values",
  phase: "Session phases",
  support: "Ways to work with us",
  cta: "Box at the bottom of the page",
  empty: "Text shown when a list is empty",
  detail: "A single session's page",
  about: "A single session's page",
  resolutions: "A single session's page",
  related: "A single post's page",
  back: "A single post's page",
  published: "A single post's page",
  before: "\"Before you write\" box",
  direct: "Who to write to",
  who: "Who can take part",
  current: "Partner list",
};

const TOP_KEYS = new Set(["title", "titleAccent", "lead", "badge", "ctaPrimary", "ctaSecondary", "warningTitle", "warningBody"]);

/** "missionBody2" → ["mission", "Body", "2"] */
const splitKey = (k: string) => k.match(/[A-Z]?[a-z]+|\d+|[A-Z]+(?![a-z])/g) ?? [k];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function groupOf(key: string): string {
  if (TOP_KEYS.has(key)) return "top";
  const first = splitKey(key)[0].toLowerCase();
  return first;
}

const FULL_LABELS: Record<string, string> = {
  title: "Page heading",
  titleAccent: "Page heading — second line",
  lead: "Intro text under the heading",
  badge: "Small badge above the heading",
  ctaPrimary: "Main button",
  ctaSecondary: "Second button",
  warningTitle: "Warning box — heading",
  warningBody: "Warning box — text",
  boardFullPage: "Link to the full board page",
  beforeWhat: "Link to \"What is EYP?\"",
  beforeParticipate: "Link to \"Get involved\"",
  beforeSessions: "Link to \"Sessions\"",
  resolutions: "Resolutions booklet link",
  aboutThisSession: "Heading above the description",
  relatedSession: "\"Related session\" label",
  publishedOn: "\"Published\" label",
  backLabel: "Back link",
  detailBackLabel: "Back link",
  empty: "Text when there are no posts",
};

/**
 * A readable label from a key: "missionBody2" → "Mission — Text 2",
 * "value1Title" → "Value 1 — Heading", "faq3Q" → "FAQ 3 — Question".
 * The key is split into a subject (what it is about) and a role (heading,
 * text, button...), taken from the known words at the end of the key.
 */
function labelFor(key: string): string {
  if (FULL_LABELS[key]) return FULL_LABELS[key];
  const parts = splitKey(key);

  // Trailing number belongs to the role ("Body2" → "Text 2"), then known words.
  let end = parts.length;
  const trailing = /^\d+$/.test(parts[end - 1]) && end > 1 && WORDS[parts[end - 2].toLowerCase()] ? parts[--end] : "";
  let cut = end;
  while (cut > 1 && WORDS[parts[cut - 1].toLowerCase()]) cut--;

  let subject = parts.slice(0, cut).map((w) => (w === "s" ? "Section" : w));
  const role = [...parts.slice(cut, end).map((p) => WORDS[p.toLowerCase()] ?? p), ...(trailing ? [trailing] : [])];
  // "roleDelegateName" → "Delegate", "numberCountriesValue" → "Countries"
  if (subject.filter((w) => !/^\d+$/.test(w)).length > 1) subject = subject.slice(1);

  const subj = subject
    .map((w, i) => (w.toLowerCase() === "faq" ? "FAQ" : i === 0 ? cap(w) : w.toLowerCase()))
    .join(" ");
  if (!role.length) return subj;
  const r = role.join(" ").replace(/ (main|second)$/, " ($1)");
  return `${subj} — ${cap(r)}`;
}

const asText = (v: Json | undefined) => (typeof v === "string" ? v : v == null ? "" : String(v));

/** The page's text as labelled form fields, in page order, grouped by section. */
export function formFor(pageId: string, text: PageText): FormGroup[] {
  const groups: FormGroup[] = [];
  const push = (g: string, item: FormItem) => {
    const title = GROUP_TITLES[g] ?? cap(g);
    const last = groups[groups.length - 1];
    if (last && last.title === title) last.items.push(item);
    else {
      const existing = groups.find((x) => x.title === title);
      if (existing) existing.items.push(item);
      else groups.push({ title, items: [item] });
    }
  };

  const visit = (en: Json, az: Json, path: string, key: string, group: string) => {
    const list = LISTS[`${pageId}:${path}`];
    if (Array.isArray(en) && list) {
      const items = en.map((item, i) => {
        const e = (item ?? {}) as Record<string, Json>;
        const a = ((az as Json[])?.[i] ?? {}) as Record<string, Json>;
        return {
          en: Object.fromEntries(list.fields.map((f) => [f.key, asText(e[f.key])])),
          az: Object.fromEntries(list.fields.map((f) => [f.key, asText(a[f.key])])),
        };
      });
      push(group, { kind: "list", path, label: list.label, itemLabel: list.item, fields: list.fields, items });
      return;
    }
    if (en && typeof en === "object" && !Array.isArray(en)) {
      for (const k of Object.keys(en)) {
        visit((en as Record<string, Json>)[k], (az as Record<string, Json>)?.[k], `${path}.${k}`, k, group);
      }
      return;
    }
    if (typeof en === "string") {
      const azText = asText(az);
      push(group, {
        kind: "text",
        path,
        label: path.includes(".") ? (key.length <= 3 ? key.toUpperCase() : cap(key.replace(/-/g, " "))) : labelFor(key),
        long: en.length > 70 || azText.length > 70,
        en,
        az: azText,
      });
    }
  };

  for (const key of Object.keys(text.en)) visit(text.en[key], text.az[key], key, key, groupOf(key));
  return groups;
}

/* ------------------------------------------------------ form → new text */

const fieldName = (lang: Lang, path: string) => `${lang}::${path}`;
export { fieldName };

/**
 * New text for the page from a submitted form. Walks the *current* file, so
 * only text that already exists can be changed; lists named in LISTS may
 * grow or shrink. `addTo` adds an empty item to that list (the "Add" button).
 */
export function readPageForm(pageId: string, current: PageText, form: FormData, addTo?: string): PageText {
  const get = (lang: Lang, path: string) => String(form.get(fieldName(lang, path)) ?? "").replace(/\r\n/g, "\n").trim();

  const build = (lang: Lang, value: Json, path: string): Json => {
    const list = LISTS[`${pageId}:${path}`];
    if (Array.isArray(value) && list) {
      const count = Math.min(Number(form.get(`count::${path}`) ?? value.length) || 0, 100);
      const items: Json[] = [];
      for (let i = 0; i < count; i++) {
        if (form.get(`remove::${path}.${i}`)) continue;
        items.push(Object.fromEntries(list.fields.map((f) => [f.key, get(lang, `${path}.${i}.${f.key}`)])));
      }
      if (addTo === path) items.push(Object.fromEntries(list.fields.map((f) => [f.key, ""])));
      return items;
    }
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, build(lang, v, path ? `${path}.${k}` : k)]),
      );
    }
    if (typeof value === "string") return get(lang, path);
    return value;
  };

  return { en: build("en", current.en, "") as Record<string, Json>, az: build("az", current.az, "") as Record<string, Json> };
}

/** Problems a member can fix on the form, keyed by field path. */
export function formErrors(text: PageText): Record<string, string> {
  const errors: Record<string, string> = {};
  const walk = (v: Json, path: string, lang: Lang) => {
    if (typeof v === "string") {
      if (!v.trim()) errors[path] ??= lang === "en" ? "The English text is empty" : "The Azerbaijani text is empty";
      else if (v.length > MAX_TEXT) errors[path] ??= `At most ${MAX_TEXT} characters`;
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}.${i}`, lang));
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${k}` : k, lang);
  };
  walk(text.en, "", "en");
  walk(text.az, "", "az");
  // List items are written as path.index.key; report them on the field itself.
  return errors;
}
