import { create } from "zustand";
import { CommentTarget } from "../../features/makeComment/models";

interface ReplyState {
  replyTarget: CommentTarget | null;
  replyAuthor: { name: string; avatar: string | null } | null;
  replyText: string | null;

  setReply: (params: {
    target: CommentTarget;
    author: { name: string; avatar: string | null };
    text: string;
  }) => void;

  clearReply: () => void;
}

export const useReplyStore = create<ReplyState>((set) => ({
  replyTarget: null,
  replyAuthor: null,
  replyText: null,

  setReply: ({ target, author, text }) =>
    set({
      replyTarget: target,
      replyAuthor: author,
      replyText: text,
    }),

  clearReply: () =>
    set({
      replyTarget: null,
      replyAuthor: null,
      replyText: null,
    }),
}));
