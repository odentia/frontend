import { useMemo, useState } from "react";
import styles from "./selectGame.module.scss";
import { useGamesPrev } from "../../entities/games/api";
import { usePageEditor } from "../../shared/store/postCreate/postCreate";
import { Loading } from "@ui";

export const SelectGame = () => {
  const game = usePageEditor((s) => s.game);
  const setGame = usePageEditor((s) => s.setGame);

  const [value, setValue] = useState(game?.title ?? "");
  const [open, setOpen] = useState(false);

  const query = value.trim();
  const { data, isLoading, isPending, isError }: any = useGamesPrev({
    search: query,
  });
  const pending = Boolean(isPending ?? isLoading);

  const firstGame = useMemo(() => data?.[0], [data]);

  const handleSelect = (g: { title: string; image?: string }) => {
    setGame(g);
    setValue(g.title);
    setOpen(false);
  };

  const content = (() => {
    if (pending) {
      return (
        <div
          className={`${styles.containerDropdownItem} ${styles.containerDropdownItemStatic}`}
        >
          <Loading size={24} strokeWidth={2} />
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
        onMouseDown={() =>
          handleSelect({ title: firstGame.title, image: firstGame.image })
        }
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
        placeholder="Игра"
      />

      {open && <div className={styles.containerDropdown}>{content}</div>}
    </div>
  );
};
