import React from "react";
import { numberValidation } from "./validation";

interface InputProps {
  onValueChange: (value: string) => void;
  isPassword?: boolean;
  onlyNumber?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
  shadowSpread?: number;
  backgroundColor?: string;
  borderRadius?: string;
  color?: string;
  borderWidth?: string;
  leftIcon?: string;
  rightIcon?: string;
  textColor?: string;
  placeholderColor?: string;
  fontSize?: string;
  className?: string;
  placeholder?: string;
  hasError?: string;
  shadowOpacity?: number;
  value?: string;
  width?: number | string;
  height?: number | string;
}

const InputComponent = ({
  onValueChange,
  isPassword,
  onlyNumber,
  color,
  textColor,
  leftIcon,
  rightIcon,
  className,
  borderWidth,
  width,
  borderRadius,
  height,
  placeholder,
  hasError,
  backgroundColor,
  value,
  fontSize = "14px",
  shadowBlur = 0,
  shadowColor = "blue",
  shadowSpread = 0,
}: InputProps) => {
  const handleChange = (str: string) => {
    if (onlyNumber) str = numberValidation(str);
    onValueChange(str);
  };

  const bodyStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: backgroundColor ?? "transparent",
    height,
    border: "1px solid var(--border)",
    display: "flex",
    borderWidth: borderWidth ?? "1px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: borderRadius ?? "5px",
    boxSizing: "border-box",
    padding: "4px 8px",
    gap: "6px",
    borderColor: color ?? "aqua",
    fontSize,
    boxShadow:
      shadowBlur > 0
        ? `0 0 ${shadowBlur}px ${shadowSpread}px ${shadowColor}`
        : undefined,
  };

  const iconStyle: React.CSSProperties = {
    height: "80%",
    aspectRatio: "1 / 1",
    objectFit: "cover",
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    color: textColor ?? "#fff",
    background: "transparent",
    border: "none",
    outline: "none",
    font: "inherit",
    width: "100%",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: width ?? "100%",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
    fontSize: "14px",
    marginBottom: "4px",
  };

  return (
    <div style={containerStyle} className={className}>
      {hasError && <span style={errorStyle}>{hasError}</span>}
      <div style={bodyStyle}>
        {leftIcon && <img src={leftIcon} style={iconStyle} alt="leftIcon" />}
        <input
          style={inputStyle}
          placeholder={placeholder || ""}
          onChange={(e) => handleChange(e.target.value)}
          type={isPassword ? "password" : "text"}
          value={value ?? ""}
        />
        {rightIcon && <img src={rightIcon} style={iconStyle} alt="rightIcon" />}
      </div>
    </div>
  );
};

export const Input = React.memo(InputComponent);
