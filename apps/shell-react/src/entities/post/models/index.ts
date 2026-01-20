import type { Block } from "../../block/models/types";

export interface PageStyles {
  backgroundColor?: string;
  backgroundImage?: string;
  padding?: number;
  maxWidth?: number | string;
  fontFamily?: string;
  textColor?: string;
}

interface Author {
  name: string;
  avatar: string;
  id: string;
}

export type LayoutDirection = "row" | "column";

export interface LayoutContainer {
  id: string;

  direction: LayoutDirection;

  children: string[];

  blockId?: string;

  parentId?: string | null;
}

export interface PostData {
  total: number,
  posts: Post[],
}

export interface Post {
  id: string;
  author: Author;
  description: string;
  created_at: string;
  title?: string;
  rating: number;
  isPositive: boolean;
  isLikedByMe: boolean;
  isDislikedByMe: boolean;
  commentCount: number;
  tags: string[];
  page: Page;
}

export interface Page {
  styles: PageStyles;
  rootContainerId: string;
  containers: Record<string, LayoutContainer>;
  blocks: Record<string, Block>;
}

export interface PostQueryParams {
  search?: string;
  tags?: string[];
  game?: string;
  rating_from?: string;
  rating_to?: string;
  comments_from?: string;
  comments_to?: string;
}
