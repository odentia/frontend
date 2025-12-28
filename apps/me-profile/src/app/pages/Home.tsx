import { Profile } from "../../widgets/profile/profile";
import { ThemeRedactor } from "../../widgets/themeRedactor/themeRedactor";
import styles from "./home.module.scss";

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerTheme}>
        <ThemeRedactor />
      </div>
      <Profile />
    </div>
  );
};
