import type { CollectionEntry } from "astro:content";

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
