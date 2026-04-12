import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site?.toString().replace(/\/$/, '') ?? '';
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemapUrl = `${site}${base}/sitemap-index.xml`;

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    }
  );
}
