import type { ClientEvent, Envelope, ServerEvent } from "./types";
import { LruSet } from "./lru";

type Handlers = {
  onEvent: (evt: ServerEvent) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (e: Event) => void;
};

type RealtimeClientOpts = {
  url: string;
  getLastSeq: () => number | undefined;
  setLastSeq: (seq: number) => void;
  handlers: Handlers;
};

export class RealtimeClient {
  private ws: WebSocket | null = null;
  private stopped = false;
  private reconnectAttempt = 0;
  private pingTimer: number | null = null;
  private seen = new LruSet(1500);

  private url: string;
  private getLastSeq: () => number | undefined;
  private setLastSeq: (seq: number) => void;
  private handlers: Handlers;

  constructor(opts: RealtimeClientOpts) {
    this.url = opts.url;
    this.getLastSeq = opts.getLastSeq;
    this.setLastSeq = opts.setLastSeq;
    this.handlers = opts.handlers;
  }

  start() {
    this.stopped = false;
    this.connect();
  }

  stop() {
    this.stopped = true;
    this.clearPing();
    try {
      this.ws?.close();
    } catch {
      // ignore: ws may already be closed
    }
    this.ws = null;
  }

  isOpen() {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  send<T extends ClientEvent>(msg: T) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify(msg));
  }

  subChatList() {
    this.send({
      v: 1,
      id: this.newId("sub"),
      seq: 0,
      type: "sub",
      payload: { topic: "chat_list" },
    });
  }

  subChat(chatId: string) {
    this.send({
      v: 1,
      id: this.newId("sub"),
      seq: 0,
      type: "sub",
      payload: { topic: "chat", chatId },
    });
  }

  unsubChat(chatId: string) {
    this.send({
      v: 1,
      id: this.newId("unsub"),
      seq: 0,
      type: "unsub",
      payload: { topic: "chat", chatId },
    });
  }

  private connect() {
    if (this.stopped) return;

    try {
      this.ws = new WebSocket(this.url);
    } catch {
      this.scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      this.reconnectAttempt = 0;
      this.handlers.onOpen?.();

      const lastSeq = this.getLastSeq();

      const hello = {
        v: 1,
        id: this.newId("hello"),
        seq: 0,
        type: "hello",
        payload: { lastSeq },
      } as const;

      this.ws?.send(JSON.stringify(hello));

      this.subChatList();
      this.startPing();
    };

    this.ws.onmessage = (m) => {
      let evt: Envelope;
      try {
        evt = JSON.parse(m.data);
      } catch {
        return;
      }

      if (evt?.id && this.seen.has(evt.id)) return;
      if (evt?.id) this.seen.add(evt.id);

      if (typeof evt.seq === "number" && evt.seq > 0) {
        this.setLastSeq(evt.seq);
      }

      this.handlers.onEvent(evt as any);
    };

    this.ws.onerror = (e) => {
      this.handlers.onError?.(e);
    };

    this.ws.onclose = () => {
      this.clearPing();
      this.handlers.onClose?.();
      this.ws = null;
      this.scheduleReconnect();
    };
  }

  private scheduleReconnect() {
    if (this.stopped) return;

    const base = Math.min(2000 * Math.pow(1.7, this.reconnectAttempt), 20000);
    const jitter = Math.floor(Math.random() * 400);
    const delay = Math.floor(base + jitter);

    this.reconnectAttempt += 1;

    window.setTimeout(() => {
      if (!this.stopped) this.connect();
    }, delay);
  }

  private startPing() {
    this.clearPing();
    this.pingTimer = window.setInterval(() => {
      if (!this.isOpen()) return;
      this.send({
        v: 1,
        id: this.newId("ping"),
        seq: 0,
        type: "ping",
        payload: { t: Date.now() },
      });
    }, 25000);
  }

  private clearPing() {
    if (this.pingTimer) {
      window.clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  private newId(prefix: string) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
  }
}
