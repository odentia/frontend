import { usePageEditor } from "../../shared/store/postCreate/postCreate";
import { VideoBlock, ButtonBlock } from "../../entities/block/models/types";
import styles from "./blockStyles.module.scss";

export const BlockStylePanel = () => {
  const blockId = usePageEditor((state) => state.selectedContainerId);

  const block = usePageEditor((state) => state.blocks[blockId || 0]);
  const updateBlockStyles = usePageEditor((state) => state.updateBlockStyles);
  const updateBlock = usePageEditor((state) => state.updateBlock);

  if (!block) {
    return <div>Block not found</div>;
  }

  const handleChange = (
    field: keyof {
      padding?: number;
      paddingTop?: number;
      paddingBottom?: number;
      align?: string;
      backgroundColor?: string;
    },
    value: any,
  ) => {
    updateBlockStyles(block.id, { [field]: value });
  };

  if (blockId === null) return null;

  const blockStyles = block.styles || {};

  return (
    <div className={styles.container}>
      <h3>{block.type} Styles</h3>

      <label>
        Padding
        <input
          type="number"
          value={blockStyles.padding ?? 0}
          onChange={(e) => handleChange("padding", Number(e.target.value))}
        />
      </label>

      <label>
        Padding Top
        <input
          type="number"
          value={blockStyles.paddingTop ?? 0}
          onChange={(e) => handleChange("paddingTop", Number(e.target.value))}
        />
      </label>

      <label>
        Padding Bottom
        <input
          type="number"
          value={blockStyles.paddingBottom ?? 0}
          onChange={(e) =>
            handleChange("paddingBottom", Number(e.target.value))
          }
        />
      </label>

      <label>
        Alignment
        <select
          value={blockStyles.align ?? "left"}
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
          value={blockStyles.backgroundColor ?? "#ffffff"}
          onChange={(e) => handleChange("backgroundColor", e.target.value)}
        />
      </label>

      {block.type === "IMAGE" && (
        <div>
          <label>
            Alt
            <input
              type="text"
              value={block.alt ?? ""}
              onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
            />
          </label>
          <label>
            Rounded
            <input
              type="checkbox"
              checked={block.rounded ?? false}
              onChange={(e) =>
                updateBlock(block.id, { rounded: e.target.checked })
              }
            />
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
              onChange={(e) =>
                updateBlock(block.id, { autoplay: e.target.checked })
              }
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
              onChange={(e) =>
                updateBlock(block.id, { borderRadius: Number(e.target.value) })
              }
            />
          </label>
        </div>
      )}
    </div>
  );
};
