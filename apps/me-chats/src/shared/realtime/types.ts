export type Envelope<TType extends string = string, TPayload = any> = {
  v: 1;
  id: string;
  seq: number;
  type: TType;
  ts?: string;
  payload: TPayload;
};

export type Hello = Envelope<"hello", { lastSeq?: number }>;
export type Sub = Envelope<
  "sub",
  { topic: "chat_list" | "chat"; chatId?: string }
>;
export type Unsub = Envelope<
  "unsub",
  { topic: "chat_list" | "chat"; chatId?: string }
>;
export type Ping = Envelope<"ping", { t: number }>;
export type Pong = Envelope<"pong", { t: number }>;

export type MessageCreated = Envelope<
  "message.created",
  {
    chatId: string;
    message: {
      id: string;
      text: string;
      createdAt: string;
      authorId?: string;
      clientMsgId?: string;
    };
  }
>;

export type ReadUpdated = Envelope<
  "read.updated",
  {
    chatId: string;
    unread?: number;
    lastReadMessageId?: string;
    lastReadAt?: string;
    userId?: string;
  }
>;

export type ChatUpdated = Envelope<
  "chat.updated",
  {
    chat: {
      id: string;
      title?: string;
      pinned?: boolean;
      archived?: boolean;
      lastMessage?: any;
      unread?: number;
    };
  }
>;

export type ChatCreated = Envelope<
  "chat.created",
  { chat: { id: string; title?: string; lastMessage?: any; unread?: number } }
>;

export type ServerEvent =
  | MessageCreated
  | ReadUpdated
  | ChatUpdated
  | ChatCreated
  | Pong;
export type ClientEvent = Hello | Sub | Unsub | Ping;
