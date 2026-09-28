import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { jsonResponse } from "../../i18n/pages";

/**
 * GET /api/board.json — executive and supervisory boards.
 * Emails here are role-based addresses already published on the site;
 * never add a volunteer's personal address to the collection.
 */
export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? "https://eyp.az";

  const members = (await getCollection("board"))
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ id, data }) => ({
      id,
      name: data.name,
      role: data.role,
      roleAz: data.roleAz ?? null,
      body: data.body,
      email: data.email ?? null,
      term: data.term ?? null,
    }));

  return jsonResponse({
    site: origin,
    executive: members.filter((m) => m.body === "executive"),
    supervisory: members.filter((m) => m.body === "supervisory"),
  });
};
