import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wordpress-offenbach.de',
  integrations: [sitemap()],
});
