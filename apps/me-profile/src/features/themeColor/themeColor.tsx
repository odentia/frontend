import { useThemeHandle } from "@ui";
import React from "react";
import styles from "./themeColor.module.scss";
import { SketchPicker } from "react-color";
import { useEffect, useState } from "react";
import { ScssTheme } from "../../entities/theme/models";

interface ThemeColorProps {
  param: keyof ScssTheme;
  title: string;
  func: (name: keyof ScssTheme, value: string) => void;
}

export const ThemeColor = React.memo(({ param, title, func }: ThemeColorProps) => {
  const theme = useThemeHandle();

  const [color, setColor] = useState<string>("");
  const [picker, setPicker] = useState(false);

  useEffect(() => {
    const el = document.querySelector(".theme-root");
    if (!el) return;

    const current = getComputedStyle(el).getPropertyValue(param as string).trim();
    setColor(current);
  }, [param]);

  const handleChange = (c: any) => {
    const value = `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`;

    theme.setVar(param as string, value);
    func(param, value);
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
          <div className={styles.containerPicker} onClick={() => setPicker(false)} />
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
});
