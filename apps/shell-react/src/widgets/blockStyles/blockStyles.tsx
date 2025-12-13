import { usePageEditor } from "../../shared/store/postCreate/postCreate";
import { Block, ImageBlock, VideoBlock, TextBlock, QuoteBlock, BaseBlock, ButtonBlock } from "../../entities/block/models/types";
import styles from "./blockStyles.module.scss";


export const BlockStylePanel = () => {

  const blockId = usePageEditor((state) => state.selectedContainerId);

    if (blockId === null) return null;

  const block = usePageEditor((state) => state.blocks[blockId]);
  const updateBlockStyles = usePageEditor((state) => state.updateBlockStyles);
  const updateBlock = usePageEditor((state) => state.updateBlock);

  if (!block) {
    return <div>Block not found</div>;
  }

  const handleChange = (field: keyof BaseBlock["styles"], value: any) => {
    updateBlockStyles(block.id, { [field]: value });
  };

  return (
    <div className="style-panel">
      <h3>{block.type} Styles</h3>

      <label>
        Padding
        <input
          type="number"
          value={styles.padding ?? 0}
          onChange={(e) => handleChange("padding", Number(e.target.value))}
        />
      </label>

      <label>
        Padding Top
        <input
          type="number"
          value={styles.paddingTop ?? 0}
          onChange={(e) => handleChange("paddingTop", Number(e.target.value))}
        />
      </label>

      <label>
        Padding Bottom
        <input
          type="number"
          value={styles.paddingBottom ?? 0}
          onChange={(e) => handleChange("paddingBottom", Number(e.target.value))}
        />
      </label>

      <label>
        Alignment
        <select
          value={styles.align ?? "left"}
          onChange={(e) => handleChange("align", e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </label>

      <label>
        Background Color
        <input
          type="color"
          value={styles.backgroundColor ?? "#ffffff"}
          onChange={(e) => handleChange("backgroundColor", e.target.value)}
        />
      </label>

      {block.type === "IMAGE" && (
        <div>
          <label>
            Alt
            <input
              type="number"
              value={block.alt ?? 0}
              onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
            />
          </label>
          <label>
            Rounded
            <input type="checkbox" id="example" checked={block.rounded} onChange={(e) => updateBlock(block.id, {rounded: e.target.checked})} />
          </label>
        </div>
      )}

      {block.type === "VIDEO" && (
        <div>
          <h4>Video Block</h4>
          <label>
            Autoplay
            <input
              type="checkbox"
              checked={(block as VideoBlock).autoplay ?? false}
              onChange={(e) => updateBlock(block.id, { autoplay: e.target.checked })}
            />
          </label>
        </div>
      )}

      {block.type === "BUTTON" && (
        <div>
          <h4>Button Block</h4>
          <label>
            Border Radius
            <input
              type="number"
              value={(block as ButtonBlock).borderRadius ?? 0}
              onChange={(e) => updateBlock(block.id, { borderRadius: Number(e.target.value) })}
            />
          </label>
        </div>
      )}
    </div>
  );
};
