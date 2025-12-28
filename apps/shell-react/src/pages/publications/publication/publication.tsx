import { Post } from "../../../widgets/post/post";
import { PostComments } from "../../../widgets/comments/comment";
import { SamePosts } from "../../../widgets/samePosts/samePosts";
import styles from "./publication.module.scss";
import { useParams } from "react-router";
import { NotFoundPage } from "../../notFound";
import { usePost } from "../../../entities/post/api";

export const PublicationPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = usePost(Number(id)).post;

  if (post.error) return <NotFoundPage />;

  if (post.data)
    return (
      <div className={styles.container}>
        <div className={styles.containerBody}>
          <Post post={post.data} />
          <PostComments id={Number(id)} type="post" />
        </div>
        <div className={styles.containerSame}>
          <SamePosts postId={Number(id)} />
        </div>
      </div>
    );
};
