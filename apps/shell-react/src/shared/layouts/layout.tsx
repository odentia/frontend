import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import "../config/styles/index.scss";
import { Background } from "../ui/background";

export function Layout() {
  return (
    <>
      <Background />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
