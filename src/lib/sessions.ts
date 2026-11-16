import type { CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/ui";

type SessionData = CollectionEntry<"sessions">["data"];

const DAY = 24 * 60 * 60 * 1000;

/**
 * Status as of `now`. A call-open session whose deadline has passed reads as
 * call-closed; the deadline day itself (UTC) still counts as open. The site is
 * static, so this only changes when the site is rebuilt: a daily rebuild keeps
 * it current.
 */
export function currentStatus(d: SessionData, now: Date = new Date()): SessionData["status"] {
  if (d.status === "call-open" && d.applyDeadline && now.getTime() >= d.applyDeadline.getTime() + DAY) {
    return "call-closed";
  }
  return d.status;
}

/** Whether a session is published on `locale`'s pages. `lang: "az"` keeps it off /en/, and vice versa. */
export function showsIn(d: SessionData, locale: Locale): boolean {
  return d.lang === "both" || d.lang === locale;
}

/**
 * Title, theme and summary in `locale`. On the AZ pages each Azerbaijani field
 * is used when filled in, otherwise the English one.
 */
export function sessionText(d: SessionData, locale: Locale) {
  const az = locale === "az";
  const pick = (azText: string | undefined, en: string | undefined) => (az && azText?.trim()) || en;
  return {
    title: pick(d.titleAz, d.title)!,
    theme: pick(d.themeAz, d.theme)!,
    summary: pick(d.summaryAz, d.summary),
  };
}

/** The Azerbaijani description, when the AZ page should show it instead of the entry body. */
export function azBody(d: SessionData, locale: Locale): string | undefined {
  return locale === "az" && d.bodyAz?.trim() ? d.bodyAz : undefined;
}
