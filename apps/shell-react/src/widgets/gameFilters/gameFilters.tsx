import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterInput } from "../../features/filters/input";
import { FilterCheckbox } from "../../features/filters/checkbox";
import styles from "./gameFilter.module.scss";
import { Button } from "@ui/dist";
import { useQueryParams } from "../../shared/lib/searchParams";

export const GameFilters = () => {
  const category = [
    {
      name: "Рогалик",
      value: "Rogulike",
    },
    {
      name: "Хоррор",
      value: "Horror",
    },
    {
      name: "Шутер",
      value: "Shooter",
    },
  ];

  const platform = [
    {
      name: "PS5",
      value: "PS5",
    },
    {
      name: "PC",
      value: "PC",
    },
    {
      name: "Nintendo Switch",
      value: "nintendosw",
    },
    {
      name: "Xbox One",
      value: "xboxone",
    },
  ];

  const ageRating = [
    {
      name: "Для всех",
      value: "E",
    },
    {
      name: "10+",
      value: "E10+",
    },
    {
      name: "13+",
      value: "T",
    },
    {
      name: "17+",
      value: "M",
    },
    {
      name: "18+",
      value: "AO",
    },
    {
      name: "Не указано ",
      value: "RP",
    },
  ];

  const params = useQueryParams();

  return (
    <div className={styles.container}>
      <Item title="Название">
        <FilterInput param="game" placeholder="Введите название игры" />
      </Item>

      <Item title="Категории">
        {category.map((el) => (
          <FilterCheckbox
            key={el.name}
            param="category"
            label={el.name}
            value={el.value}
          />
        ))}
      </Item>

      <Item title="Дата создания">
        <div className={styles.containerRange}>
          <FilterInput placeholder="От" param="year_from" />
          <FilterInput placeholder="До" param="year_to" />
        </div>
      </Item>

      <Item title="Рейтинг">
        <div className={styles.containerRange}>
          <FilterInput placeholder="От" param="rating_from" />
          <FilterInput placeholder="До" param="rating_to" />
        </div>
      </Item>

      <Item title="Платформа">
        {platform.map((el) => (
          <FilterCheckbox
            key={el.name}
            param="platform"
            label={el.name}
            value={el.value}
          />
        ))}
      </Item>

      <Item title="Возрастное ограничение">
        {ageRating.map((el) => (
          <FilterCheckbox
            key={el.value}
            param="age"
            label={el.name}
            value={el.value}
          />
        ))}
      </Item>

      <Button
        text="Сбросить фильтры"
        onClick={() => params.resetParams()}
        width="100%"
        height="30px"
        borderRadius="5px"
        backgroundColor="var(--attention)"
      />
    </div>
  );
};

interface ItemProps {
  title: string;
  children: ReactNode;
}

const Item = ({ title, children }: ItemProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.containerItem}>
      <div
        className={styles.containerItemHeader}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.containerItemTitle}>{title}</span>
        <span className={styles.containerItemArrow}>{open ? "−" : "+"}</span>
      </div>

      <motion.div
        className={styles.containerItemContent}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        initial={false}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        {children}
      </motion.div>
    </div>
  );
};
