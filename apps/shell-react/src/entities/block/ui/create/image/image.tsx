import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";
import styles from "./image.module.scss";
import { BlockCreatingProps } from "../types";
import { ImageBlock } from "../../../models/types";

export const CreateImage = ({
  containerId,
  blockId,
  index,
}: BlockCreatingProps) => {
  const block = usePageEditor((state) => state.blocks[blockId]) as ImageBlock;
  const updateBlock = usePageEditor((state) => state.updateBlock);

  const hasImage = Boolean(block.url);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];

      if (!file.type.startsWith("image/")) {
        console.warn("ignored non-image file:", file);
        return;
      }

      const previewUrl = URL.createObjectURL(file);

      updateBlock(blockId, {
        url: previewUrl,
        alt: file.name,
      });
    },
    [blockId, updateBlock],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  const rootClassName = [
    styles.container,
    isDragActive ? styles.containerDragging : "",
    hasImage ? styles.containerHasImage : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    open();
  };

  if (!block || block.type !== "IMAGE") return null;

  return (
    <div {...getRootProps({ className: rootClassName })}>
      <input {...getInputProps()} className={styles.containerInput} />

      {hasImage ? (
        <button
          type="button"
          className={styles.containerInner}
          onClick={handleClick}
        >
          <img
            src={block.url}
            alt={block.alt ?? ""}
            className={styles.containerInnerImage}
          />
        </button>
      ) : (
        <button
          type="button"
          className={styles.containerButton}
          onClick={handleClick}
        >
          Добавьте изображение
        </button>
      )}
    </div>
  );
};
