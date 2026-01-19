import { EditorDndProvider } from "../../../app/providers/dnd";
import { CreatePost } from "../../../widgets/postCreate";
import { BlockCards } from "../../../widgets/blockCards";
import styles from "./create.module.scss";
import { BlockStylePanel } from "../../../widgets/blockStyles";

export const CreatePostPage = () => {
  return (
    <EditorDndProvider>
      <div className={styles.container}>
        <div className={styles.containerCreate}>
          <CreatePost />
        </div>
        <div className={styles.containerCards}>
          <BlockCards />
          <BlockStylePanel/>
        </div>
      </div>
    </EditorDndProvider>
  );
};
