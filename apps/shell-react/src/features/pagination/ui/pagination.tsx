import { useCallback, useMemo } from "react";
import { useQueryParams } from "../../../shared/lib/searchParams";
import styles from "./pagination.module.scss";

interface PaginationProps {
  pages: number;
}

type PageItem = number | "dots";

export const Pagination = ({ pages }: PaginationProps) => {
  const params = useQueryParams();

  const current = Math.min(
    pages,
    Math.max(1, Number(params.getParam("page") ?? 1)),
  );

  const setPage = useCallback(
    (page: number) => {
      params.setParam("page", page.toString());
    },
    [params],
  );

  const items = useMemo<PageItem[]>(() => {
    if (pages <= 1) return [];

    const result: PageItem[] = [];

    const isStart = current <= 3;
    const isEnd = current >= pages - 2;

    result.push(1);

    if (isStart) {
      for (let i = 2; i <= Math.min(4, pages - 1); i++) {
        result.push(i);
      }

      if (pages > 4) result.push("dots");
    } else if (isEnd) {
      result.push("dots");

      for (let i = Math.max(2, pages - 3); i < pages; i++) {
        result.push(i);
      }
    } else {
      result.push("dots");

      result.push(current - 1);
      result.push(current);
      result.push(current + 1);

      result.push("dots");
    }

    if (pages > 1) result.push(pages);

    return result;
  }, [pages, current]);

  if (pages <= 1) return null;

  return (
    <div className={styles.container}>
      <Arrow disabled={current === 1} onClick={() => setPage(current - 1)}>
        ←
      </Arrow>

      {items.map((item, index) =>
        item === "dots" ? (
          <span className={styles.containerDots} key={index + item}>
            …
          </span>
        ) : (
          <PageButton
            key={item}
            page={item}
            active={item === current}
            onClick={() => setPage(item)}
          />
        ),
      )}

      <Arrow disabled={current === pages} onClick={() => setPage(current + 1)}>
        →
      </Arrow>
    </div>
  );
};

interface PageButtonProps {
  page: number;
  active: boolean;
  onClick: () => void;
}

const PageButton = ({ page, active, onClick }: PageButtonProps) => (
  <button
    className={`${styles.containerPage} ${
      active ? styles.containerPageActive : ""
    }`}
    onClick={onClick}
    disabled={active}
  >
    {page}
  </button>
);

interface ArrowProps {
  disabled: boolean;
  onClick: () => void;
  children: string;
}

const Arrow = ({ disabled, onClick, children }: ArrowProps) => (
  <button
    className={styles.containerArrow}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
