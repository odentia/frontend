import { useCallback, useRef, useState } from "react";
import styles from "./themeRedactor.module.scss";
import { params } from "./lib";
import { ThemeColor } from "../../features/themeColor/themeColor";
import { BackgroundColor } from "../../features/backgroundColor/backgroundColor";
import { SaveTheme } from "../../features/theme/ui/saveTheme";
import type { ScssTheme } from "../../entities/theme/models";
import { DEFAULT_SCSS_THEME } from "../../entities/theme/models";

export const ThemeRedactor = () => {
  const themeRef = useRef<ScssTheme>({ ...DEFAULT_SCSS_THEME });
  const [disabled, setDisabled] = useState(true);

  const handlePush = useCallback((name: keyof ScssTheme, value: string) => {
    themeRef.current[name] = value;
    setDisabled(false);
  }, []);

  return (
    <div className={styles.container}>
      <span>Редактировать тему</span>

      {params.map((el) => (
        <ThemeColor
          key={el.title}
          param={el.param as keyof ScssTheme}
          title={el.title}
          func={handlePush}
        />
      ))}

      <BackgroundColor
        param="--glow-color"
        title="Цвет свечения фигур"
        type="shadow"
        func={handlePush}
      />
      <BackgroundColor
        param="--circle-color"
        title="Цвет фигур"
        type="circle"
        func={handlePush}
      />

      <div className={styles.containerButton}>
        <SaveTheme
          disabled={disabled}
          setDisabled={setDisabled}
          themeRef={themeRef}
        />
      </div>
    </div>
  );
};
