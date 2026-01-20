import { Loading } from "@ui";
import { useComments } from "../../entities/publicationComment/api";
import { MakeComment } from "../../features/makeComment/ui/makeComment";
import { Comment } from "../comment/comment";
import styles from "./comment.module.scss";

export const PostComments = ({
  id,
  type,
}: {
  id: string;
  type: "game" | "post";
}) => {
  const comments = useComments(id, 0, type);

  if (comments.isPending)
    return (
      <div className={styles.wrapper}>
        <Loading />
      </div>
    );
  if (comments.error)
    return (
      <div className={styles.wrapper}>
        <span className={styles.wrapperError}>{comments.error.message}</span>
      </div>
    );

  if (comments.data)
    return (
      <div className={styles.container}>
        <span className={styles.containerTitle}>Комментарии</span>
        {comments.data.items.map((el) => (
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
