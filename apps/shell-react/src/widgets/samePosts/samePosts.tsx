import { usePost } from "../../entities/publication/api";
import { PostRating } from "../../features/postRating/ui/rating";
import styles from "./samePosts.module.scss";
// @ts-ignore
import Comment from "../../shared/assets/comment.svg?react";
import { useNavigate } from "react-router";

const publicationsMock = [
  {
    id: 1,
    username: "overlord",
    avatar: "https://i.pravatar.cc/100?img=5",
    date: "2025-01-12T14:22:00Z",
    title: "Lorem ipsum dolor sit amet",
    text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    images: [
      "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=800",
    ],
    tags: ["гайд", "абуз"],
    rating: 15,
    commentsCount: 245,
    isLikedByMe: true,
    isDislikedMe: false,
    isPositiv: true,
  },
  {
    id: 2,
    username: "hunter",
    avatar: "https://i.pravatar.cc/100?img=12",
    date: "2025-01-10T11:10:00Z",
    title: "How to farm efficiently",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    images: [
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800",
    ],
    tags: ["фантазия", "гайд"],
    rating: 8,
    commentsCount: 120,
    isLikedByMe: false,
    isDislikedMe: false,
    isPositiv: true,
  },
  {
    id: 3,
    username: "shadowwalker",
    avatar: "https://i.pravatar.cc/100?img=30",
    date: "2025-01-09T09:40:00Z",
    title: "Dark coast adventure",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    images: [
      "https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=800",
    ],
    tags: ["абуз"],
    rating: -3,
    commentsCount: 42,
    isLikedByMe: false,
    isDislikedMe: true,
    isPositiv: false,
  },
  {
    id: 4,
    username: "valkyrie",
    avatar: "https://i.pravatar.cc/100?img=48",
    date: "2025-01-05T18:55:00Z",
    title: "Secrets of the northern seas",
    text: "Excepteur sint occaecat cupidatat non proident.",
    images: [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800",
    ],
    tags: ["гайд", "пве"],
    rating: 21,
    commentsCount: 300,
    isLikedByMe: false,
    isDislikedMe: false,
    isPositiv: true,
  },
  {
    id: 5,
    username: "mistborn",
    avatar: "https://i.pravatar.cc/100?img=7",
    date: "2025-01-01T07:30:00Z",
    title: "Build for late game",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    images: [
      "https://images.unsplash.com/photo-1496483648148-47c686dc86a8?q=80&w=800",
    ],
    tags: ["абуз", "опыт"],
    rating: -7,
    commentsCount: 18,
    isLikedByMe: false,
    isDislikedMe: true,
    isPositiv: false,
  },
];

export const SamePosts = ({ postId }: { postId: number }) => {
  const posts = usePost(postId).samePosts;
  const navigate = useNavigate();

  const handleClick = (postId: number) => {
    navigate(`/publication/${postId}`);
  };

  return (
    <div className={styles.container}>
      <span className={styles.containerTitle}>Похожие публикации</span>

      {publicationsMock.map((el) => (
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
