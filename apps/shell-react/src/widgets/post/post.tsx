import { useParams } from "react-router";
import styles from "./post.module.scss";
import { PostRating } from "../../features/postRating/ui/rating";
// @ts-ignore
import Comment from "../../shared/assets/comment.svg?react";
import { PostCard } from "../../entities/post/ui/post";
import type { Page } from "../../entities/post/models";

export const mockPageComplexNew = {
  data: {
    page: {
      id: "page-complex",
      author: {
        name: "User",
        avatar: "https://i.pravatar.cc/150?img=3",
        id: 1,
      },
      created_at: "14 November",
      title: "сложный пост с картинкой и галереей",
      styles: {
        backgroundColor: "rgba(77, 117, 99, 0.28)",
        padding: 32,
        maxWidth: 960,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        textColor: "#ffffff",
      },

      rootContainerId: "root",

      containers: {
        root: {
          id: "root",
          direction: "column",
          blockId: "t-title",
          children: ["c-quote", "c-text-image", "c-gallery", "c-button"],
        },

        "c-quote": {
          id: "c-quote",
          direction: "column",
          blockId: "q-quote",
          children: [],
        },

        "c-text-image": {
          id: "c-text-image",
          direction: "row",
          blockId: undefined,
          children: ["c-text-intro", "c-preview"],
        },

        "c-text-intro": {
          id: "c-text-intro",
          direction: "column",
          blockId: "t-intro",
          children: [],
        },

        "c-preview": {
          id: "c-preview",
          direction: "column",
          blockId: "i-preview",
          children: [],
        },

        "c-gallery": {
          id: "c-gallery",
          direction: "column",
          blockId: "g-gallery",
          children: [],
        },

        "c-button": {
          id: "c-button",
          direction: "column",
          blockId: "b-cta",
          children: [],
        },
      },

      blocks: {
        "t-title": {
          id: "t-title",
          type: "TEXT",
          markdown: `конструктор публикаций:  
asdasd`,
          styles: {
            paddingBottom: 12,
            align: "left",
            width: "100%",
          },
        },

        "q-quote": {
          id: "q-quote",
          type: "QUOTE",
          text: "“все блоки в этом посте собраны из конструктора, а данные лежат в json.”",
          author: "anonymus dev",
          styles: {
            paddingTop: 8,
            paddingBottom: 16,
          },
        },

        "t-intro": {
          id: "t-intro",
          type: "TEXT",
          markdown:
            "слева — текст, справа — картинка.\n\nконтейнер управляет направлением (row) и дочерними элементами.",
          styles: { paddingTop: 4, paddingBottom: 4 },
        },

        "i-preview": {
          id: "i-preview",
          type: "IMAGE",
          url: "https://picsum.photos/480/320",
          alt: "пример изображения",
          caption: "пример картинки справа от текста",
          rounded: true,
          styles: { paddingTop: 4, paddingBottom: 4 },
        },

        "g-gallery": {
          id: "g-gallery",
          type: "GALLERY",
          layout: "grid",
          images: [
            { id: "g1", url: "https://picsum.photos/300/200?1" },
            { id: "g2", url: "https://picsum.photos/300/200?2" },
            { id: "g3", url: "https://picsum.photos/300/200?3" },
            { id: "g4", url: "https://picsum.photos/300/200?4" },
          ],
          styles: { paddingTop: 16, paddingBottom: 16 },
        },

        "b-cta": {
          id: "b-cta",
          type: "BUTTON",
          label: "создать такой же пост",
          href: "https://example.com/editor",
          borderRadius: 999,
          backgroundColor: "#111827",
          styles: { paddingTop: 8 },
        },
      },
    } satisfies Page,

    isDislikedMe: false,
    isLikedByMe: true,
    isPositiv: true,
    tags: ["post", "hehe"],
    rating: 1278,
    commentsCount: 238,
  },
};

export const Post = () => {
  const { id } = useParams<{ id: string }>();
  const post = mockPageComplexNew;

  if (!post.data) return <div>...Loading</div>;

  return (
    <div
      className={styles.container}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: styles.fontFamily || "",
        color: styles.textColor || "var(--text)",
      }}
    >
      <PostCard page={post.data.page} />
      <div className={styles.containerFooter}>
        <div className={styles.containerFooterMetrics}>
          <PostRating
            id={Number(id)}
            isDislikedMe={post.data.isDislikedMe}
            rating={post.data.rating}
            isLikedMe={post.data.isLikedByMe}
            isPositiv={post.data.isPositiv}
          />
          <Comment className={styles.containerFooterMetricsComment} />
          <span className={styles.containerFooterMetricsText}>
            {post.data.commentsCount}
          </span>
        </div>
        <div className={styles.containerFooterTags}>
          {post.data.tags.map((el) => (
            <div key={el} className={styles.containerFooterTagsItem}>
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
