import { useEffect, useMemo, useState } from "react";
import styles from "./tags.module.scss";
import { useQueryParams } from "../../../shared/lib/searchParams";

export const FilterTags = () => {
  const params = useQueryParams();

  const tagsFromUrl = useMemo(() => {
    const multi = params.getAll("tags");
    if (multi.length > 1) return multi;

    const single = params.getParam("tags");
    if (!single) return [];
    return single.split(",").filter(Boolean);
  }, [params.search]);

  const [tags, setTags] = useState<string[]>(
    params.getParam("tags")?.split(",") || [],
  );
  const [tagInput, setTagInput] = useState<string>("");

  useEffect(() => {
    const same =
      tags.length === tagsFromUrl.length &&
      tags.every((t, i) => t === tagsFromUrl[i]);

    if (!same) setTags(tagsFromUrl);
  }, [tagsFromUrl]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      setTags(newTags);
      setTagInput("");
      params.setParam("tags", newTags.join(","));
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
