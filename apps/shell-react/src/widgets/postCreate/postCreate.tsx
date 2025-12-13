import { FC, KeyboardEventHandler, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { usePageEditor } from "../../shared/store/postCreate/postCreate";
import { renderCreateBlock } from "../../entities/block/models/registr";
import styles from "./postCreate.module.scss";

import { CreateContainer } from "../../entities/block/ui/create";
import { Input } from "@ui";
import { CreatePostButton } from "../../features/createPost/ui";

export const CreatePost: FC = () => {
  const title = usePageEditor((s) => s.title);
  const setTitle = usePageEditor((s) => s.setTitle);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const rootContainerId = usePageEditor((s) => s.rootContainerId);
  const containers = usePageEditor((s) => s.containers);
  const blocks = usePageEditor((s) => s.blocks);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const root = containers[rootContainerId];

  const { setNodeRef, isOver } = useDroppable({
    id: "root-drop",
    data: {
      kind: "ROOT",
      index: 0,
    },
  });

  const isEmptyRoot =
    root && !root.blockId && root.children && root.children.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <Input
          value={title}
          onValueChange={(value) => setTitle(value)}
          width="320px"
          height="40px"
          shadowBlur={5}
          shadowSpread={3}
          shadowColor="var(--attention)"
          placeholder="Введите название публикации"
          color="var(--border)"
        />
      </div>

      <div ref={setNodeRef} className={styles.containerCanvas}>
        {root && isEmptyRoot && (
          <div
            className={`${styles.containerCanvasEmpty} ${
              isOver ? styles.containerCanvasEmptyOver : ""
            }`}
          >
            <div className={styles.containerCanvasEmptyPlus}>+</div>
            <div className={styles.containerCanvasEmptyText}>
              перетащи сюда блок, чтобы начать
            </div>
          </div>
        )}

        {root && !isEmptyRoot && (
          <div className={styles.containerCanvasInner}>
            {root.blockId && blocks[root.blockId] && (
              <div className={styles.containerRootBlock}>
                {renderCreateBlock(blocks[root.blockId], rootContainerId, 0)}
              </div>
            )}

            {root.children.length > 0 && (
              <div className={styles.containerRootChildren}>
                {root.children.map((childId) => (
                  <CreateContainer key={childId} containerId={childId} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
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
            {tags.map((tag, index) => (
              <div
                key={index}
                className={styles.containerTagsItemsItem}
                onClick={() => handleRemoveTag(tag)}
              >
                <span className={styles.containerTagsItemsItemText}>{tag}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.containerButton}>
        <CreatePostButton tags={tags} />
      </div>
    </div>
  );
};
