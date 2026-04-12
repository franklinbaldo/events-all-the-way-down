import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkDownloadImages } from './src/plugins/remark-download-images.ts';
import { remarkReadingTime } from './src/plugins/remark-reading-time.ts';

const BASE = '/events-all-the-way-down';

export default defineConfig({
  site: 'https://franklinbaldo.github.io',
  base: BASE,
  output: 'static',
  integrations: [svelte(), mdx(), sitemap()],
  markdown: {
    remarkPlugins: [
      [remarkDownloadImages, { base: BASE }],
      remarkReadingTime,
    ],
  },
});
