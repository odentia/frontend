import styles from "./tagsList.module.scss";
import { FilterTag } from "../../../features/filterByTag/ui";

export const TagsList = ({
  tags,
  mode = "toggle",
  className,
  itemClassName,
}: TagsListProps) => {
  if (!tags?.length) return null;

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      {tags.map((tag) => (
        <FilterTag
          key={tag}
          label={tag}
          mode={mode}
          className={itemClassName}
        />
      ))}
    </div>
  );
};
