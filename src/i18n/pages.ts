import type { Dict } from "./en";

/**
 * Registry of every page on the site, with its localized title and
 * description pulled from the dictionary. Powers the JSON endpoints under
 * /api/ — one entry here per page in src/pages/[lang]/.
 *
 * `slug` is the endpoint name (single URL segment, so nested pages flatten:
 * boards/executive -> boards-executive). `path` is the real page path
 * relative to the locale prefix.
 */
export interface PageMeta {
  slug: string;
  path: string;
  title: string;
  description: string;
}

export function pagesFor(t: Dict): PageMeta[] {
  return [
    { slug: "home", path: "", title: t.site.name, description: t.site.description },
    { slug: "what-is-eyp", path: "what-is-eyp", title: t.whatIsEyp.title, description: t.whatIsEyp.lead },
    { slug: "participate", path: "participate", title: t.participate.title, description: t.participate.lead },
    { slug: "sessions", path: "sessions", title: t.sessions.title, description: t.sessions.lead },
    { slug: "news", path: "news", title: t.news.title, description: t.news.lead },
    { slug: "about", path: "about", title: t.about.title, description: t.about.lead },
    { slug: "boards-executive", path: "boards/executive", title: t.boards.executiveTitle, description: t.boards.executiveLead },
    { slug: "boards-supervisory", path: "boards/supervisory", title: t.boards.supervisoryTitle, description: t.boards.supervisoryLead },
    { slug: "alumni", path: "alumni", title: t.alumni.title, description: t.alumni.lead },
    { slug: "partners", path: "partners", title: t.partners.title, description: t.partners.lead },
    { slug: "contact", path: "contact", title: t.contact.title, description: t.contact.lead },
    { slug: "privacy", path: "privacy", title: t.privacy.title, description: t.privacy.lead },
  ];
}

/** Shared JSON response helper so every endpoint sends the same headers. */
export function jsonResponse(payload: unknown): Response {
  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
