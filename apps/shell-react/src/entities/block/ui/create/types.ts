import type { BlockType } from "../../models/types";

export const BLOCK_DEFINITIONS: { type: BlockType; label: string }[] = [
  { type: "TEXT", label: "Текст" },
  { type: "IMAGE", label: "Картинка" },
  { type: "VIDEO", label: "Видео" },
  { type: "QUOTE", label: "Цитата" },
  { type: "DIVIDER", label: "Разделитель" },
  { type: "SPACER", label: "Отступ" },
];

export interface BlockCreatingProps {
  containerId: string;
  blockId: string;
  index: number;
}
