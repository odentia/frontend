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
  refetchInterval?: number | false;
  refetchIntervalInBackground?: boolean;
} & Pick<UseQueryOptions<TData>, "staleTime" | "select" | "gcTime">;

type MutationCommonCallbacks<TData, TVars, TContext, TError = unknown> = {
  onMutate?: (vars: TVars) => Promise<TContext> | TContext;
  onSuccess?: (data: TData, vars: TVars, ctx: TContext) => void;
  onError?: (err: TError, vars: TVars, ctx: TContext | undefined) => void;
  onSettled?: (
    data: TData | undefined,
    err: TError | null,
    vars: TVars,
    ctx: TContext | undefined,
  ) => void;
};

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
    const {
      key,
      path,
      params,
      enabled = true,
      method = "get",
      refetchInterval,
      refetchIntervalInBackground,
      ...opts
    } = args;
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
      refetchInterval,
      refetchIntervalInBackground,
      ...opts,
    });
  }

  function useApiMutation<
    TData = unknown,
    TVars = unknown,
    TContext = unknown,
    TError = unknown,
  >(
    path: string,
    method: "post" | "put" | "patch" | "delete" = "post",
    invalidate?: unknown[],
    common?: MutationCommonCallbacks<TData, TVars, TContext, TError>,
  ) {
    const qc = useQueryClient();
    return useMutation<TData, TError, TVars, TContext>({
      mutationFn: async (vars) =>
        (
          await client.request<TData>({
            url: path,
            method,
            data: vars,
          })
        ).data,

      onMutate: common?.onMutate,

      onSuccess: (data, vars, ctx) => {
        common?.onSuccess?.(data, vars, ctx as TContext);
      },

      onError: (err, vars, ctx) => {
        common?.onError?.(err, vars, ctx as TContext | undefined);
      },

      onSettled: (data, err, vars, ctx) => {
        if (invalidate) {
          qc.invalidateQueries({ queryKey: invalidate });
        }
        common?.onSettled?.(data, err, vars, ctx as TContext | undefined);
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

  function useAuthedMutation<
    TData = unknown,
    TVars = unknown,
    TContext = unknown,
    TError = unknown,
  >(
    path: string,
    method: "post" | "put" | "patch" | "delete" = "post",
    invalidate?: unknown[],
    common?: MutationCommonCallbacks<TData, TVars, TContext, TError>,
  ) {
    const { isSuccess } = auth.useSessionQuery({ enabled: true });
    const qc = useQueryClient();

    return useMutation<TData, TError, TVars, TContext>({
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

      onMutate: common?.onMutate,

      onSuccess: (data, vars, ctx) => {
        common?.onSuccess?.(data, vars, ctx as TContext);
      },

      onError: (err, vars, ctx) => {
        common?.onError?.(err, vars, ctx as TContext | undefined);
      },

      onSettled: (data, err, vars, ctx) => {
        if (invalidate) {
          qc.invalidateQueries({ queryKey: invalidate });
        }
        common?.onSettled?.(data, err, vars, ctx as TContext | undefined);
      },
    });
  }

  return { useApiQuery, useApiMutation, useAuthedQuery, useAuthedMutation };
}
