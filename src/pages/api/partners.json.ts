import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { jsonResponse } from "../../i18n/pages";

/** GET /api/partners.json — partner organisations by tier. */
export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? "https://eyp.az";

  const partners = (await getCollection("partners"))
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ id, data }) => ({
      id,
      name: data.name,
      url: data.url ?? null,
      tier: data.tier,
    }));

  return jsonResponse({ site: origin, count: partners.length, partners });
};
