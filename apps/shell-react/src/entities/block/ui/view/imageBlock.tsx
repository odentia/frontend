import type { ImageBlock as ImageBlockProps } from "../../models/types";

export const ImageBlock = ({ block }: { block: ImageBlockProps }) => {
  const { url, caption, rounded, alt, styles = {} } = block;

  return (
    <div style={{ ...styles, overflow: "hidden", display: "grid", gap: "5px" }}>
      <img
        src={url}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: rounded ? "999px" : "",
        }}
      />
      {block.caption && (
        <text style={{ width: "100%", textAlign: "center" }}>{caption}</text>
      )}
    </div>
  );
};
