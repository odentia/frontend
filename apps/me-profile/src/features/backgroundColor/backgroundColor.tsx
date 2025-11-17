import styles from "./backgroundColor.module.scss";
import React from "react";
import { useThemeHandle } from "@ui";
import { SketchPicker } from "react-color";
import { useEffect, useState } from "react";

interface BackgroundColorProps {
  param: string;
  title: string;
  func: (name: string, value: string) => void;
  type: "shadow" | "circle";
}

export const BackgroundColor = React.memo(
  ({ param, title, type, func }: BackgroundColorProps) => {
    const theme = useThemeHandle();

    const [color, setColor] = useState<string>("");
    const [picker, setPicker] = useState(false);

    useEffect(() => {
      const el = document.querySelector(".theme-root");
      if (el) {
        const color = getComputedStyle(el).getPropertyValue(param).trim();
        setColor(color);
      }
    }, [param]);

    const handleChange = (c: any) => {
      theme.setVar(
        param,
        `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`,
      );
      func(param, c.hex);
      window.dispatchEvent(
        new CustomEvent("theme:glow-change", {
          detail: { color: c.hex, type: type },
        }),
      );
    };

    return (
      <div className={styles.container}>
        <span>{title}</span>
        <div className={styles.containerBody}>
          <div
            className={styles.containerBodyColor}
            onClick={() => setPicker((p) => !p)}
            style={{ backgroundColor: `var(${param})` }}
          />
          <span> - </span>
          <span>{color}</span>
        </div>

        {picker && (
          <>
            <div
              className={styles.containerPicker}
              onClick={() => setPicker(false)}
            ></div>
            <SketchPicker
              className={styles.containerPickerself}
              onChange={handleChange}
              color={color}
              onChangeComplete={(color: any) => setColor(color.hex)}
            />
          </>
        )}
      </div>
    );
  },
);
