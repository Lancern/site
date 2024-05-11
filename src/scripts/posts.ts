import type { MarkdownInstance, MDXInstance } from "astro";

export interface PostFrontmatter {
  title: string;
  date: string | Date;
  draft?: boolean;
  category?: string;
  tags?: string[];
}

export type PostInstance = MarkdownInstance<PostFrontmatter> | MDXInstance<PostFrontmatter>;
