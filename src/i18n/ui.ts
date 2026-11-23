import { en, type Dict } from "./en";
import { az } from "./az";
import { problems, type PageText } from "../lib/page-text";

export const languages = {
  en: "English",
  az: "Azərbaycan",
} as const;

export type Locale = keyof typeof languages;

export const locales = Object.keys(languages) as Locale[];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dict> = { en, az };

/* Page text is edited by members in /admin (src/data/pages/*.json). If a file
   ever ends up with a missing translation, an empty text or lists of
   different lengths, stop the build: Vercel then keeps the last good site
   online instead of publishing a broken page. */
const pageFiles = import.meta.glob<PageText>("../data/pages/*.json", { eager: true, import: "default" });
const pageProblems = Object.entries(pageFiles).flatMap(([file, text]) =>
  problems(file.replace(/^.*\/(.+)\.json$/, "$1"), text),
);
if (pageProblems.length) throw new Error(`Page text problems:\n${pageProblems.join("\n")}`);

/** Returns the whole dictionary for a locale. Pages destructure what they need. */
export function useTranslations(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string | undefined): value is Locale {
  return (locales as string[]).includes(value ?? "");
}

const localePrefix = new RegExp(`^/(${locales.join("|")})(?=/|$)`);

/** "/az/sessions/x/" → "/sessions/x/". A path with no locale prefix comes back unchanged. */
export function stripLocale(pathname: string): string {
  return pathname.replace(localePrefix, "");
}

/** Prefix a path with the locale. `path` is given without a leading slash. */
export function localePath(locale: Locale, path = ""): string {
  return path ? `/${locale}/${path}` : `/${locale}/`;
}

/* -------------------------------------------------------------------------
   Navigation

   `key` indexes into dict.nav. Kept as data rather than markup so the header,
   the mobile menu and the footer cannot disagree about what the site contains.
   ------------------------------------------------------------------------- */

export interface NavItem {
  key: keyof Dict["nav"];
  /** Page path without the locale, optionally with a #section on that page. */
  path: string;
  /** Shown under the item: a dropdown in the desktop header, a fold-out on phones. */
  children?: NavItem[];
}

/** Main header navigation. Deliberately short — seven items is already a lot. */
export const primaryNav: NavItem[] = [
  {
    key: "whatIsEyp",
    path: "what-is-eyp",
    children: [
      { key: "format", path: "what-is-eyp#format" },
      { key: "roles", path: "what-is-eyp#roles" },
      { key: "eligibility", path: "what-is-eyp#eligibility" },
    ],
  },
  {
    key: "participate",
    path: "participate",
    children: [
      { key: "steps", path: "participate#steps" },
      { key: "routes", path: "participate#routes" },
      { key: "faq", path: "participate#faq" },
      { key: "alumni", path: "alumni" },
    ],
  },
  {
    key: "sessions",
    path: "sessions",
    children: [
      { key: "upcoming", path: "sessions#upcoming" },
      { key: "past", path: "sessions#past" },
    ],
  },
  { key: "news", path: "news" },
  {
    key: "about",
    path: "about",
    children: [
      { key: "mission", path: "about#mission" },
      { key: "values", path: "about#values" },
      { key: "executiveBoard", path: "boards/executive" },
      { key: "supervisoryBoard", path: "boards/supervisory" },
      { key: "departments", path: "about#departments" },
      { key: "history", path: "about#history" },
      { key: "partners", path: "partners" },
    ],
  },
  { key: "contact", path: "contact" },
];

export const footerOrgNav: NavItem[] = [
  { key: "about", path: "about" },
  { key: "news", path: "news" },
  { key: "partners", path: "partners" },
  { key: "contact", path: "contact" },
];

export const footerInvolvedNav: NavItem[] = [
  { key: "whatIsEyp", path: "what-is-eyp" },
  { key: "participate", path: "participate" },
  { key: "sessions", path: "sessions" },
  { key: "alumni", path: "alumni" },
];

/* -------------------------------------------------------------------------
   Formatting
   ------------------------------------------------------------------------- */

const intlLocale: Record<Locale, string> = { en: "en-GB", az: "az-AZ" };

/* Content dates are bare YYYY-MM-DD, which parse to UTC midnight. Every
   formatter pins UTC, or a build machine west of Greenwich prints the day before. */
const fmt = (locale: Locale, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(intlLocale[locale], { ...options, timeZone: "UTC" });

export function formatDate(date: Date, locale: Locale): string {
  return fmt(locale, { day: "numeric", month: "long", year: "numeric" }).format(date);
}

/** "5–9 November 2026" / collapses a shared month or year where possible. */
export function formatDateRange(start: Date, end: Date, locale: Locale): string {
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();

  if (sameMonth) {
    const day = fmt(locale, { day: "numeric" });
    const tail = fmt(locale, { month: "long", year: "numeric" });
    return `${day.format(start)}–${day.format(end)} ${tail.format(end)}`;
  }

  const short = fmt(locale, {
    day: "numeric",
    month: "long",
    ...(sameYear ? {} : { year: "numeric" }),
  });
  return `${short.format(start)} – ${formatDate(end, locale)}`;
}

/** Short day/month pair for the date chip on session cards. */
export function formatDayMonth(date: Date, locale: Locale): { day: string; month: string } {
  return {
    day: fmt(locale, { day: "numeric" }).format(date),
    month: fmt(locale, { month: "short" }).format(date).replace(".", ""),
  };
}
