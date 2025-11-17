import { useThemeHandle } from "@ui";
import React from "react";
import styles from "./themeColor.module.scss";
import { SketchPicker } from "react-color";
import { useEffect, useState } from "react";

interface ThemeColorProps {
  param: string;
  title: string;
  func: (name: string, value: string) => void;
}

export const ThemeColor = React.memo(
  ({ param, title, func }: ThemeColorProps) => {
    const theme = useThemeHandle();

    const [color, setColor] = useState<string>("");
    const [picker, setPicker] = useState(false);

    useEffect(() => {
      const el = document.querySelector(".theme-root");
      if (!el) return;

      const current = getComputedStyle(el).getPropertyValue(param).trim();
      setColor(current);
    }, [param]);

    const handleChange = (c: any) => {
      const value = `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`;

      theme.setVar(param, value);
      func(param, value);
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
