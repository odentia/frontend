import { useState } from "react";
import { useQueryParams } from "../../../shared/lib/searchParams";
import { useGamesPrev } from "../../../entities/games/api";
import styles from "./category.module.scss";

interface FilterCategoryProps {
  param: string;
}

export const FilterCategory = ({ param }: FilterCategoryProps) => {
  const params = useQueryParams();

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGamesPrev(value);

  const handleSelect = (title: string) => {
    params.setParam(param, title);
    setValue(title);
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.containerInput}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
        }}
        placeholder="Введите игру"
      />

      {open && value && (
        <div className={styles.containerDropdown}>
          {isLoading && (
            <div className={styles.containerDropdownItem}>Загрузка...</div>
          )}

          {data?.map((game) => (
            <div
              key={game.title}
              className={styles.containerDropdownItem}
              onClick={() => handleSelect(game.title)}
            >
              <img
                className={styles.containerDropdownItemImage}
                src={game.image}
                alt={game.title}
              />
              <span className={styles.containerDropdownItemTitle}>
                {game.title}
              </span>
            </div>
          ))}

          {!isLoading && data?.length === 0 && (
            <div className={styles.containerDropdownItem}>
              Ничего не найдено
            </div>
          )}
        </div>
      )}
    </div>
  );
};
