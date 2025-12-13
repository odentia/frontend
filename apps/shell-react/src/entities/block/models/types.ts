export type BlockType =
  | "TEXT"
  | "IMAGE"
  | "VIDEO"
  | "QUOTE"
  | "DIVIDER"
  | "BUTTON"
  | "EMBED"
  | "SPACER"
  | "GALLERY";

export interface CreateContainerProps {
  containerId: string;
}

export interface BaseBlock {
  id: string;
  type: BlockType;
  styles?: {
    paddingTop?: number;
    padding?: number;
    paddingBottom?: number;
    align?: "left" | "center" | "right";
    width?: string | number;
    height?: string | number;
    backgroundColor?: string;
  };
}

export interface ImageBlock extends BaseBlock {
  type: "IMAGE";
  url: string;
  alt?: string;
  caption?: string;
  rounded?: boolean;
}

export interface VideoBlock extends BaseBlock {
  type: "VIDEO";
  url: string;
  autoplay?: boolean;
  borderRadius?: number;
  loop?: boolean;
  muted?: boolean;
}

export interface TextBlock extends BaseBlock {
  type: "TEXT";
  markdown: string;
}

export interface QuoteBlock extends BaseBlock {
  type: "QUOTE";
  text: string;
  author?: string;
}

export interface DividerBlock extends BaseBlock {
  type: "DIVIDER";
  variant?: "line" | "dotted" | "space";
}

export interface ButtonBlock extends BaseBlock {
  type: "BUTTON";
  label: string;
  border?: boolean;
  href: string;
  borderRadius?: string | number;
  backgroundColor?: string;
  color?: string;
}

export interface EmbedBlock extends BaseBlock {
  type: "EMBED";
  embedType: "IFRAME" | "REDDIT" | "SPOTIFY" | "CUSTOM";
  url: string;
}

export interface SpacerBlock extends BaseBlock {
  type: "SPACER";
}

interface GalleryImage {
  id: string;
  url: string;
  alt?: string;
}

export interface GalleryBlock extends BaseBlock {
  type: "GALLERY";
  images: GalleryImage[];
  layout?: "grid" | "carousel";
}

export type Block =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | QuoteBlock
  | DividerBlock
  | ButtonBlock
  | EmbedBlock
  | SpacerBlock
  | GalleryBlock;
