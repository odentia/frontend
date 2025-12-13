import { useEffect, useRef } from "react";
import styles from "./text.module.scss";
import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";

export const CreateText = ({ containerId, blockId, index }) => {
  const block = usePageEditor((s) => s.blocks[blockId]);
  const updateBlock = usePageEditor((s) => s.updateTextBlock);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  if (!block || block.type !== "TEXT") return null;

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateBlock(blockId, e.target.value);
    autoResize();
  };

  const wrap = (before: string, after: string = before) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    const newValue =
      value.slice(0, start) +
      before +
      value.slice(start, end) +
      after +
      value.slice(end);

    updateBlock(blockId, newValue);

    requestAnimationFrame(() => {
      autoResize();

      const deltaBefore = before.length;

      textarea.focus();
      textarea.selectionStart = start + deltaBefore;
      textarea.selectionEnd = end + deltaBefore;
    });
  };

  useEffect(() => {
    autoResize();
  }, [block.markdown]);

  return (
    <div className={styles.container}>
      <div className={styles.containerToolbar}>
        <button
          type="button"
          className={styles.containerToolbarItem}
          onClick={() => wrap("**")}
        >
          b
        </button>
        <button
          type="button"
          className={styles.containerToolbarItem}
          onClick={() => wrap("*")}
        >
          i
        </button>
        <button
          type="button"
          className={styles.containerToolbarItem}
          onClick={() => wrap("`")}
        >
          c
        </button>
        <button
          type="button"
          className={styles.containerToolbarItem}
          onClick={() => wrap("> ")}
        >
          q
        </button>
        <button
          type="button"
          className={styles.containerToolbarItem}
          onClick={() => wrap("[", "](url)")}
        >
          link
        </button>
      </div>

      <textarea
        id={`ta-${blockId}`}
        ref={textareaRef}
        className={styles.containerText}
        value={block.markdown}
        onChange={handleChange}
        placeholder="Введите текст..."
      />
    </div>
  );
};
