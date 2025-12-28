import React, { ReactNode, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiProvider as RuntimeApiProvider } from "@config-runtime";
import { createHttpClient } from "@api-client";

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (count, error: any) => {
        if (error?.isNetworkError || !error?.response) {
          return false;
        }

        return count < 2;
      },
    },
  },
});

export const ApiProvider = ({ children }: LayoutProps) => {
  const client = useMemo(
    () =>
      createHttpClient({
        baseURL: "http://localhost:8000/api/v1/",
        refreshPath: "/auth/refresh",
        withCredentials: true,
        onAuthFailed: () => {
          console.log("Outed!");

          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
        },
        onNetworkError: () => {
          // if (typeof window !== "undefined") {
          //   if (window.location.pathname !== "/network") {
          //     window.location.href = "/network";
          //   }
          // }
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RuntimeApiProvider client={client}>{children}</RuntimeApiProvider>
    </QueryClientProvider>
  );
};
