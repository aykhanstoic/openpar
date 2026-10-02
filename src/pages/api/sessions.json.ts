import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { jsonResponse } from "../../i18n/pages";
import { currentStatus } from "../../lib/sessions";

/** GET /api/sessions.json — every published session, soonest first. */
export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? "https://eyp.az";

  const sessions = (await getCollection("sessions", ({ data }) => !data.draft))
    .sort((a, b) => a.data.startDate.valueOf() - b.data.startDate.valueOf())
    .map(({ id, data }) => ({
      id,
      title: data.title,
      theme: data.theme,
      summary: data.summary ?? null,
      venue: data.venue,
      city: data.city ?? null,
      startDate: data.startDate.toISOString().slice(0, 10),
      endDate: data.endDate.toISOString().slice(0, 10),
      status: currentStatus(data),
      type: data.type ?? null,
      outreach: data.outreach,
      applyDeadline: data.applyDeadline?.toISOString().slice(0, 10) ?? null,
      applyUrl: data.applyUrl ?? null,
      resolutionsUrl: data.resolutionsUrl ?? null,
    }));

  return jsonResponse({ site: origin, count: sessions.length, sessions });
};
