import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://franklinbaldo.github.io',
  base: '/events-all-the-way-down',
  output: 'static',
  integrations: [svelte(), mdx()],
});
