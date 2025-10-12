import type { ReactNode } from "react";
import styles from "./layout.module.scss";
import "../config/styles/index.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className={styles.container}>{children}</div>;
};
