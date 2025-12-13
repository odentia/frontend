import { TextBlock as TextBlockProps } from "../../models/types";
import ReactMarkdown from "react-markdown";

export const TextBlock = ({ block }: { block: TextBlockProps }) => {
  return (
    <div style={{ ...block.styles }}>
      <ReactMarkdown>{block.markdown}</ReactMarkdown>
    </div>
  );
};
