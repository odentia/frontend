// src/app/providers/query/Provider.tsx
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiProvider as RuntimeApiProvider } from "@config-runtime";
import { createHttpClient } from "@api-client/src/index";

interface LayoutProps {
  children: ReactNode;
}

const handelOut = () => {
  console.log("Outed!");
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const client = createHttpClient({
  baseURL: "http://localhost:8000/api/v1/",
  refreshPath: "/auth/refresh",
  withCredentials: true,
  onAuthFailed: handelOut,
});

export const ApiProvider = ({ children }: LayoutProps) => (
  <QueryClientProvider client={queryClient}>
    <RuntimeApiProvider client={client}>{children}</RuntimeApiProvider>
  </QueryClientProvider>
);
