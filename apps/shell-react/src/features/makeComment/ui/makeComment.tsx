import { useState, KeyboardEvent } from "react";
import { useMakeComment } from "../api";
import styles from "./makeComments.module.scss";
// @ts-expect-error: SVG import may not have type definitions
import Enter from "../../../shared/assets/enter.svg?react";
import { useReplyStore } from "../../../shared/store/reply";

export const MakeComment = ({
  id,
  type,
}: {
  id: number;
  type: "game" | "post";
}) => {
  const [comment, setComment] = useState("");

  const { replyTarget, replyAuthor, replyText, clearReply } = useReplyStore();

  const { mutate, isPending } = useMakeComment(
    type,
    replyTarget || { kind: "post", id: id, page: 0 },
  );

  const handleSubmit = () => {
    mutate(
      { text: comment.trim() },
      {
        onSuccess: () => {
          setComment("");
          clearReply();
        },
      },
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isReplyToComment =
    replyTarget !== null && replyTarget.kind === "children";

  return (
    <div className={styles.container}>
      {isReplyToComment && (
        <div className={styles.containerReply}>
          <div className={styles.containerReplyHeader}>
            {replyAuthor?.avatar && (
              <img
                src={replyAuthor.avatar}
                alt={replyAuthor.name}
                className={styles.containerReplyHeaderAvatar}
              />
            )}

            <span className={styles.containerReplyHeaderAuthor}>
              {replyAuthor?.name}
            </span>
          </div>

          <span className={styles.containerReplyHeaderText}>{replyText}</span>

          <button
            type="button"
            className={styles.containerReplyClose}
            onClick={clearReply}
          >
            ×
          </button>
        </div>
      )}
      <div className={styles.containerInput}>
        <input
          className={styles.containerInputSelf}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
          value={comment}
          placeholder="Комментировать"
        />

        <button
          type="button"
          className={styles.containerInputButton}
          disabled={!comment.trim() || isPending}
          onClick={handleSubmit}
        >
          <Enter className={styles.containerInputButtonImage} />
        </button>
      </div>
    </div>
  );
};
