import { en, type Dict } from "./en";
import { az } from "./az";

export const languages = {
  en: "English",
  az: "Azərbaycan",
} as const;

export type Locale = keyof typeof languages;

export const locales = Object.keys(languages) as Locale[];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dict> = { en, az };

/** Returns the whole dictionary for a locale. Pages destructure what they need. */
export function useTranslations(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "az";
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
  path: string;
}

/** Main header navigation. Deliberately short — seven items is already a lot. */
export const primaryNav: NavItem[] = [
  { key: "whatIsEyp", path: "what-is-eyp" },
  { key: "participate", path: "participate" },
  { key: "sessions", path: "sessions" },
  { key: "news", path: "news" },
  { key: "about", path: "about" },
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

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** "5–9 November 2026" / collapses a shared month or year where possible. */
export function formatDateRange(start: Date, end: Date, locale: Locale): string {
  const tag = intlLocale[locale];
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (sameMonth) {
    const day = new Intl.DateTimeFormat(tag, { day: "numeric" });
    const tail = new Intl.DateTimeFormat(tag, { month: "long", year: "numeric" });
    return `${day.format(start)}–${day.format(end)} ${tail.format(end)}`;
  }

  const short = new Intl.DateTimeFormat(tag, {
    day: "numeric",
    month: "long",
    ...(sameYear ? {} : { year: "numeric" }),
  });
  return `${short.format(start)} – ${formatDate(end, locale)}`;
}

/** Short day/month pair for the date chip on session cards. */
export function formatDayMonth(date: Date, locale: Locale): { day: string; month: string } {
  const tag = intlLocale[locale];
  return {
    day: new Intl.DateTimeFormat(tag, { day: "numeric" }).format(date),
    month: new Intl.DateTimeFormat(tag, { month: "short" }).format(date).replace(".", ""),
  };
}
