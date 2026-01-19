import { usePageEditor } from "../../shared/store/postCreate/postCreate";
import type { VideoBlock, ButtonBlock } from "../../entities/block/models/types";
import styles from "./blockStyles.module.scss";
import { Input } from "@ui/dist";

type EditableStyleKey =
  | "padding"
  | "paddingTop"
  | "paddingBottom"
  | "align"
  | "backgroundColor";

export const BlockStylePanel = () => {
  const selectedContainerId = usePageEditor((s) => s.selectedContainerId);

  const container = usePageEditor((s) =>
    selectedContainerId ? s.containers[selectedContainerId] : null
  );

  const block = usePageEditor((s) => {
    const bid = container?.blockId;
    return bid ? s.blocks[bid] : null;
  });

  const updateBlockStyles = usePageEditor((s) => s.updateBlockStyles);
  const updateBlock = usePageEditor((s) => s.updateBlock);

  if (!selectedContainerId) return null;

  if (!container?.blockId) {
    return <div className={styles.container}>Выбран контейнер без блока</div>;
  }

  if (!block) {
    return <div className={styles.container}>Block not found</div>;
  }

  const blockStyles = block.styles || {};

  const handleChange = (field: EditableStyleKey, value: any) => {
    updateBlockStyles(block.id, { [field]: value });
  };

  return (
    <div className={styles.container}>
      <h3>{block.type} Styles</h3>

      <div className={styles.containerBody}>
        <div className={styles.containerItem}>
          <label>Padding</label>
          <Input
            value={blockStyles.padding?.toString() ?? "0"}
            onlyNumber
            color="var(--attention)"
            onValueChange={(v) => handleChange("padding", Number(v || 0))}
          />
        </div>

        <div className={styles.containerItem}>
          <label>Padding Top</label>
          <Input
            value={blockStyles.paddingTop?.toString() ?? "0"}
            onlyNumber
            color="var(--attention)"
            onValueChange={(v) => handleChange("paddingTop", Number(v || 0))}
          />
        </div>

        <div className={styles.containerItem}>
          <label>Padding Bottom</label>
          <Input
            value={blockStyles.paddingBottom?.toString() ?? "0"}
            onlyNumber
            color="var(--attention)"
            onValueChange={(v) => handleChange("paddingBottom", Number(v || 0))}
          />
        </div>

        <div className={styles.containerItem}>
          <label>Alignment</label>
          <select
            className={styles.containerSelect}
            value={(blockStyles.align ?? "left") as any}
            onChange={(e) => handleChange("align", e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div className={styles.containerItem}>
          <label>Background Color</label>
          <input
            className={styles.containerColor}
            type="color"
            value={(blockStyles.backgroundColor as string) ?? "#ffffff"}
            onChange={(e) => handleChange("backgroundColor", e.target.value)}
          />
        </div>
      </div>

      {block.type === "IMAGE" && (
        <div className={styles.containerGroup}>
          <div className={styles.containerItem}>
            <label>Alt</label>
            <Input
              value={(block as any).alt ?? ""}
              color="var(--attention)"
              onValueChange={(v) => updateBlock(block.id, { alt: v })}
            />
          </div>

          <div className={styles.containerItem}>
            <label>Rounded</label>
            <input
              className={styles.containerCheckbox}
              type="checkbox"
              checked={(block as any).rounded ?? false}
              onChange={(e) => updateBlock(block.id, { rounded: e.target.checked })}
            />
          </div>
        </div>
      )}

      {block.type === "VIDEO" && (
        <div className={styles.containerGroup}>
          <h4 className={styles.containerTitle}>Video Block</h4>

          <div className={styles.containerItem}>
            <label>Autoplay</label>
            <input
              className={styles.containerCheckbox}
              type="checkbox"
              checked={(block as VideoBlock).autoplay ?? false}
              onChange={(e) => updateBlock(block.id, { autoplay: e.target.checked })}
            />
          </div>
        </div>
      )}

      {block.type === "BUTTON" && (
        <div className={styles.containerGroup}>
          <h4 className={styles.containerTitle}>Button Block</h4>

          <div className={styles.containerItem}>
            <label>Border Radius</label>
            <Input
              value={String((block as ButtonBlock).borderRadius ?? 0)}
              onlyNumber
              color="var(--attention)"
              onValueChange={(v) => updateBlock(block.id, { borderRadius: Number(v || 0) })}
            />
          </div>
        </div>
      )}
    </div>
  );
};
