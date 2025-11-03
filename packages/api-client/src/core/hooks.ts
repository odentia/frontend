import {
  useQuery,
  useMutation,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import type { AxiosInstance } from "axios";

type ApiQueryArgs<TData> = {
  key: unknown[];
  path: string;
  params?: Record<string, unknown>;
  method?: "get";
  enabled?: boolean;
} & Pick<UseQueryOptions<TData>, "staleTime" | "select" | "gcTime">;

export function createApiHooks(
  client: AxiosInstance,
  auth: {
    useSessionQuery: ({ enabled }: { enabled?: boolean }) => {
      isSuccess: boolean;
      isLoading: boolean;
    };
  },
) {

  function useApiQuery<TData = unknown>(args: ApiQueryArgs<TData>) {
    const { key, path, params, enabled = true, method = "get", ...opts } = args;
    return useQuery<TData>({
      queryKey: [...key, params],
      enabled,
      queryFn: async ({ signal }) =>
        (
          await client.request<TData>({
            url: path,
            method,
            params,
            signal,
          })
        ).data,
      ...opts,
    });
  }

  function useApiMutation<TData = unknown, TVars = unknown>(
    path: string,
    method: "post" | "put" | "patch" | "delete" = "post",
    invalidate?: unknown[],
    common?: {
      onSuccess?: (data: TData, vars: TVars) => void;
      onError?: (err: unknown, vars: TVars) => void;
    }
  ) {
    const qc = useQueryClient();
    return useMutation<TData, unknown, TVars>({
      mutationFn: async (vars) =>
        (
          await client.request<TData>({
            url: path,
            method,
            data: vars,
          })
        ).data,
      onSuccess: (data, vars) => {
        invalidate && qc.invalidateQueries({ queryKey: invalidate });
        common?.onSuccess?.(data, vars);
      },
      onError: (err, vars) => {
        common?.onError?.(err, vars);
      },
    });
  }

  function useAuthedQuery<TData = unknown>(args: ApiQueryArgs<TData>) {
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
    common?: {
      onSuccess?: (data: TData, vars: TVars) => void;
      onError?: (err: unknown, vars: TVars) => void;
    }
  ) {
    const { isSuccess } = auth.useSessionQuery({ enabled: true });
    const qc = useQueryClient();
    return useMutation<TData, unknown, TVars>({
      mutationFn: async (vars) => {
        if (!isSuccess) throw new Error("Not authorized");
        return (
          await client.request<TData>({
            url: path,
            method,
            data: vars,
          })
        ).data;
      },
      onSuccess: (data, vars) => {
        invalidate && qc.invalidateQueries({ queryKey: invalidate });
        common?.onSuccess?.(data, vars);
      },
      onError: (err, vars) => {
        common?.onError?.(err, vars);
      },
    });
  }

  return { useApiQuery, useApiMutation, useAuthedQuery, useAuthedMutation };
}
