import { nanoid } from "nanoid";
import type { Block, BlockType } from "../../models/types";

export const createBlock = (type: BlockType): Block => {
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
        styles: {},
      };

    case "VIDEO":
      return {
        id,
        type: "VIDEO",
        url: "",
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
      };

    case "BUTTON":
      return {
        id,
        type: "BUTTON",
        label: "Кнопка",
        href: "",
        styles: {},
      };

    case "EMBED":
      return {
        id,
        type: "EMBED",
        embedType: "REDDIT",
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
      };

    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
};
