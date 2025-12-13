import type { ButtonBlock as ButtonBlockProps } from "../../models/types";
import buttonStyles from "./buttonBlock.module.scss";

export const ButtonBlock = ({ block }: { block: ButtonBlockProps }) => {
  const { label, href, styles, color, backgroundColor, border, borderRadius } =
    block;

  return (
    <div style={{ ...styles }}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={buttonStyles.container}
        style={{
          borderRadius: borderRadius || "",
          backgroundColor: backgroundColor || "var(--attention)",
          color: color || "var(--text)",
          border: border ? "1px solid var(--border)" : "",
        }}
      >
        {label}
      </a>
    </div>
  );
};
