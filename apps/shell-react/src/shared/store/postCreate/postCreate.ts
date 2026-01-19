import { create } from "zustand";
import { nanoid } from "nanoid";

import type { Page } from "../../../entities/post/models";
import type { Block } from "../../../entities/block/models/types";
import type {
  LayoutContainer,
  PageEditorStore,
  PageEditorStyles,
} from "./types";

const createRootContainer = (): {
  rootContainerId: string;
  containers: Record<string, LayoutContainer>;
} => {
  const rootId = nanoid();

  const rootContainer: LayoutContainer = {
    id: rootId,
    direction: "column",
    children: [],
    blockId: undefined,
    parentId: null,
  };

  return {
    rootContainerId: rootId,
    containers: {
      [rootId]: rootContainer,
    },
  };
};

const initialStyles: PageEditorStyles = {
  padding: 24,
};

export const usePageEditor = create<PageEditorStore>((set, get) => {
  const initialIds = createRootContainer();

  return {
    id: nanoid(),
    title: "",
    description: "",
    styles: initialStyles,
    rootContainerId: initialIds.rootContainerId,
    containers: initialIds.containers,
    blocks: {},
    game: null,
    selectedContainerId: null,
    selectedBlockId: null,

    loadPage: (page: Page) =>
      set({
        id: page.id,
        title: page.title ?? "",
        styles: page.styles as PageEditorStyles,
        rootContainerId: page.rootContainerId,
        containers: page.containers as Record<string, LayoutContainer>,
        blocks: page.blocks,
        game: (page as any).game ?? null,
      }),

    reset: () => {
      const ids = createRootContainer();

      set({
        id: nanoid(),
        title: "",
        description: "",
        game: null,
        styles: initialStyles,
        rootContainerId: ids.rootContainerId,
        containers: ids.containers,
        blocks: {},
      });
    },

    setSelection: (containerId, blockId) =>
      set({
        selectedContainerId: containerId,
        selectedBlockId: blockId,
      }),

    setContainerDirection: (id, direction) =>
      set((state) => {
        const container = state.containers[id];
        if (!container) return state;

        return {
          ...state,
          containers: {
            ...state.containers,
            [id]: {
              ...container,
              direction,
            },
          },
        };
      }),

    setTitle: (title) => set(() => ({ title })),

    setDescription: (description) => set(() => ({ description })),
    setGame: (game) => set(() => ({ game })),

    updatePageStyles: (patch) =>
      set((state) => ({
        styles: {
          ...state.styles,
          ...patch,
        },
      })),

    addBlockToRoot: (block, index) =>
      set((state) => {
        const root = state.containers[state.rootContainerId];
        if (!root) return state;

        const blocks: Record<string, Block> = {
          ...state.blocks,
          [block.id]: block,
        };

        const containers = { ...state.containers };

        if (!root.blockId && root.children.length === 0) {
          containers[root.id] = {
            ...root,
            blockId: block.id,
          };

          return { blocks, containers };
        }

        const childContainerId = nanoid();
        const childContainer: LayoutContainer = {
          id: childContainerId,
          direction: null,
          children: [],
          blockId: block.id,
          parentId: root.id,
        };

        containers[childContainerId] = childContainer;

        const childrenIds = [...root.children];
        if (
          typeof index === "number" &&
          index >= 0 &&
          index <= childrenIds.length
        ) {
          childrenIds.splice(index, 0, childContainerId);
        } else {
          childrenIds.push(childContainerId);
        }

        containers[root.id] = {
          ...root,
          children: childrenIds,
        };

        return { blocks, containers };
      }),

    removeContainer: (containerId: string) =>
      set((state) => {
        const containers = { ...state.containers };
        const blocks = { ...state.blocks };

        const target = containers[containerId];
        if (!target) return state;

        if (containerId === state.rootContainerId) {
          return state;
        }

        const deleteSubtree = (id: string) => {
          const c = containers[id];
          if (!c) return;

          if (c.blockId) {
            delete blocks[c.blockId];
          }

          for (const childId of c.children) {
            deleteSubtree(childId);
          }

          delete containers[id];
        };

        deleteSubtree(containerId);

        if (target.parentId) {
          const parent = containers[target.parentId];
          if (parent) {
            containers[target.parentId] = {
              ...parent,
              children: parent.children.filter((id) => id !== containerId),
            };
          }
        }

        return {
          ...state,
          containers,
          blocks,
        };
      }),

    addBlockToContainer: (containerId, index, block) =>
      set((state) => {
        const parent = state.containers[containerId];
        if (!parent) return state;

        const blocks: Record<string, Block> = {
          ...state.blocks,
          [block.id]: block,
        };

        const containers = { ...state.containers };

        if (!parent.blockId && parent.children.length === 0) {
          containers[containerId] = {
            ...parent,
            blockId: block.id,
          };

          return { blocks, containers };
        }

        const childContainerId = nanoid();
        const childContainer: LayoutContainer = {
          id: childContainerId,
          direction: null,
          children: [],
          blockId: block.id,
          parentId: containerId,
        };

        containers[childContainerId] = childContainer;

        const childrenIds = [...parent.children];
        if (
          typeof index === "number" &&
          index >= 0 &&
          index <= childrenIds.length
        ) {
          childrenIds.splice(index, 0, childContainerId);
        } else {
          childrenIds.push(childContainerId);
        }

        containers[containerId] = {
          ...parent,
          children: childrenIds,
        };

        return { blocks, containers };
      }),

    removeChildFromContainer: (containerId, childId) =>
      set((state) => {
        const parent = state.containers[containerId];
        if (!parent) return state;

        const children = parent.children.filter((id) => id !== childId);

        return {
          containers: {
            ...state.containers,
            [containerId]: {
              ...parent,
              children,
            },
          },
        };
      }),

    updateBlock: (blockId, patch) =>
      set((state) => {
        const block = state.blocks[blockId];
        if (!block) return state;

        return {
          blocks: {
            ...state.blocks,
            [blockId]: {
              ...block,
              ...patch,
            } as Block,
          },
        };
      }),

    updateBlockStyles: (blockId, patch) =>
      set((state) => {
        const block = state.blocks[blockId];
        if (!block) return state;

        return {
          blocks: {
            ...state.blocks,
            [blockId]: {
              ...block,
              styles: {
                ...block.styles,
                ...patch,
              },
            } as Block,
          },
        };
      }),

    updateTextBlock: (blockId, markdown) =>
      set((state) => {
        const block = state.blocks[blockId];
        if (!block || block.type !== "TEXT") return state;

        return {
          blocks: {
            ...state.blocks,
            [blockId]: {
              ...block,
              markdown,
            },
          },
        };
      }),
  };
});
