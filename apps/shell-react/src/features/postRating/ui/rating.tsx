import { usePostRating } from "../api";
import { RatingProps } from "../models";
import styles from "./rating.module.scss";
// @ts-expect-error: SVG import may not have type definitions
import Arrow from "../../../shared/assets/arrow.svg?react";

export const PostRating = ({
  id,
  rating,
  isDislikedMe,
  isLikedMe,
  isPositiv,
}: RatingProps) => {
  const { likePost } = usePostRating(id);

  return (
    <div className={styles.container}>
      <Arrow
        className={`${styles.containerImage} ${isLikedMe ? styles.positiv : ""}`}
        onClick={() => likePost.mutate({ like: true })}
      />
      <span
        className={`${styles.containerText} ${isPositiv ? styles.positiv : styles.negative}`}
      >{`${isPositiv ? "+" : "-"}${rating}`}</span>
      <Arrow
        style={{ transform: "rotate(180deg)" }}
        className={`${styles.containerImage} ${isDislikedMe ? styles.positiv : ""}`}
        onClick={() => likePost.mutate({ like: false })}
      />
    </div>
  );
};
