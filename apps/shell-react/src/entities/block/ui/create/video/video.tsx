import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";
import styles from "./video.module.scss";
import { BlockCreatingProps } from "../types";

export const CreateVideo = ({
  containerId: _containerId,
  blockId,
  index: _index,
}: BlockCreatingProps) => {
  const block = usePageEditor((state) => state.blocks[blockId]);
  const updateBlock = usePageEditor((state) => state.updateBlock);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];

      if (!file.type.startsWith("video/")) {
        console.warn("ignored non-video file:", file);
        return;
      }

      const previewUrl = URL.createObjectURL(file);

      updateBlock(blockId, {
        url: previewUrl,
      });
    },
    [blockId, updateBlock],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  if (!block || block.type !== "VIDEO") return null;

  const hasVideo = Boolean(block.url);

  const rootClassName = [
    styles.container,
    isDragActive ? styles.containerDragging : "",
    hasVideo ? styles.containerHasVideo : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    open();
  };

  return (
    <div {...getRootProps({ className: rootClassName })}>
      <input {...getInputProps()} className={styles.input} />

      {hasVideo ? (
        <button
          type="button"
          className={styles.videoWrapper}
          onClick={handleClick}
        >
          <video src={block.url} className={styles.video} controls />
        </button>
      ) : (
        <button
          type="button"
          className={styles.containerButton}
          onClick={handleClick}
        >
          Добавьте видео-файл
        </button>
      )}
    </div>
  );
};