import type { QuoteBlock as QuoteBlockProps } from "../../models/types";

export const QuoteBlock = ({ block }: { block: QuoteBlockProps }) => {
  const { text, author } = block;

  return (
    <div style={{ ...block.styles }}>
      <blockquote
        style={{
          margin: 0,
          padding: "12px 16px",
          borderLeft: "4px solid var(--subtext)",
          fontStyle: "italic",
        }}
      >
        {text}
      </blockquote>
      {author && (
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            opacity: 0.7,
            textAlign: "right",
          }}
        >
          — {author}
        </div>
      )}
    </div>
  );
};
