import { useNavigate } from "react-router-dom";
import styles from "./post.module.scss";
import { PostRating } from "../../features/postRating/ui/rating";
// @ts-expect-error: SVG import may not have type definitions
import Comment from "../../shared/assets/comment.svg?react";
import { PostCard } from "../../entities/post/ui/post";
import { Post as PostProps } from "../../entities/post/models";

export const Post = ({ post }: { post: PostProps }) => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: styles.fontFamily || "",
        color: styles.textColor || "var(--text)",
      }}
    >
      <>
        <PostCard post={post} />
        <div className={styles.containerFooter}>
          <div className={styles.containerFooterMetrics}>
            <PostRating
              id={post.id}
              isDislikedMe={post.isDislikedByMe}
              rating={post.rating}
              isLikedMe={post.isLikedByMe}
              isPositive={post.isDislikedByMe}
            />
            <Comment className={styles.containerFooterMetricsComment} />
            <span className={styles.containerFooterMetricsText}>
              {post.commentCount}
            </span>
          </div>
          <div className={styles.containerFooterTags}>
            {post.tags.map((el) => (
              <div key={el} className={styles.containerFooterTagsItem}>
                {el}
              </div>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};
