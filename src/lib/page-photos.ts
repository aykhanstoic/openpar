/**
 * Photo spots on the content pages (the dashed "Photo — session photography
 * goes here" boxes). Each spot shows a photo once one is uploaded in
 * /admin/photos, and the placeholder until then.
 *
 * Data: src/data/photos.json, `{ "<spot>": [ { "file": "pages/x.jpg",
 * "alt": { "en": "...", "az": "..." } } | null, ... ] }`. Files live in
 * src/assets/uploads/pages/. `file` is relative to src/assets/uploads/.
 */

export interface PhotoSpot {
  id: string;
  label: string;
  description: string;
  count: number;
  /** Page path without the language prefix, for the "see it" link. */
  path: string;
}

export const PHOTO_SPOTS: PhotoSpot[] = [
  { id: "home-gallery", label: "Home page — gallery", description: "The four photos under \"What a session looks like\".", count: 4, path: "" },
  { id: "about-mission", label: "About us — mission", description: "The photo next to the mission text.", count: 1, path: "about" },
  { id: "participate-row", label: "Get involved — photo row", description: "The row of photos under the five steps (the third is hidden on phones).", count: 3, path: "participate" },
];

export interface PagePhotoEntry {
  file: string;
  alt: { en: string; az: string };
}

export type PhotosFile = Record<string, (PagePhotoEntry | null)[]>;

/** The slots of a spot, padded to its count, so templates can index safely. */
export function slotsOf(data: PhotosFile, spot: string): (PagePhotoEntry | null)[] {
  const s = PHOTO_SPOTS.find((x) => x.id === spot);
  const list = data[spot] ?? [];
  return Array.from({ length: s?.count ?? list.length }, (_, i) => list[i] ?? null);
}
