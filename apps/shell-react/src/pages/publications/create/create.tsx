import { EditorDndProvider } from "../../../app/providers/dnd";
import { CreatePost } from "../../../widgets/postCreate";
import { BlockCards } from "../../../widgets/blockCards";
import styles from "./create.module.scss";

export const CreatePostPage = () => {
  return (
    <EditorDndProvider>
      <div className={styles.container}>
        <CreatePost />
        <BlockCards />
      </div>
    </EditorDndProvider>
  );
};
