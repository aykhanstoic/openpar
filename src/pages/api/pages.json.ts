import type { APIRoute } from "astro";
import { locales, useTranslations } from "../../i18n/ui";
import { pagesFor, jsonResponse } from "../../i18n/pages";

/**
 * GET /api/pages.json — index of every page on the site, both locales,
 * plus the other API endpoints. The machine-readable sitemap.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? "https://eyp.az";

  const pages = locales.flatMap((locale) => {
    const t = useTranslations(locale);
    return pagesFor(t).map((page) => ({
      slug: page.slug,
      locale,
      title: page.title,
      description: page.description,
      url: `${origin}/${locale}/${page.path ? `${page.path}/` : ""}`,
      endpoint: `${origin}/api/${locale}/${page.slug}.json`,
    }));
  });

  return jsonResponse({
    site: origin,
    locales,
    generated: new Date().toISOString(),
    collections: {
      sessions: `${origin}/api/sessions.json`,
      news: `${origin}/api/news.json`,
      board: `${origin}/api/board.json`,
      partners: `${origin}/api/partners.json`,
    },
    pages,
  });
};
