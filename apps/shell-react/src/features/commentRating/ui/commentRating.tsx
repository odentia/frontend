import { useCommentRating } from "../api";
import { RatingProps } from "../models";
import styles from "./commentRating.module.scss";
// @ts-expect-error: SVG import may not have type definitions
import Arrow from "../../../shared/assets/arrow.svg?react";

export const CommentRating = ({
  id,
  rating,
  isDislikedMe,
  isLikedMe,
  isPositive,
  type,
}: RatingProps) => {
  const { likePost, dislikePost } = useCommentRating(id, type);

  return (
    <div className={styles.container}>
      <Arrow
        className={`${styles.containerImage} ${isLikedMe ? styles.positiv : ""}`}
        onClick={() => likePost.mutate({})}
      />
      <span
        className={`${styles.containerText} ${isPositive ? styles.positiv : styles.negative}`}
      >{`${isPositive ? "+" : "-"}${rating}`}</span>
      <Arrow
        style={{ transform: "rotate(180deg)" }}
        className={`${styles.containerImage} ${isDislikedMe ? styles.positiv : ""}`}
        onClick={() => dislikePost.mutate({})}
      />
    </div>
  );
};
