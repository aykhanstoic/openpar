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
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keep font files as files. Vite inlines small assets as base64 data:
      // URIs, which both bloats the render-blocking CSS and trips the
      // `font-src 'self'` CSP set in src/layouts/Base.astro.
      assetsInlineLimit: (filePath) => (filePath.endsWith('.woff2') ? false : undefined),
    },
  },
});
