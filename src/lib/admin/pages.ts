import type { Folder } from "./store";

/** Where the page text files live; see src/lib/page-text.ts. */
export const PAGES_FOLDER: Folder = { dir: "src/data/pages", ext: "json" };

export { PAGES, getPage } from "../page-text";
