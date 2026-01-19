import type { MutableRefObject } from "react";
import { useState } from "react";
import { Button } from "@ui";
import { useSaveTheme } from "../api";
import type { ScssTheme } from "../../../entities/theme/models";
import { scssToPayload } from "../../../entities/theme/models";
import styles from "./saveTheme.module.scss";

interface SaveThemeProps {
  disabled: boolean;
  setDisabled: (b: boolean) => void;
  themeRef: MutableRefObject<ScssTheme>;
}

export const SaveTheme = ({
  disabled,
  setDisabled,
  themeRef,
}: SaveThemeProps) => {
  const save = useSaveTheme();
  const [errorText, setErrorText] = useState<string>("");

  const handleClick = () => {
    setErrorText("");

    const scssTheme = themeRef.current;

    (Object.keys(scssTheme) as (keyof ScssTheme)[]).forEach((k) => {
      localStorage.setItem(k, scssTheme[k]);
    });

    const payload = scssToPayload(scssTheme);

    save.mutate(payload, {
      onSuccess: () => {
        setDisabled(true);
        setErrorText("");
      },
      onError: (err: any) => {
        const message =
          err?.message ||
          err?.response?.data?.message ||
          err?.response?.data?.detail ||
          "Ошибка при сохранении темы";

        setErrorText(String(message));
      },
    });
  };

  return (
    <div className={styles.container}>
      {errorText && (
        <div className={styles.containerError}>
          {errorText}
        </div>
      )}

      <Button
        text="Сохранить"
        width="50%"
        height="30px"
        loading={save.isPending}
        disabled={disabled}
        onClick={handleClick}
      />
    </div>
  );
};
