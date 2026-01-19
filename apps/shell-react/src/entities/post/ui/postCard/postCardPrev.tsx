import type { Post } from "../../models";
import styles from "./postCardPrev.module.scss";
// @ts-expect-error: SVG import may not have type definitions
import Comment from "../../../../shared/assets/comment.svg?react";
import { TagsList } from "../../../../widgets/tagsList/ui/tagList";

type PostCardPrevProps = {
  post: Post;
  onClick?: () => void;
};

export const PostCardPrev = ({ post, onClick }: PostCardPrevProps) => {
  const ratingText = `${post.isPositive ? "+" : "-"}${post.rating}`;

  return (
    <article
      className={styles.container}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className={styles.containerHeader}>
        <img
          className={styles.containerHeaderImage}
          src={post.author.avatar}
          alt={post.author.name}
        />
        <div className={styles.containerHeaderText}>
          <span className={styles.containerHeaderTextName}>
            {post.author.name}
          </span>
          <span className={styles.containerHeaderTextDate}>
            {post.created_at}
          </span>
        </div>
      </div>

      <p className={styles.containerDescription}>{post.description}</p>

      <div className={styles.containerFooter}>
        <div className={styles.containerFooterMetrics}>
          <span
            className={`${styles.containerFooterMetricsRating} ${
              post.isPositive
                ? styles.containerFooterMetricsRatingPositive
                : styles.containerFooterMetricsRatingNegative
            }`}
          >
            {ratingText}
          </span>

          <Comment className={styles.containerFooterMetricsComment} />
          <span className={styles.containerFooterMetricsText}>
            {post.commentCount}
          </span>
        </div>

        <TagsList tags={post.tags} mode="toggle" />
      </div>
    </article>
  );
};
