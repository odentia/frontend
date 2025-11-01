import {
  useQuery,
  useMutation,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import type { AxiosInstance } from "axios";

export function createApiHooks(
  client: AxiosInstance,
  auth: {
    useSessionQuery: ({ enabled }: { enabled?: boolean }) => {
      isSuccess: boolean;
      isLoading: boolean;
    };
  },
) {
  function useApiQuery<TData = unknown>({
    key,
    path,
    params,
    enabled = true,
    method = "get",
    ...opts
  }: {
    key: unknown[];
    path: string;
    params?: Record<string, unknown>;
    method?: "get";
    enabled?: boolean;
  } & Pick<UseQueryOptions<TData>, "staleTime" | "select" | "gcTime">) {
    return useQuery<TData>({
      queryKey: [...key, params],
      enabled,
      queryFn: async ({ signal }) =>
        (await client.request<TData>({ url: path, method, params, signal }))
          .data,
      ...opts,
    });
  }

  function useApiMutation<TData = unknown, TVars = unknown>(
    path: string,
    method: "post" | "put" | "patch" | "delete" = "post",
    invalidate?: unknown[],
  ) {
    const qc = useQueryClient();
    return useMutation<TData, unknown, TVars>({
      mutationFn: async (vars) =>
        (await client.request<TData>({ url: path, method, data: vars })).data,
      onSuccess: () =>
        invalidate && qc.invalidateQueries({ queryKey: invalidate }),
    });
  }

  function useAuthedQuery<TData = unknown>(
    args: Parameters<typeof useApiQuery<TData>>[0],
  ) {
    const { isSuccess, isLoading } = auth.useSessionQuery({ enabled: true });
    return useApiQuery<TData>({
      ...args,
      enabled: (args.enabled ?? true) && isSuccess && !isLoading,
    });
  }

  function useAuthedMutation<TData = unknown, TVars = unknown>(
    path: string,
    method: "post" | "put" | "patch" | "delete" = "post",
    invalidate?: unknown[],
  ) {
    const { isSuccess } = auth.useSessionQuery({ enabled: true });
    return useMutation<TData, unknown, TVars>({
      mutationFn: async (vars) => {
        if (!isSuccess) throw new Error("Not authorized");
        return (await client.request<TData>({ url: path, method, data: vars }))
          .data;
      },
      onSuccess: () => {
        const qc = useQueryClient();
        invalidate && qc.invalidateQueries({ queryKey: invalidate });
      },
    });
  }

  return { useApiQuery, useApiMutation, useAuthedQuery, useAuthedMutation };
}
