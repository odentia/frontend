import { Post } from "../../../widgets/post/post";
import { PostComments } from "../../../widgets/comments/comment";
import { SamePosts } from "../../../widgets/samePosts/samePosts";
import styles from "./publication.module.scss";
import { useParams } from "react-router";
import { NotFoundPage } from "../../notFound";
import { usePost } from "../../../entities/post/api";
import { Loading } from "@ui";

export const PublicationPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = usePost(id).post;

  if (post.isPending)
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  if (post.error) return <NotFoundPage />;

  if (post.data)
    return (
      <div className={styles.container}>
        <div className={styles.containerBody}>
          <Post post={post.data} />
          <PostComments id={id || ""} type="post" />
        </div>
        <div className={styles.containerSame}>
          <SamePosts postId={id || ""} />
        </div>
      </div>
    );
};
