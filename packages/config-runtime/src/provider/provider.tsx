import { createContext, useContext, type PropsWithChildren } from "react";
import type { AxiosInstance } from "axios";

type Ctx = { client: AxiosInstance };
const ApiCtx = createContext<Ctx | null>(null);
export type __PING__ = "I_AM_REBUILT";

export function ApiProvider({
  client,
  children,
}: PropsWithChildren<{ client: AxiosInstance }>) {
  return <ApiCtx.Provider value={{ client }}>{children}</ApiCtx.Provider>;
}

export function useApiClient() {
  const ctx = useContext(ApiCtx);
  if (!ctx) throw new Error("ApiProvider is missing");
  return ctx.client;
}
