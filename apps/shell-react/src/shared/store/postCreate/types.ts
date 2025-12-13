import type { Block } from "../../../entities/block/models/types";
import type { Page } from "../../../entities/post/models";

export type LayoutDirection = "row" | "column" | null;

export interface LayoutContainer {
  id: string;

  direction: LayoutDirection;

  children: string[];

  blockId?: string;

  parentId?: string | null;
}

export interface PageEditorStyles {
  padding: number;
  [key: string]: unknown;
}

export interface PageEditorStore {
  id: string;
  title: string;
  styles: PageEditorStyles;

  rootContainerId: string;
  containers: Record<string, LayoutContainer>;
  blocks: Record<string, Block>;

  selectedContainerId: string | null;
  selectedBlockId: string | null;

  loadPage: (page: Page) => void;
  reset: () => void;

  setTitle: (title: string) => void;
  updatePageStyles: (patch: Partial<PageEditorStyles>) => void;

  addBlockToRoot: (block: Block, index?: number) => void;
  addBlockToContainer: (
    containerId: string,
    index: number | undefined,
    block: Block,
  ) => void;
  removeChildFromContainer: (containerId: string, childId: string) => void;
  setContainerDirection: (id: string, direction: LayoutDirection) => void;

  updateBlock: (blockId: string, patch: Partial<Block>) => void;
  updateBlockStyles: (blockId: string, patch: Partial<Block["styles"]>) => void;
  updateTextBlock: (blockId: string, markdown: string) => void;
  removeContainer: (containerId: string) => void;
  setSelection: (containerId: string | null, blockId: string | null) => void;
}
