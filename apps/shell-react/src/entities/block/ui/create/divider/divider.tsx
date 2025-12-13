import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";
import styles from "./divider.module.scss";

export const CreateDivider = ({ containerId, blockId, index }) => {
  const divider = usePageEditor((state) => state.blocks[blockId]);
  const updateDivider = usePageEditor((state) => state.updateBlock);

  if (divider.type !== "DIVIDER") return null;

  const handleClick = (type: "line" | "dotted" | "space") => {
    updateDivider(blockId, { variant: type });
  };

  return <div className={styles.container}></div>;
};
