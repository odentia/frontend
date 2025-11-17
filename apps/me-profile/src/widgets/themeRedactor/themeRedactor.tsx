import { Button } from "@ui";
import { BackgroundColor } from "../../features/backgroundColor/backgroundColor";
import { ThemeColor } from "../../features/themeColor/themeColor";
import { params } from "./lib";
import styles from "./themeRedactor.module.scss";
import { useCallback, useRef } from "react";

interface ThemeRef {
  [key: string]: string;
}

export const ThemeRedactor = () => {
  const themeRef = useRef<ThemeRef>({});

  const handlePush = useCallback((name: string, value: string) => {
    themeRef.current[name] = value;
    console.log(themeRef.current);
  }, []);

  const handleClick = useCallback(() => {
    Object.entries(themeRef.current).forEach(([key, value]) =>
      localStorage.setItem(key, value),
    );
  }, []);

  return (
    <div className={styles.container}>
      <span>Редактировать тему</span>
      {params.map((el) => (
        <ThemeColor
          key={el.title}
          param={el.param}
          title={el.title}
          func={handlePush}
        />
      ))}
      <BackgroundColor
        param="--glow-color"
        title="Цвет свечения шариков"
        type="shadow"
        func={handlePush}
      />
      <BackgroundColor
        param="--circle-color"
        title="Цвет шариков"
        type="circle"
        func={handlePush}
      />

      <div className={styles.containerButton}>
        <Button
          text="Сохранить"
          width="50%"
          height="30px"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
