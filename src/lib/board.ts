import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Board years. Each member carries `year`: the year their board's term began
 * (2026 for a 2026–2027 board). The current board is the newest year anyone
 * has been entered for; a member with no year counts as current, so entries
 * made before the field existed stay on the page.
 *
 * History reaches back to FIRST_BOARD_YEAR even where nobody has been entered
 * yet, so there is a place to fill in. Members older than that still show.
 */
export const FIRST_BOARD_YEAR = 2020;

export type BoardBody = "executive" | "supervisory";
type Member = CollectionEntry<"board">;

export async function boardYears(): Promise<{ current: number; years: number[] }> {
  const all = await getCollection("board");
  const set = all.map((m) => m.data.year).filter((y): y is number => typeof y === "number");
  /* Normally the newest year entered, not the calendar year: in January the
     new board may not be entered yet, and the old one must not drop off the
     page meanwhile. Members with no year are this year's board, so entering
     a past member (2024) never turns them into the 2024 board. */
  const undated = set.length < all.length;
  const current = Math.max(...set, ...(undated || set.length === 0 ? [new Date().getUTCFullYear()] : []));
  const oldest = Math.min(FIRST_BOARD_YEAR, ...set);
  const years: number[] = [];
  for (let y = current; y >= oldest; y--) years.push(y);
  return { current, years };
}

export async function boardMembers(body: BoardBody, year?: number): Promise<Member[]> {
  const { current } = await boardYears();
  const want = year ?? current;
  return (await getCollection("board", (m) => m.data.group === body && (m.data.year ?? current) === want)).sort(
    (a, b) => a.data.order - b.data.order,
  );
}
