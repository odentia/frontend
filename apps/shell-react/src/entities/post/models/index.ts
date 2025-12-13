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
  id: number;
}

export type LayoutDirection = "row" | "column";

export interface LayoutContainer {
  id: string;

  direction: LayoutDirection;

  children: string[];

  blockId?: string;

  parentId?: string | null;
}

export interface Page {
  id: string;
  author: Author;
  created_at: string;
  title?: string;
  styles: PageStyles;

  rootContainerId: string;

  containers: {
    root: {
      id: "root";
      direction: "column";
      blockId: "t-title";
      children: ["c-quote", "c-text-image", "c-gallery", "c-button"];
    };
  };

  blocks: Record<string, Block>;
}
