import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree: any, { data }: any) {
    const textOnPage = toString(tree);
    const words = textOnPage.trim().split(/\s+/).filter(w => w.length > 0).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    if (data.astro && data.astro.frontmatter) {
      data.astro.frontmatter.readingTime = readingTime;
    }
  };
}
