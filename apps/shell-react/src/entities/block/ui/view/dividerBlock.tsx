import type { DividerBlock as DividerBlockProps } from "../../models/types";

export const DividerBlock = ({ block }: { block: DividerBlockProps }) => {
  const { variant = "line" } = block;

  if (variant === "space") {
    return (
      <div style={{ ...block.styles, height: block.styles?.height ?? 16 }} />
    );
  }

  const borderStyle =
    variant === "dotted"
      ? "1px dotted rgba(0,0,0,0.2)"
      : "1px solid rgba(0,0,0,0.2)";

  return (
    <div style={{ ...block.styles }}>
      <hr
        style={{
          margin: 0,
          border: "none",
          borderTop: borderStyle,
        }}
      />
    </div>
  );
};
