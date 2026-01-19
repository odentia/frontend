import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { FilterInput } from "../../features/filters/input";
import { FilterTags } from "../../features/filters/tags/tags";
import { FilterCategory } from "../../features/filters/category/category";
import styles from "./postFilters.module.scss"
import { Button } from "@ui/dist";
import { useQueryParams } from "../../shared/lib/searchParams";

export const PostFilters = () => {
  const params = useQueryParams();

  return (
    <div className={styles.container}>
      <Item title="Название">
        <FilterInput param="title" placeholder="Введите название поста" />
      </Item>

      <Item title="Теги">
        <FilterTags />
      </Item>

      <Item title="Рейтинг">
        <div className={styles.containerRange}>
          <FilterInput placeholder="От" param="rating_from" />
          <FilterInput placeholder="До" param="rating_to" />
        </div>
      </Item>

      <Item title="Игра">
        <FilterCategory param="game" />
      </Item>

      <Item title="Количество комментариев">
        <div className={styles.containerRange}>
          <FilterInput placeholder="От" param="comments_from" />
          <FilterInput placeholder="До" param="comments_to" />
        </div>
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
