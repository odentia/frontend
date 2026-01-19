import { useMemo } from "react";
import { useApi } from "@config-runtime";

type ChatsParams = Record<string, any>;

export function useChat(id: string) {
  const api = useApi();
  return api.useAuthedQuery({ path: `chats/${id}`, key: ["chat", id] });
}

export function useChats(params?: ChatsParams) {
  const api = useApi();

  const keyParams = useMemo(() => params ?? {}, [JSON.stringify(params ?? {})]);

  return api.useAuthedQuery({
    path: "chats",
    key: ["chats", keyParams],
    params,
  });
}

export function useSendMessage(chatId: string) {
  const api = useApi();
  return api.useAuthedMutation(`chats/${chatId}/messages`, "post", [
    "chat",
    chatId,
    "messages",
  ]);
}

export function useMessages(chatId: string) {
  const api = useApi();
  return api.useAuthedQuery({
    path: `chats/${chatId}/messages`,
    key: ["chat", chatId, "messages"],
  });
}
