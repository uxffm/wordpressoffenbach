import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const noindex = ['/danke/', '/impressum/', '/datenschutz/'];

export default defineConfig({
  site: 'https://wordpress-offenbach.de',
  integrations: [
    sitemap({
      filter: (page) => !noindex.some((path) => page.endsWith(path)),
      lastmod: new Date(),
    }),
  ],
});
