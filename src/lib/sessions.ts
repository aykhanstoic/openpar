import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';

export type Session = CollectionEntry<'sessions'>;

const DAY_MS = 86_400_000;

/* All dates come from `z.coerce.date()` on a bare `YYYY-MM-DD`, so they are
   UTC midnight. Every read and every format below pins UTC — formatting in the
   build machine's local zone shifts a 12 Nov session to "Nov 11" anywhere west
   of Greenwich. */

/** Still relevant until the end of its final day, not from 00:00 UTC on it. */
export function isUpcoming(session: Session, now: Date): boolean {
  if (session.data.status === 'completed') return false;
  return session.data.endDate.getTime() + DAY_MS > now.getTime();
}

export function upcomingSessions(all: Session[], now: Date): Session[] {
  return all
    .filter((s) => isUpcoming(s, now))
    .sort((a, b) => a.data.startDate.valueOf() - b.data.startDate.valueOf());
}

/** The hero headlines what you can act on: soonest open call, else soonest
    upcoming, else nothing (caller renders the organisation-level hero). */
export function heroSession(all: Session[], now: Date): Session | undefined {
  const upcoming = upcomingSessions(all, now);
  return upcoming.find((s) => s.data.status === 'call-open') ?? upcoming[0];
}

/** Picks the locale's copy for the three translatable session fields, falling
    back to English when the AZ variant is absent. Every surface that renders
    session text goes through this — reading `session.data.title` directly
    ships English onto the AZ pages. */
export function localizeSession(
  session: Session,
  locale: Locale,
): { title: string; theme: string; venue: string } {
  const d = session.data;
  const pick = (en: string, az?: string) => (locale === 'az' && az ? az : en);
  return {
    title: pick(d.title, d.titleAz),
    theme: pick(d.theme, d.themeAz),
    venue: pick(d.venue, d.venueAz),
  };
}

export function formatDateRange(start: Date, end: Date, locale: Locale): string {
  const fmt = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return start.getTime() === end.getTime()
    ? fmt.format(start)
    : fmt.formatRange(start, end);
}

export function formatDay(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(date);
}

/** ISO date for <time datetime="…">, UTC, no time component. */
export function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}
