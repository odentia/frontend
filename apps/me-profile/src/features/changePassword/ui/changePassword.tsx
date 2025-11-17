import styles from "./changePassword.module.scss";

export const ChangePassword = () => {
  return (
    <div className={styles.container}>
      <span className={styles.containerTitle}>Пароль</span>
      <span className={styles.containerChange}>Изменить</span>
    </div>
  );
};
