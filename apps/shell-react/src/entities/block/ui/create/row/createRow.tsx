import { usePageEditor } from "../../../../../shared/store/postCreate/postCreate";
import styles from "./createRow.module.scss";

export const CreateRow = ({ upRowId }: { upRowId?: string }) => {
  const createRow = usePageEditor().addRow;
  const rows = usePageEditor((select) => select.rows);

  const handleClick = () => {
    createRow();
    console.log("Created", rows);
  };

  return (
    <div className={styles.container} onClick={() => handleClick()}>
      <button type="button" className={styles.containerBlock}>
        +
      </button>
    </div>
  );
};
