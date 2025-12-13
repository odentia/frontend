import { usePost } from "../../entities/publication/api";
import { PostRating } from "../../features/postRating/ui/rating";
import styles from "./samePosts.module.scss";
// @ts-expect-error: SVG import may not have type definitions
import Comment from "../../shared/assets/comment.svg?react";
import { useNavigate } from "react-router";

export const SamePosts = ({ postId }: { postId: number }) => {
  const posts = usePost(postId).samePosts;
  const navigate = useNavigate();

  const handleClick = (postId: number) => {
    navigate(`/publication/${postId}`);
  };

  return (
    <div className={styles.container}>
      <span className={styles.containerTitle}>Похожие публикации</span>

      {posts.map((el) => (
        <div
          key={el.id}
          className={styles.containerItem}
          onClick={() => handleClick(el.id)}
        >
          <img
            className={styles.containerItemImage}
            src={el.images[0]}
            alt="prev"
          />

          <span className={styles.containerItemTitle}>{el.title}</span>

          <div className={styles.containerItemMetrics}>
            <PostRating
              id={el.id}
              rating={el.rating}
              isPositiv={el.isPositiv}
              isDislikedMe={el.isDislikedMe}
              isLikedMe={el.isLikedByMe}
            />

            <div className={styles.containerItemMetricsComments}>
              <Comment className={styles.containerItemMetricsCommentsIcon} />
              <span className={styles.containerItemMetricsCommentsCount}>
                {el.commentsCount}
              </span>
            </div>
          </div>

          <div className={styles.containerItemTags}>
            {el.tags.slice(0, 2).map((tag) => (
              <div key={tag} className={styles.containerItemTagsItem}>
                #{tag}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
