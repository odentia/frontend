import { useEffect, useRef, type ChangeEvent } from "react";
import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";
import styles from "./quote.module.scss";
import { BlockCreatingProps } from "../types";

export const CreateQuote = ({
  containerId,
  blockId,
  index,
}: BlockCreatingProps) => {
  const block = usePageEditor((s) => s.blocks[blockId]);
  const update = usePageEditor((s) => s.updateBlock);

  const ref = useRef<HTMLTextAreaElement>(null);

  if (!block || block.type !== "QUOTE") return null;

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    update(blockId, { text: e.target.value });
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const onAuthorChange = (e: ChangeEvent<HTMLInputElement>) =>
    update(blockId, { author: e.target.value });

  return (
    <div className={styles.container}>
      <div className={styles.containerBar} />

      <div className={styles.containerContent}>
        <textarea
          className={styles.containerContentText}
          value={block.text}
          onChange={onTextChange}
          placeholder="введите текст цитаты..."
          ref={ref}
        />

        <div className={styles.containerContentAuthorRow}>
          <span className={styles.containerContentAuthorRowDash}>-</span>

          <input
            type="text"
            className={styles.containerContentAuthorRowAuthor}
            value={block.author ?? ""}
            onChange={onAuthorChange}
            placeholder="автор"
          />
        </div>
      </div>
    </div>
  );
};
