import React, { FC } from "react";
import { nanoid } from "nanoid";

import {
  TextBlock as TextView,
  ImageBlock as ImageView,
  VideoBlock as VideoView,
  QuoteBlock as QuoteView,
  DividerBlock as DividerView,
  ButtonBlock as ButtonView,
  EmbedBlock as EmbedView,
  SpacerBlock as SpacerView,
  GalleryBlock as GalleryView,
} from "../ui/view";

import {
  CreateText,
  CreateImage,
  CreateVideo,
  CreateQuote,
  CreateDivider,
  CreateSpacer,
  // CreateButton,
  // CreateEmbed,
  // CreateGallery,
} from "../ui/create";

import type { BlockType, Block } from "./types";

export type LeafBlockType = BlockType;
export type LeafBlock = Block;

const BLOCK_COMPONENTS: Record<LeafBlockType, FC<any>> = {
  TEXT: TextView,
  IMAGE: ImageView,
  VIDEO: VideoView,
  QUOTE: QuoteView,
  DIVIDER: DividerView,
  BUTTON: ButtonView,
  EMBED: EmbedView,
  SPACER: SpacerView,
  GALLERY: GalleryView,
};

interface CreateBlockCommonProps {
  blockId: string;
  containerId: string;
  index: number;
}

type CreateBlockComponent = FC<CreateBlockCommonProps>;

const CREATE_BLOCK_COMPONENTS: Partial<
  Record<LeafBlockType, CreateBlockComponent>
> = {
  TEXT: CreateText,
  IMAGE: CreateImage,
  VIDEO: CreateVideo,
  QUOTE: CreateQuote,
  DIVIDER: CreateDivider,
  SPACER: CreateSpacer,
  // BUTTON: CreateButton,
  // EMBED: CreateEmbed,
  // GALLERY: CreateGallery,
};

export const renderLeafBlock = (block: LeafBlock) => {
  const Component = BLOCK_COMPONENTS[block.type as LeafBlockType];
  if (!Component) return null;

  return <Component block={block as any} />;
};

export const renderCreateBlock = (
  block: LeafBlock,
  containerId: string,
  index: number,
) => {
  const Component = CREATE_BLOCK_COMPONENTS[block.type as LeafBlockType];
  if (!Component) return null;

  return (
    <Component blockId={block.id} containerId={containerId} index={index} />
  );
};

export const createBlockByType = (type: BlockType): Block => {
  const id = nanoid();

  switch (type) {
    case "TEXT":
      return {
        id,
        type: "TEXT",
        markdown: "",
        styles: {},
      };

    case "IMAGE":
      return {
        id,
        type: "IMAGE",
        url: "",
        alt: "",
        caption: "",
        rounded: false,
        styles: {},
      };

    case "VIDEO":
      return {
        id,
        type: "VIDEO",
        url: "",
        autoplay: false,
        loop: false,
        muted: true,
        styles: {},
      };

    case "QUOTE":
      return {
        id,
        type: "QUOTE",
        text: "",
        author: "",
        styles: {},
      };

    case "DIVIDER":
      return {
        id,
        type: "DIVIDER",
        variant: "line",
        styles: {},
      };

    case "BUTTON":
      return {
        id,
        type: "BUTTON",
        label: "кнопка",
        href: "#",
        border: true,
        borderRadius: 999,
        backgroundColor: "",
        color: "",
        styles: {},
      };

    case "EMBED":
      return {
        id,
        type: "EMBED",
        embedType: "IFRAME",
        url: "",
        styles: {},
      };

    case "SPACER":
      return {
        id,
        type: "SPACER",
        styles: {},
      };

    case "GALLERY":
      return {
        id,
        type: "GALLERY",
        images: [],
        layout: "grid",
        styles: {},
      };

    default:
      return {
        id,
        type: "TEXT",
        markdown: "",
        styles: {},
      };
  }
};
