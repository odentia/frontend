import { useEffect, useMemo, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RealtimeClient } from "./client";
import { handleServerEvent } from "./handlers";

const LAST_SEQ_KEY = "rt_last_seq_v1";

function getLastSeq(): number | undefined {
  const v = localStorage.getItem(LAST_SEQ_KEY);
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
function setLastSeq(seq: number) {
  localStorage.setItem(LAST_SEQ_KEY, String(seq));
}

export function useRealtime(opts?: { url?: string; getActiveChatId?: () => string | null }) {
  const qc = useQueryClient();
  const url = opts?.url ?? "wss://example.com/ws";
  const clientRef = useRef<RealtimeClient | null>(null);

  const handlers = useMemo(() => ({
    onEvent: (evt: any) => handleServerEvent(qc, evt, opts?.getActiveChatId),
  }), [qc, opts?.getActiveChatId]);

  useEffect(() => {
    if (!clientRef.current) {
      clientRef.current = new RealtimeClient({
        url,
        getLastSeq,
        setLastSeq,
        handlers,
      } as any);
    }

    const c = clientRef.current!;
    c.start();
    return () => c.stop();
  }, [url, handlers]);

  return clientRef.current;
}
