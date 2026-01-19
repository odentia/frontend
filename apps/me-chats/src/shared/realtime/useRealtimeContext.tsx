import React, { createContext, useContext } from "react";
import type { RealtimeClient } from "./client";

const RealtimeCtx = createContext<RealtimeClient | null>(null);

export function RealtimeProvider({
  client,
  children,
}: {
  client: RealtimeClient | null;
  children: React.ReactNode;
}) {
  return <RealtimeCtx.Provider value={client}>{children}</RealtimeCtx.Provider>;
}

export function useRealtimeContext() {
  return useContext(RealtimeCtx);
}
