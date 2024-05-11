import rss from "@astrojs/rss";

import type { PostInstance } from "@scripts/posts";

export async function GET(context: any) {
  const posts = Object.values(
    import.meta.glob<PostInstance>("../pages/posts/**/*.{md,mdx}", { eager: true }),
  );

  const rssItems = posts.map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: new Date(post.frontmatter.date),
  }));

  return rss({
    title: "Lancern's Home",
    description: "Lancern's personal home page",
    site: context.site,
    items: rssItems,
    customData: `<language>en-us</language>`,
  });
}
