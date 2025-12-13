import type { SpacerBlock as SpacerBlockProps } from "../../models/types";

export const SpacerBlock = ({ block }: { block: SpacerBlockProps }) => {
  const { styles } = block;

  return <div style={{ ...styles, height: "100%" }} />;
};
