import { FC, ReactNode } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { usePageEditor } from "../../shared/store/postCreate/postCreate";
import type { BlockType } from "../../entities/block/models/types";
import { createBlockByType } from "../../entities/block/models/registr";

interface Props {
  children: ReactNode;
}

export const EditorDndProvider: FC<Props> = ({ children }) => {
  const addBlockToRoot = usePageEditor((s) => s.addBlockToRoot);
  const addBlockToContainer = usePageEditor((s) => s.addBlockToContainer);
  const containers = usePageEditor((s) => s.containers);
  const setContainerDirection = usePageEditor((s) => s.setContainerDirection);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const data = active.data.current as
      | { kind: "NEW_BLOCK"; blockType: BlockType }
      | undefined;

    if (!data || data.kind !== "NEW_BLOCK") return;

    const block = createBlockByType(data.blockType);

    if (over.id === "root-drop") {
      const index = (over.data?.current as any)?.index ?? 0;
      addBlockToRoot(block, index);
      return;
    }

    const match = String(over.id).match(
      /^container:(.+):side:(top|bottom|left|right)$/i,
    );
    if (!match) return;

    const [, containerId, side] = match as [
      string,
      string,
      "top" | "bottom" | "left" | "right",
    ];

    const parent = containers[containerId];
    if (!parent) return;

    const childrenCount = parent.children.length;

    const directionFromSide: "row" | "column" =
      side === "left" || side === "right" ? "row" : "column";

    const direction = parent.direction ?? directionFromSide;
    if (!parent.direction) {
      setContainerDirection(containerId, directionFromSide);
    }

    let index: number;

    if (direction === "row") {
      index = side === "left" ? 0 : childrenCount;
    } else {
      index = side === "top" ? 0 : childrenCount;
    }

    addBlockToContainer(containerId, index, block);
  };

  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
};
