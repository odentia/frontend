import type { QueryClient } from "@tanstack/react-query";
import type { ServerEvent } from "./types";

type Chat = {
  id: string;
  title?: string;
  pinned?: boolean;
  archived?: boolean;
  lastMessage?: { id: string; text: string; createdAt: string };
  unread?: number;
};

type Message = {
  id: string;
  text: string;
  createdAt: string;
  authorId?: string;
  clientMsgId?: string;
};

function upsertById<T extends { id: string }>(
  arr: T[] | undefined,
  item: T,
): T[] {
  const list = arr ?? [];
  const idx = list.findIndex((x) => x.id === item.id);
  if (idx === -1) return [item, ...list];
  const copy = list.slice();
  copy[idx] = { ...copy[idx], ...item };
  return copy;
}

function moveChatToTop(chats: Chat[], chatId: string) {
  const idx = chats.findIndex((c) => c.id === chatId);
  if (idx <= 0) return chats;
  const copy = chats.slice();
  const [c] = copy.splice(idx, 1);
  copy.unshift(c);
  return copy;
}

export function handleServerEvent(
  qc: QueryClient,
  evt: ServerEvent,
  getActiveChatId?: () => string | null,
) {
  switch (evt.type) {
    case "message.created": {
      const { chatId, message } = evt.payload;

      qc.setQueryData<Message[]>(["chat", chatId, "messages"], (old) => {
        return upsertById(old, message);
      });

      qc.setQueryData<any>(["chat", chatId], (old) => {
        if (!old) return old;
        return {
          ...old,
          lastMessage: message,
        };
      });

      const activeChatId = getActiveChatId?.() ?? null;

      qc.setQueriesData<Chat[]>(
        { queryKey: ["chats"], exact: false },
        (old) => {
          if (!old) return old;

          const isActive = activeChatId === chatId;
          const unreadInc = isActive ? 0 : 1;

          let next = old.slice();
          const idx = next.findIndex((c) => c.id === chatId);

          if (idx === -1) {
            next.unshift({
              id: chatId,
              lastMessage: message,
              unread: unreadInc,
            });
            return next;
          }

          const prev = next[idx];
          next[idx] = {
            ...prev,
            lastMessage: message,
            unread: (prev.unread ?? 0) + unreadInc,
          };

          next = moveChatToTop(next, chatId);

          next.sort((a, b) =>
            (b.lastMessage?.createdAt ?? "").localeCompare(
              a.lastMessage?.createdAt ?? "",
            ),
          );
          return next;
        },
      );

      return;
    }

    case "read.updated": {
      const { chatId, unread } = evt.payload;

      // update chats list unread
      qc.setQueriesData<Chat[]>(
        { queryKey: ["chats"], exact: false },
        (old) => {
          if (!old) return old;
          const idx = old.findIndex((c) => c.id === chatId);
          if (idx === -1) return old;

          const next = old.slice();
          next[idx] = {
            ...next[idx],
            unread: typeof unread === "number" ? unread : 0,
          };
          return next;
        },
      );

      // optionally update single chat
      qc.setQueryData<any>(["chat", chatId], (old) => {
        if (!old) return old;
        return { ...old, unread: typeof unread === "number" ? unread : 0 };
      });

      return;
    }

    case "chat.updated": {
      const chat = evt.payload.chat;

      qc.setQueryData<any>(["chat", chat.id], (old) =>
        old ? { ...old, ...chat } : old,
      );

      qc.setQueriesData<Chat[]>(
        { queryKey: ["chats"], exact: false },
        (old) => {
          if (!old) return old;
          const next = upsertById(old, chat as Chat);
          return next;
        },
      );

      return;
    }

    case "chat.created": {
      const chat = evt.payload.chat;
      qc.setQueriesData<Chat[]>(
        { queryKey: ["chats"], exact: false },
        (old) => {
          if (!old) return old;
          // prepend new chat
          if (old.some((c) => c.id === chat.id)) return old;
          return [chat as Chat, ...old];
        },
      );
      return;
    }

    default:
      return;
  }
}
