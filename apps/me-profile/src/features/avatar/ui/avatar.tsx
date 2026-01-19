import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./avatar.module.scss";
import redact from "../../../shared/assets/redact.svg";
import type { AvatarProps } from "./types";

export const Avatar = ({ url, onPickFile, disabled }: AvatarProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    disabled: Boolean(disabled),
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024,
    onDrop: (files) => {
      const file = files?.[0];
      if (!file) return;
      onPickFile?.(file);
    },
  });

  const cls = useMemo(() => {
    const arr = [styles.container];
    if (isDragActive) arr.push(styles.containerActive);
    if (disabled) arr.push(styles.containerDisabled);
    return arr.join(" ");
  }, [isDragActive, disabled]);

  return (
    <div {...getRootProps()} className={cls}>
      <input {...getInputProps()} />
      <img src={url} className={styles.containerImage} alt="avatar" />
      <img src={redact} className={styles.containerRedact} alt="edit" />
    </div>
  );
};
