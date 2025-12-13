import type { ReactNode } from "react";

import type { Page, LayoutContainer, Post } from "../models";
import type { Block } from "../../block/models/types";
import { renderLeafBlock } from "../../block";
import pageStyles from "./post.module.scss";

const renderBlock = (block: Block | undefined): ReactNode => {
  if (!block) return null;
  return renderLeafBlock(block as any);
};

const renderContainer = (container: LayoutContainer, page: Page): ReactNode => {
  const { direction, children, blockId } = container;

  const contentBlock = blockId ? page.blocks[blockId] : undefined;

  return (
    <div className={pageStyles.containerBlock}>
      {contentBlock && (
        <div className={pageStyles.containerBlockContent}>
          {renderBlock(contentBlock)}
        </div>
      )}

      {children.length > 0 && (
        <div
          className={pageStyles.containerBlockChildren}
          style={{
            flexDirection: direction === "row" ? "row" : "column",
          }}
        >
          {children.map((childId) => {
            const nested = page.containers[childId];
            if (!nested) return null;

            return (
              <div
                key={childId}
                className={pageStyles.containerBlockChildrenItem}
              >
                {renderContainer(nested, page)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { author, created_at, title, page } = post;

  const rootContainer = page.containers[page.rootContainerId];
  const styles = page.styles;

  return (
    <article
      className={pageStyles.container}
      style={{
        width: "100%",
        margin: "0 auto",
        borderRadius: 16,
        padding: styles.padding ?? 24,
        backgroundColor: styles.backgroundColor,
        color: styles.textColor,
      }}
    >
      <div className={pageStyles.containerHeader}>
        <img
          className={pageStyles.containerHeaderImage}
          src={author.avatar}
          alt={author.name}
        />
        <div className={pageStyles.containerHeaderText}>
          <span className={pageStyles.containerHeaderTextName}>
            {author.name}
          </span>
          <span className={pageStyles.containerHeaderTextDate}>
            {created_at}
          </span>
        </div>
      </div>

      {title && <h1 className={pageStyles.containerTitle}>{title}</h1>}

      {rootContainer && (
        <div className={pageStyles.containerBody}>
          {renderContainer(rootContainer, page)}
        </div>
      )}
    </article>
  );
};
