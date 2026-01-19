import styles from "./tag.module.scss";

export const Tag = ({ label, className }: TagChipProps) => {
    return (
    <span className={`${styles.container} ${className ?? ""}`}>
      {label}
    </span>
  );
};
