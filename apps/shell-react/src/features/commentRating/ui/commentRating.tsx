import { useCommentRating } from "../api";
import { RatingProps } from "../models";
import styles from "./commentRating.module.scss";
// @ts-ignore
import Arrow from "../../../shared/assets/arrow.svg?react";

export const CommentRating = ({
  id,
  rating,
  isDislikedMe,
  isLikedMe,
  isPositive,
}: RatingProps) => {
  const { likePost } = useCommentRating(id);

  return (
    <div className={styles.container}>
      <Arrow
        className={`${styles.containerImage} ${isLikedMe ? styles.positiv : ""}`}
        onClick={() => likePost.mutate({ like: true })}
      />
      <span
        className={`${styles.containerText} ${isPositive ? styles.positiv : styles.negative}`}
      >{`${isPositive ? "+" : "-"}${rating}`}</span>
      <Arrow
        style={{ transform: "rotate(180deg)" }}
        className={`${styles.containerImage} ${isDislikedMe ? styles.positiv : ""}`}
        onClick={() => likePost.mutate({ like: false })}
      />
    </div>
  );
};
