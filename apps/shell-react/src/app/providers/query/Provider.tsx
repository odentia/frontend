import { createHttpClient } from "@api-client/src/index";
import { ApiProvider as RuntimeApiProvider } from "@config-runtime";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const client = createHttpClient({
  baseURL: import.meta.env.API_URL,
  refreshPath: "/auth/refresh",
  withCredentials: true,
});

export const ApiProvider = ({ children }: LayoutProps) => (
  <RuntimeApiProvider client={client}>{children}</RuntimeApiProvider>
);
