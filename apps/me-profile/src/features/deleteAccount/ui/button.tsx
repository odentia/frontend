import { Button } from "@ui";
import styles from "./button.module.scss";

export const DeleteButton = () => {
  return (
    <div className={styles.container}>
      <Button
        text="Удалить уч.запись"
        width="150px"
        height="100%"
        borderRadius="5px"
        fontSize="14px"
        backgroundColor="var(--danger)"
        onClick={() => console.log("Yep!")}
      />
    </div>
  );
};
