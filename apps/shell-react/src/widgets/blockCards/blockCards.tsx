import styles from "./blockCards.module.scss";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { BLOCK_DEFINITIONS } from "../../entities/block/ui/create/types";
import type { BlockType } from "../../entities/block/models/types";
import React, { useEffect } from "react";

interface BlockCardProps {
  type: BlockType;
  label: string;
}

const BlockCardInner = React.memo(({ label }: { label: string }) => {
  return <div className={styles.containerBodyItemType}>{label}</div>;
});

const BlockCard = ({ type, label }: BlockCardProps) => {
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: `palette-${type}`,
      data: {
        kind: "NEW_BLOCK",
        blockType: type,
      },
    });

  const style: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <button
      ref={setNodeRef}
      type="button"
      className={`${styles.containerBodyItem} ${
        isDragging ? styles.containerBodyItemDragging : ""
      }`}
      style={style}
      {...listeners}
      {...attributes}
    >
      <BlockCardInner label={label} />
    </button>
  );
};

export const BlockCards = React.memo(() => {
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <span className={styles.containerHeaderHint}>
          Перетащите блок на холст
        </span>
      </div>

      <div className={styles.containerBody}>
        <div className={styles.containerBodyList}>
          {BLOCK_DEFINITIONS.map((def) => (
            <BlockCard
              key={def.type}
              type={def.type as BlockType}
              label={def.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
