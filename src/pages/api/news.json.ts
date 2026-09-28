import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { jsonResponse } from "../../i18n/pages";

/** GET /api/news.json — every published post, newest first. */
export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? "https://eyp.az";

  const posts = (await getCollection("news", ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map(({ id, data }) => ({
      id,
      title: data.title,
      date: data.date.toISOString().slice(0, 10),
      lang: data.lang,
      excerpt: data.excerpt ?? null,
      tags: data.tags,
      session: data.session?.id ?? null,
    }));

  return jsonResponse({ site: origin, count: posts.length, posts });
};
