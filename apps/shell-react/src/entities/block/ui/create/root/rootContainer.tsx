import React from "react";
import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";
import { CreateContainer } from "../container";
import styles from "./rootContainer.module.scss";
import { useDroppable } from "@dnd-kit/core";

function RootInsertZone({ index }: { index: number }) {
  const rootId = usePageEditor((s) => s.rootContainerId);

  const { setNodeRef, isOver } = useDroppable({
    id: `drop:root:index:${index}`,
    data: { kind: "ROOT_INSERT", parentId: rootId, index },
  });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.rootInsertZone} ${isOver ? styles.rootInsertZoneOver : ""}`}
    >
      <span className={styles.rootInsertPlus}>+</span>
    </div>
  );
}

export const RootContainer = React.memo(() => {
  const rootId = usePageEditor((s) => s.rootContainerId);
  const root = usePageEditor((s) => s.containers[s.rootContainerId]);

  if (!root) return null;

  const isEmpty = root.children.length === 0;

  return (
    <div className={styles.containerCanvasInner}>
      {isEmpty ? (
        <>
          <RootInsertZone index={0} />
          <div className={styles.containerCanvasEmpty}>
            <div className={styles.containerCanvasEmptyPlus}>+</div>
            <div className={styles.containerCanvasEmptyText}>
              Перетащите блок, чтобы начать
            </div>
          </div>
        </>
      ) : (
        <>
          <RootInsertZone index={0} />
          <div className={styles.containerRootChildren}>
            {root.children.map((childId, i) => (
              <React.Fragment key={childId}>
                <CreateContainer containerId={childId} />
                <RootInsertZone index={i + 1} />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
});
