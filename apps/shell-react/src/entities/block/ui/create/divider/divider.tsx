import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";
import { blockStylesToCSS } from "../../../models/registr";
import styles from "./divider.module.scss";

export const CreateDivider = ({ containerId, blockId, index }) => {
  const divider = usePageEditor((state) => state.blocks[blockId]);

  if (divider.type !== "DIVIDER") return null;

  return <div className={styles.container} style={blockStylesToCSS(divider.styles)}></div>;
};
