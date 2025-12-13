import { Post } from "../../../widgets/post/post";
import { PostComments } from "../../../widgets/comments/comment";
import { SamePosts } from "../../../widgets/samePosts/samePosts";
import styles from "./publication.module.scss";
import { PostCard } from "../../../entities/post/ui/post";
import type { Page } from "../../../entities/post/models";

export const PublicationPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerBody}>
        <Post />
        <PostComments id={0} type="post" />
      </div>
      <div className={styles.containerSame}>
        <SamePosts postId={0} />
      </div>
    </div>
  );
};
