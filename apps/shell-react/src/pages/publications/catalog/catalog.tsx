import { PostCardPrev } from "../../../entities/post/ui/postCard/postCardPrev";
import { PostFilters } from "../../../widgets/postFilters/postFilters";
import styles from "./catalog.module.scss";

import { useNavigate } from "react-router";
import { Button, Loading } from "@ui/dist";
import { usePost } from "../../../entities/post/api";
import { usePostsQueryParams } from "../../../shared/lib/searchParams";
import { useEffect } from "react";

export const PublicationsCatalog = () => {
  const navigate = useNavigate();

  const params = usePostsQueryParams();
  const { posts } = usePost(undefined, params);

  const handleOpenPost = (id: string) => {
    navigate(`/publications/${id}`);
  };

  const handleCreate = () => {
    navigate(`/publications/create`);
  };

  return (
    <div className={styles.containerOuter}>
      <div className={styles.containerOuterHeader}>
        <Button
          text="Создать публикацию"
          onClick={handleCreate}
          width="220px"
          height="40px"
          borderRadius="6px"
          backgroundColor="var(--attention)"
        />
      </div>

      <div className={styles.container}>
        <div className={styles.containerFilters}>
          <PostFilters />
        </div>

        <div className={styles.containerCards}>
          {posts.data &&
            posts.data.posts.map((el) => (
              <PostCardPrev
                key={el.id}
                post={el}
                onClick={() => handleOpenPost(el.id)}
              />
            ))}

          {posts.isPending && <div className={styles.wrapper}><Loading /></div>}
          {posts.isError && (
            <span className={styles.containerCardsError}>
              {posts.error.message}
            </span>
          )}
          {posts.data?.total === 0 && <div className={styles.wrapper}><span className={styles.wrapperText}>Похоже, что по данному запросу публикаций нет</span></div>}
        </div>
      </div>
    </div>
  );
};
