import React from "react";
import { Loading } from "./loading";

interface ButtonProps {
  text?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  gradient?: string;
  width?: string;
  height?: string;
  loading?: boolean;
  fontWeight?: string;
  borderRadius?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  text = "ClickMe",
  backgroundColor,
  width = "100%",
  fontWeight = "500",
  gradient,
  loading = false,
  fontSize = "14px",
  height,
  borderRadius = "8px",
  onClick,
  disabled = false,
}) => {
  const isBlocked = disabled || loading;

  return (
    <button
      type="button"
      onClick={() => !isBlocked && onClick?.()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: fontWeight,
        fontSize: fontSize,
        gap: "8px",
        width: width,
        height: height || "50px",
        padding: "0 14px",
        border: "none",
        borderRadius: borderRadius,
        color: "var(--text)",
        backgroundColor: backgroundColor || "var(--attention)",
        background: gradient || backgroundColor || "var(--attention)",
        cursor: isBlocked ? "not-allowed" : "pointer",
        opacity: isBlocked ? 0.6 : 1,
        pointerEvents: isBlocked ? "none" : "auto",
        userSelect: "none",
        transition: "opacity 0.15s ease",
      }}
      disabled={isBlocked}
      aria-disabled={isBlocked}
      aria-busy={loading}
      aria-live={loading ? "polite" : undefined}
    >
      {loading && <Loading size={16} color="currentColor" strokeWidth={3} />}
      {!loading && text}
    </button>
  );
};

export const Button = React.memo(ButtonComponent);
