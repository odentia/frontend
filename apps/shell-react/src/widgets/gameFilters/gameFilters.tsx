import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { FilterInput } from "../../features/filters/input";
import { FilterCheckbox } from "../../features/filters/checkbox";
import styles from "./gameFilter.module.scss";
import { Button, Input } from "@ui/dist";
import { useQueryParams } from "../../shared/lib/searchParams";

interface FiltersProps {
  platforms: string[];
  category: string[];
  age: string[];
}


interface FilterableCheckboxListProps {
  param: string;
  values: string[];
  placeholder?: string;
}

const FilterableCheckboxList = ({
  param,
  values,
  placeholder = "Поиск...",
}: FilterableCheckboxListProps) => {
  const [query, setQuery] = useState("");

  const filteredOptions = values.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <>
      <Input
        placeholder={placeholder}
        width="100%"
        height="40px"
        color="var(--attention)"
        value={query}
        onValueChange={(e) => setQuery(e)}
      />
      {filteredOptions.map((el) => (
        <FilterCheckbox
          key={el}
          param={param}
          label={el}
          value={el}
        />
      ))}
    </>
  );
};

export const GameFilters = ({platforms, category, age}: FiltersProps) => {

  const params = useQueryParams();

  return (
    <div className={styles.container}>
      <Item title="Название">
        <FilterInput param="search" placeholder="Введите название игры" />
      </Item>

      <Item title="Категории">
        <FilterableCheckboxList
          param="genre"
          values={category}
          placeholder="Поиск категории"
        />
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
        <FilterableCheckboxList
          param="platform"
          values={platforms}
          placeholder="Поиск платформы"
        />
      </Item>

      <Item title="Возрастное ограничение">
        <FilterableCheckboxList
          param="age_rating"
          values={age}
          placeholder="Поиск рейтинга"
        />
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
