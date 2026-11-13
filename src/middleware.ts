import { defineMiddleware } from "astro:middleware";
import { middleware as i18n } from "astro:i18n";

/**
 * Locale routing for the public site (every page under /en/ or /az/), as
 * `prefixDefaultLocale: true` did before routing went manual. /admin is
 * English-only and outside the locale tree, so it skips this.
 */
const localeRouting = i18n({ prefixDefaultLocale: true, redirectToDefaultLocale: true });

export const onRequest = defineMiddleware((context, next) => {
  const p = context.url.pathname;
  if (p === "/admin" || p.startsWith("/admin/")) return next();
  return localeRouting(context, next);
});
