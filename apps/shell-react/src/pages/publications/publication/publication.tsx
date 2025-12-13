import { Post } from "../../../widgets/post/post";
import { PostComments } from "../../../widgets/comments/comment";
import { SamePosts } from "../../../widgets/samePosts/samePosts";
import styles from "./publication.module.scss";
import { PostCard } from "../../../entities/post/ui/post";
import type { Page } from "../../../entities/post/models";
import { useParams } from "react-router";
import { NotFoundPage } from "../../notFound";

export const PublicationPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <NotFoundPage />;

  return (
    <div className={styles.container}>
      <div className={styles.containerBody}>
        <Post id={Number(id)} />
        <PostComments id={Number(id)} type="post" />
      </div>
      <div className={styles.containerSame}>
        <SamePosts postId={Number(id)} />
      </div>
    </div>
  );
};
