import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://eyp.az',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'az'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
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
