// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ny4n.net',
  integrations: [
    icon(),
    sitemap({
      // /nekochan は隠しページなのでsitemapには載せない
      filter: (page) => !page.includes('/nekochan'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});