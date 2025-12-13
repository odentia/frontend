import type { EmbedBlock as EmbedBlockProps } from "../../models/types";

export const EmbedBlock = ({ block }: { block: EmbedBlockProps }) => {
  const { url, embedType, styles } = block;

  return (
    <div style={{ ...styles }}>
      <iframe
        src={url}
        style={{
          width: "100%",
          minHeight: 300,
          border: "none",
          borderRadius: 8,
        }}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};
