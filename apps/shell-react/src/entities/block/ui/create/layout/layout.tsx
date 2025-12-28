import React from "react";
import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";
import type { LeafBlock } from "../../../models/registr";

import styles from "./layout.module.scss";

interface CreateBlockFrameProps {
  block: LeafBlock;
  rowId: string;
  children: React.ReactNode;
}

const mapAlignToTextAlign = (align?: "left" | "center" | "right") => {
  switch (align) {
    case "center":
      return "center";
    case "right":
      return "right";
    case "left":
    default:
      return "left";
  }
};

export const CreateBlockLayout: React.FC<CreateBlockFrameProps> = ({
  block,
  children,
  rowId,
}) => {
  const deleteBlock = usePageEditor((state) => state.deleteBlock);
  const updateBlock = usePageEditor((state) => state.updateBlock);

  const { styles: s = {} } = block;

  const wrapperStyle: React.CSSProperties = {
    paddingTop: s.paddingTop,
    paddingBottom: s.paddingBottom,
    padding: s.padding,
    width: s.width,
    height: s.height,
    backgroundColor: s.backgroundColor,
    textAlign: mapAlignToTextAlign(s.align),
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteBlock(rowId, block.id);
  };

  const handleToggleAlign = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextAlign =
      s.align === "left" ? "center" : s.align === "center" ? "right" : "left";

    updateBlock(block.id, {
      styles: {
        ...s,
        align: nextAlign,
      },
    });
  };

  return (
    <div className={styles.wrapper} style={wrapperStyle}>
      <div className={styles.header}>
        <span className={styles.typeLabel}>{block.type.toLowerCase()}</span>

        <div className={styles.actions}>
          {/* пример общей кнопки для изменения стилей */}
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleToggleAlign}
          >
            align
          </button>

          <button
            type="button"
            className={styles.actionButton}
            onClick={handleDelete}
          >
            ✕
          </button>
        </div>
      </div>

      <div className={styles.body}>{children}</div>
    </div>
  );
};
