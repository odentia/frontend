import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";
import { BlockCreatingProps } from "../types";
import styles from "./spacer.module.scss";

export const CreateSpacer = ({
  containerId,
  blockId,
  index,
}: BlockCreatingProps) => {
  const spacer = usePageEditor((state) => state.blocks[blockId]);
  const updateSpacer = usePageEditor((state) => state.updateBlock);

  if (spacer.type !== "SPACER") return null;

  const handleClick = (num: number): void => {
    updateSpacer(blockId, { styles: { height: num } });
  };
  return <div className={styles.container}></div>;
};
