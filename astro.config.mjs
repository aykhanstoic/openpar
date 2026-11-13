import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://eyp.az',
  // Every public page stays prerendered (static). Only the /admin pages opt
  // out with `prerender = false`, and the adapter turns those into Vercel
  // Functions.
  adapter: vercel(),
  // Read at request time on the server, never bundled into the browser. All
  // optional so the site builds without them; /admin says what is missing.
  env: {
    schema: {
      ADMIN_PASSWORD: envField.string({ context: 'server', access: 'secret', optional: true }),
      ADMIN_SESSION_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      GITHUB_REPO: envField.string({ context: 'server', access: 'secret', default: 'aykhanstoic/openpar' }),
      GITHUB_BRANCH: envField.string({ context: 'server', access: 'secret', default: 'dev' }),
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'az'],
    // Manual: src/middleware.ts applies the usual prefix-always rules to
    // every path except /admin, which has no locale and would otherwise be
    // answered with a 404 status.
    routing: 'manual',
  },
  // Always emit stylesheets as files: small ones are otherwise inlined as
  // <style>, which the CSP in vercel.json forbids (style-src 'self').
  build: { inlineStylesheets: 'never' },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keep font files and scripts as files. Vite inlines small assets as
      // base64 data: URIs (bloats the render-blocking CSS, trips `font-src`),
      // and Astro inlines small scripts, which the CSP in vercel.json forbids
      // (script-src 'self').
      assetsInlineLimit: (filePath) => (/\.(woff2|js)$/.test(filePath) ? false : undefined),
    },
  },
});
