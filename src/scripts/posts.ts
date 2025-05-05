import type { MarkdownInstance, MDXInstance } from "astro";

export interface PostFrontmatter {
  title: string;
  date: string | Date;
  draft?: boolean;
  category?: string;
  tags?: string[];
}

export type PostInstance = MarkdownInstance<PostFrontmatter> | MDXInstance<PostFrontmatter>;

export interface PostFilter {
  category?: string;
  tag?: string;
  count?: number;
}

export function filterAndSortPosts(posts: PostInstance[], filter?: PostFilter): PostInstance[] {
  // Filter out draft posts first
  posts = posts.filter((post) => !post.frontmatter.draft);

  const category = filter?.category;
  if (category) {
    posts = posts.filter((post) => post.frontmatter.category === category);
  }

  const tag = filter?.tag;
  if (tag) {
    posts = posts.filter((post) => post.frontmatter.tags?.includes(tag));
  }

  // Sort all posts by their publish date
  posts.sort((lhs, rhs) => {
    let lhsDate = lhs.frontmatter.date;
    let rhsDate = rhs.frontmatter.date;
    if (typeof lhsDate === "string") {
      lhsDate = new Date(lhsDate);
    }
    if (typeof rhsDate === "string") {
      rhsDate = new Date(rhsDate);
    }

    // Sort in date descending order
    return rhsDate.valueOf() - lhsDate.valueOf();
  });

  // By default the 10 most recent posts are kept
  return posts.slice(0, filter?.count ?? 20);
}

export function getPostTags(posts: PostInstance[]): string[] {
  return getPostProperties(posts, (post) => post.frontmatter.tags);
}

export function getPostCategories(posts: PostInstance[]): string[] {
  return getPostProperties(posts, (post) => post.frontmatter.category);
}

function getPostProperties<T>(
  posts: PostInstance[],
  property: (post: PostInstance) => T | T[] | undefined,
): T[] {
  // Filter out draft posts first
  posts = posts.filter((post) => !post.frontmatter.draft);

  const ret = new Set<T>();
  for (const p of posts) {
    const props = property(p);
    if (typeof props === "undefined") {
      continue;
    }
    if (Array.isArray(props)) {
      for (const prop of props) {
        ret.add(prop);
      }
      continue;
    }
    ret.add(props);
  }
  return Array.from(ret);
}
