import type { APIRoute } from "astro";
import { locales, useTranslations, type Locale } from "../../../i18n/ui";
import { pagesFor, jsonResponse } from "../../../i18n/pages";

/**
 * GET /api/{lang}/{page}.json — metadata for one page in one locale,
 * with links to the rendered page and to its translation.
 * Example: /api/en/about.json, /api/az/boards-executive.json
 */
export function getStaticPaths() {
  return locales.flatMap((lang) =>
    pagesFor(useTranslations(lang)).map((page) => ({
      params: { lang, page: page.slug },
    })),
  );
}

export const GET: APIRoute = ({ params, site }) => {
  const origin = site?.origin ?? "https://eyp.az";
  const locale = params.lang as Locale;
  const t = useTranslations(locale);

  // getStaticPaths guarantees the slug exists; find() cannot miss at runtime.
  const page = pagesFor(t).find((p) => p.slug === params.page)!;

  const urlFor = (l: Locale) => `${origin}/${l}/${page.path ? `${page.path}/` : ""}`;
  const other: Locale = locale === "az" ? "en" : "az";

  return jsonResponse({
    slug: page.slug,
    locale,
    title: page.title,
    description: page.description,
    url: urlFor(locale),
    alternates: {
      [other]: {
        url: urlFor(other),
        endpoint: `${origin}/api/${other}/${page.slug}.json`,
      },
    },
  });
};
