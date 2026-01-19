import React, { useEffect, useState } from "react";
import styles from "./backgroundColor.module.scss";
import { useThemeHandle } from "@ui";
import { SketchPicker } from "react-color";
import type { ScssTheme } from "../../entities/theme/models";

interface BackgroundColorProps {
  param: keyof ScssTheme;
  title: string;
  func: (name: keyof ScssTheme, value: string) => void;
  type: "shadow" | "circle";
}

export const BackgroundColor = React.memo(
  ({ param, title, type, func }: BackgroundColorProps) => {
    const theme = useThemeHandle();

    const [color, setColor] = useState<string>("");
    const [picker, setPicker] = useState(false);

    useEffect(() => {
      const el = document.querySelector(".theme-root");
      if (!el) return;

      const current = getComputedStyle(el)
        .getPropertyValue(param as string)
        .trim();

      setColor(current);
    }, [param]);

    const handleChange = (c: any) => {
      const rgba = `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`;

      theme.setVar(param as string, rgba);

      func(param, rgba);

      window.dispatchEvent(
        new CustomEvent("theme:glow-change", {
          detail: { color: rgba, type },
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
            style={{ backgroundColor: `var(${String(param)})` }}
          />
          <span> - </span>
          <span>{color}</span>
        </div>

        {picker && (
          <>
            <div
              className={styles.containerPicker}
              onClick={() => setPicker(false)}
            />
            <SketchPicker
              className={styles.containerPickerself}
              onChange={handleChange}
              color={color}
              onChangeComplete={(c: any) => setColor(c.hex)}
            />
          </>
        )}
      </div>
    );
  },
);
