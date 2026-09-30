import { locales } from "./ui";

/**
 * Shared `getStaticPaths` for every page under `src/pages/[lang]/`.
 *
 * Re-exported by each page so there is exactly one list of locales in the
 * codebase. Adding a third language means editing `languages` in ui.ts and
 * nothing else.
 */
export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}
