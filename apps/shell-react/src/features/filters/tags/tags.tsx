import { useEffect, useState } from "react";
import styles from "./tags.module.scss";
import { useQueryParams } from "../../../shared/lib/searchParams";

export const FilterTags = () => {
  const params = useQueryParams();

  const [tags, setTags] = useState<string[]>(
    params.getParam("tags")?.split(",") || [],
  );
  const [tagInput, setTagInput] = useState<string>("");

  useEffect(() => {
    const value = params.getParam("tags");
    setTags(value ? value.split(",") : []);
  }, [params]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      setTags(newTags);
      setTagInput("");
      params.setParam("tags", tags.join(","));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    params.setParam("tags", newTags.join(","));
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <div className={styles.containerTags}>
      <div className={styles.containerTagsInput}>
        <input
          className={styles.containerTagsInputSelf}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Добавьте тег"
        />
        <button
          className={styles.containerTagsInputButton}
          onClick={handleAddTag}
          disabled={!tagInput.trim()}
        >
          +
        </button>
      </div>
      {tags.length > 0 && (
        <div className={styles.containerTagsItems}>
          {tags.map((tag) => (
            <div
              key={tag}
              className={styles.containerTagsItemsItem}
              onClick={() => handleRemoveTag(tag)}
            >
              <span className={styles.containerTagsItemsItemText}>{tag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
