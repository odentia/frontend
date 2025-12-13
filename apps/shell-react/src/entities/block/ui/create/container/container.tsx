import { useDroppable } from "@dnd-kit/core";
import styles from "./container.module.scss";
import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";
import { LeafBlock, renderCreateBlock } from "../../../models/registr";
import React from "react";

interface CreateContainerProps {
  containerId: string;
}

type Side = "top" | "bottom" | "left" | "right";

interface SideDropZoneProps {
  containerId: string;
  side: Side;
}

const SideDropZone = ({ containerId, side }: SideDropZoneProps) => {
  const id = `container:${containerId}:side:${side}`;
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.sideDropZone} ${styles[side]} ${
        isOver ? styles.over : ""
      }`}
    >
      <span className={styles.plus}>+</span>
    </div>
  );
};

export const CreateContainer = React.memo(
  ({ containerId }: CreateContainerProps) => {
    const container = usePageEditor((s) => s.containers[containerId]);
    const blocks = usePageEditor((s) => s.blocks);
    const removeContainer = usePageEditor((s) => s.removeContainer);
    const setSelection = usePageEditor((s) => s.setSelection);
    const selection = usePageEditor((s) => s.selectedContainerId);

    if (!container) return null;

    const blockId = container.blockId;
    if (!blockId) return null;

    const contentBlock = blocks[blockId] as LeafBlock | undefined;
    if (!contentBlock) return null;

    const isRow = container.direction === "row";
    const isColumn = container.direction === "column";
    const isUndefined = container.direction === null;

    const handleRemove = () => {
      removeContainer(containerId);
    };

    const handleSelect: React.MouseEventHandler<HTMLDivElement> = (event) => {
      event.stopPropagation();
      setSelection(containerId, blockId);
    };

    if (isUndefined) {
      return (
        <div className={`${styles.container} ${selection === containerId ? styles.active : ""}`} onClick={handleSelect}>
          <div className={styles.containerHeader}>
            <button
              className={styles.containerHeaderRemove}
              type="button"
              onClick={handleRemove}
            >
              ×
            </button>
          </div>

          <SideDropZone containerId={containerId} side="left" />
          <div className={styles.containerContent}>
            <SideDropZone containerId={containerId} side="top" />
            {renderCreateBlock(contentBlock, containerId, 0)}
            <SideDropZone containerId={containerId} side="bottom" />
          </div>
          <SideDropZone containerId={containerId} side="right" />
        </div>
      );
    }

    return (
      <div className={`${styles.container} ${selection === containerId ? styles.active : ""}`} onClick={handleSelect}>
        <div className={styles.containerHeader}>
          <button
            className={styles.containerHeaderRemove}
            type="button"
            onClick={handleRemove}
          >
            ×
          </button>
        </div>

        {isRow && <SideDropZone containerId={containerId} side="left" />}

        <div
          className={styles.containerInner}
          style={{
            flexDirection: isRow ? "row" : "column",
          }}
        >
          {isColumn && <SideDropZone containerId={containerId} side="top" />}

          <div className={styles.containerContent}>
            {renderCreateBlock(contentBlock, containerId, 0)}
          </div>

          {container.children.length > 0 && (
            <div
              className={styles.children}
              style={{
                flexDirection: isRow ? "row" : "column",
              }}
            >
              {container.children.map((childId) => (
                <CreateContainer key={childId} containerId={childId} />
              ))}
            </div>
          )}

          {isColumn && <SideDropZone containerId={containerId} side="bottom" />}
        </div>

        {isRow && <SideDropZone containerId={containerId} side="right" />}
      </div>
    );
  },
);
