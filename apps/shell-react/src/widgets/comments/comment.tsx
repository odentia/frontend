import { useComments } from "../../entities/publicationComment/api";
import { Comment as CommentProps } from "../../entities/publicationComment/models";
import { MakeComment } from "../../features/makeComment/ui/makeComment";
import { Comment } from "../comment/comment";
import styles from "./comment.module.scss";

const mockComment = [
  {
    id: 42,
    author: {
      id: 7,
      name: "Пользоатель",
      avatar: "https://example.com/avatars/7.png",
    },
    date: "2025-11-21T08:30:00.000Z",
    text: "норм тема, можна чуть доработать но в целом ок",
    isPositive: true,
    rating: 12,
    parentId: null,
    childrenCount: 3,
    isLikedMe: true,
    isDisLikedMe: false,
  },
  {
    id: 42,
    author: {
      id: 7,
      name: "Пользователь",
      avatar: "https://example.com/avatars/7.png",
    },
    date: "2025-11-21T08:30:00.000Z",
    text: "норм тема, можна чуть доработать но в целом ок",
    isPositive: true,
    rating: 12,
    parentId: null,
    childrenCount: 3,
    isLikedMe: true,
    isDisLikedMe: false,
  },
];

export const PostComments = ({
  id,
  type,
}: {
  id: number;
  type: "game" | "post";
}) => {
  const comments = useComments(id, 0, type);

  return (
    <div className={styles.container}>
      <span className={styles.containerTitle}>Комментарии</span>
      {mockComment.map((el) => (
        <Comment
          id={el.id}
          author={el.author}
          date={el.date}
          text={el.text}
          isPositive={el.isPositive}
          isDisLikedMe={el.isDisLikedMe}
          isLikedMe={el.isLikedMe}
          rating={el.rating}
          parentId={el.parentId}
          childrenCount={el.childrenCount}
          type={type}
        />
      ))}
      <MakeComment id={id} type={type} />
    </div>
  );
};
