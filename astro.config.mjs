import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import { remarkDownloadImages } from './src/plugins/remark-download-images.ts';

const BASE = '/events-all-the-way-down';

export default defineConfig({
  site: 'https://franklinbaldo.github.io',
  base: BASE,
  output: 'static',
  integrations: [svelte(), mdx()],
  markdown: {
    remarkPlugins: [
      [remarkDownloadImages, { base: BASE }],
    ],
  },
});
