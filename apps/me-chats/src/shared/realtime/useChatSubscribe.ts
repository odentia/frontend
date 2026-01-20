import { useEffect } from "react";
import { useRealtimeContext } from "./useRealtimeContext";

export function useChatSubscribe(chatId: string | null | undefined) {
  const rt = useRealtimeContext();

  useEffect(() => {
    if (!rt || !chatId) return;
    rt.subChat(chatId);
    return () => {
      rt.unsubChat(chatId);
    };
  }, [rt, chatId]);
}
