export interface PostFrontmatter {
  title: string;
  date: string | Date;
  draft?: boolean;
  category?: string;
  tags?: string[];
}
