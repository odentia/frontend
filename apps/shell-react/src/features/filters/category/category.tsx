import { useEffect, useMemo, useState } from "react";
import { useQueryParams } from "../../../shared/lib/searchParams";
import { useGamesPrev } from "../../../entities/games/api";
import styles from "./category.module.scss";
import { Loading } from "@ui";

interface FilterCategoryProps {
  param: string;
}

export const FilterCategory = ({ param }: FilterCategoryProps) => {
  const params = useQueryParams();

  const valueFromUrl = params.getParam(param) ?? "";
  const [value, setValue] = useState(valueFromUrl);
  const [open, setOpen] = useState(false);

  useEffect(() => setValue(valueFromUrl), [valueFromUrl]);

  const query = value.trim();

  const { data, isLoading, isPending, isError }: any = useGamesPrev({
    search: query,
  });
  const pending = Boolean(isPending ?? isLoading);

  const firstGame = useMemo(() => data?.items[0], [data]);

  const handleSelect = (title: string) => {
    params.setParam(param, title);
    setValue(title);
    setOpen(false);
  };

  const content = (() => {
    if (pending) {
      return (
        <div
          className={`${styles.containerDropdownItem} ${styles.containerDropdownItemStatic}`}
        >
          <Loading />
          <span className={styles.containerDropdownItemTitle}>Загрузка...</span>
        </div>
      );
    }

    if (isError) {
      return (
        <div
          className={`${styles.containerDropdownItem} ${styles.containerDropdownItemStatic}`}
        >
          <span className={styles.containerDropdownItemTitle}>
            Непредвиденная ошибка
          </span>
        </div>
      );
    }

    if (!query) {
      return (
        <div
          className={`${styles.containerDropdownItem} ${styles.containerDropdownItemStatic}`}
        >
          <span className={styles.containerDropdownItemTitle}>
            Начните вводить название игры
          </span>
        </div>
      );
    }

    if (!firstGame) {
      return (
        <div
          className={`${styles.containerDropdownItem} ${styles.containerDropdownItemStatic}`}
        >
          <span className={styles.containerDropdownItemTitle}>
            Игры по данному запросу не найдены
          </span>
        </div>
      );
    }

    return (
      <div
        className={styles.containerDropdownItem}
        onMouseDown={() => handleSelect(firstGame.title)}
      >
        <img
          className={styles.containerDropdownItemImage}
          src={firstGame.image}
          alt={firstGame.title}
        />
        <span className={styles.containerDropdownItemTitle}>
          {firstGame.title}
        </span>
      </div>
    );
  })();

  return (
    <div className={styles.container}>
      <input
        className={styles.containerInput}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        placeholder="Введите игру"
      />

      {open && <div className={styles.containerDropdown}>{content}</div>}
    </div>
  );
};
