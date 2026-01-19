import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import "../config/styles/index.scss";
import { Background } from "../ui/background";
import { Header } from "../../widgets/header";

export function Layout() {
  return (
    <>
      <Background />
      <Header/>
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
