import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";
import { blockStylesToCSS } from "../../../models/registr";
import { BlockCreatingProps } from "../types";
import styles from "./spacer.module.scss";

export const CreateSpacer = ({
  containerId,
  blockId,
  index,
}: BlockCreatingProps) => {
  const spacer = usePageEditor((state) => state.blocks[blockId]);

  if (spacer.type !== "SPACER") return null;

  return (
    <div
      className={styles.container}
      style={blockStylesToCSS(spacer.styles)}
    ></div>
  );
};
