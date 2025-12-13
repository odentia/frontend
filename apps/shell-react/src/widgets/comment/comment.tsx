import styles from "./comment.module.scss";
import { CommentCard } from "../../entities/publicationComment/ui/publicationComment";
import { CommentRating } from "../../features/commentRating/ui/commentRating";
import { Comment as CommentProps } from "../../entities/publicationComment/models";
import { useFlattenedChildren } from "../../entities/publicationComment/api";
import { useState } from "react";
import { useReplyStore } from "../../shared/store/reply";

export const Comment = ({
  id,
  author,
  date,
  text,
  isPositive,
  rating,
  isLikedMe,
  isDisLikedMe,
  childrenCount,
  type,
}: CommentProps) => {
  const [showChildren, setShowChildren] = useState(false);

  const {
    items: children,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFlattenedChildren(id, showChildren, type);

  const setReply = useReplyStore((s) => s.setReply);

  const handleReply = () => {
    setReply({
      target: {
        kind: "children",
        parentId: id,
      },
      author: {
        name: author.name,
        avatar: author.avatar,
      },
      text: text,
    });
  };

  const handleToggleChildren = () => {
    setShowChildren((prev) => !prev);
  };

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  return (
    <div className={styles.container}>
      <CommentCard author={author} date={date} text={text} />
      <div className={styles.containerFooter}>
        <div className={styles.containerFooterMetrics}>
          <CommentRating
            id={Number(id)}
            isDislikedMe={isDisLikedMe}
            rating={rating}
            isLikedMe={isLikedMe}
            isPositive={isPositive}
          />
          <span
            className={styles.containerFooterMetricsText}
            onClick={handleReply}
          >
            Ответить
          </span>
        </div>
        {childrenCount > 0 && (
          <div
            className={styles.containerChildrenToggle}
            onClick={handleToggleChildren}
          >
            {showChildren ? "скрыть ответы" : `показать ответы`}
          </div>
        )}
      </div>
      <div className={styles.containerChildren}>
        {showChildren &&
          children.map((el) => (
            <Comment
              id={el.id}
              author={el.author}
              date={el.date}
              parentId={el.parentId}
              isPositive={el.isPositive}
              isLikedMe={el.isLikedMe}
              isDisLikedMe={el.isDisLikedMe}
              rating={el.rating}
              text={el.text}
              childrenCount={el.childrenCount}
              type={type}
            />
          ))}
        {hasNextPage && showChildren && (
          <div
            className={styles.containerChildrenMore}
            onClick={handleLoadMore}
          >
            {isFetchingNextPage ? "загружаем..." : "показать еще"}
          </div>
        )}
      </div>
    </div>
  );
};
