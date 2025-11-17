import styles from "./avatar.module.scss";
import redact from "../../../shared/assets/redact.svg";
import { AvatarProps } from "./types";

export const Avatar = ({ url }: AvatarProps) => {
  return (
    <div className={styles.container}>
      {/* <img src={url} className={styles.containerImage}/> */}
      <img src={redact} className={styles.containerRedact} alt={url} />
    </div>
  );
};
