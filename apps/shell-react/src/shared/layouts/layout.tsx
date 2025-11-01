import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import "../config/styles/index.scss";

export function Layout() {
  return (
    <>
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
