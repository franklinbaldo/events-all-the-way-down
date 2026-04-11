/**
 * remark-download-images
 *
 * Downloads external images referenced in markdown to public/images/ at build
 * time and rewrites their URLs to local paths. This avoids runtime dependency
 * on external CDNs and lets images be served from the same origin.
 *
 * Usage in astro.config.mjs:
 *   import { remarkDownloadImages } from './src/plugins/remark-download-images.mjs';
 *   markdown: { remarkPlugins: [[remarkDownloadImages, { base: '/your-base' }]] }
 */

import { createHash } from 'node:crypto';
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/** Recursively walk an mdast tree and call visitor for nodes of the given type. */
function walk(node, type, visitor) {
  if (node.type === type) visitor(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, type, visitor);
  }
}

/**
 * @param {{ base?: string, publicDir?: string }} options
 *   base      - Astro base path (e.g. '/events-all-the-way-down'). Prepended to
 *               rewritten image src so the path resolves correctly on the deployed site.
 *   publicDir - Path to the public/ directory, resolved from process.cwd().
 *               Defaults to 'public'.
 */
export function remarkDownloadImages({ base = '', publicDir = 'public' } = {}) {
  const outputDir = join(process.cwd(), publicDir, 'images');

  return async function transformer(tree) {
    const imageNodes = [];

    walk(tree, 'image', (node) => {
      if (/^https?:\/\//.test(node.url)) imageNodes.push(node);
    });

    if (imageNodes.length === 0) return;

    mkdirSync(outputDir, { recursive: true });

    await Promise.all(
      imageNodes.map(async (node) => {
        const url = node.url;

        // Derive a stable filename: SHA-1 prefix of the URL + original extension.
        const hash = createHash('sha1').update(url).digest('hex').slice(0, 12);
        const urlPathname = new URL(url).pathname;
        const ext = urlPathname.includes('.')
          ? urlPathname.split('.').pop().toLowerCase()
          : 'png';
        const filename = `${hash}.${ext}`;
        const filepath = join(outputDir, filename);

        if (!existsSync(filepath)) {
          let res;
          try {
            res = await fetch(url);
          } catch (err) {
            console.warn(`[remark-download-images] fetch error for ${url}:`, err.message);
            return;
          }

          if (!res.ok) {
            console.warn(`[remark-download-images] HTTP ${res.status} for ${url}`);
            return;
          }

          const buffer = await res.arrayBuffer();
          writeFileSync(filepath, Buffer.from(buffer));
          console.log(`[remark-download-images] downloaded → public/images/${filename}`);
        }

        node.url = `${base}/images/${filename}`;
      })
    );
  };
}
