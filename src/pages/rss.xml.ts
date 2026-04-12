import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  // Sort by date, newest first
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Events All the Way Down',
    description: 'A blog on process ontology, intelligence, and becoming — by Franklin Silveira Baldo',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/events-all-the-way-down/blog/${post.id}/`,
    })),
    customData: `<language>en</language>`,
  });
}
