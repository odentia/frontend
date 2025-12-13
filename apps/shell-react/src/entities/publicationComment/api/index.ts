import { useApi, useApiClient } from "@config-runtime";
import { CommentDto } from "../models";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseCommentChildrenInfiniteOpts = {
  enabled?: boolean;
  live?: boolean;
};

export const useComments = (
  id: number,
  page: number,
  type: "post" | "game",
) => {
  const api = useApi();

  return api.useApiQuery<CommentDto>({
    key: ["comment", id, page, type],
    path: `${type}/comments/${id}`,
    params: { page },
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
};

export const useCommentChildrenInfinite = (
  parentId: number,
  opts: UseCommentChildrenInfiniteOpts = {},
  type: "game" | "post",
) => {
  const client = useApiClient();
  const enabled = (opts.enabled ?? true) && !!parentId;

  return useInfiniteQuery<CommentDto>({
    queryKey: ["children", parentId, type],
    enabled,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const cursor = (pageParam as string | null) ?? null;

      const res = await client.request<CommentDto>({
        url: `${type}/comments/${parentId}/children`,
        method: "get",
        params: cursor ? { cursor } : undefined,
      });

      return res.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,

    refetchInterval: opts.live ? 5000 : false,
    refetchIntervalInBackground: !!opts.live,
  });
};

export const useFlattenedChildren = (
  parentId: number,
  enabled: boolean,
  type: "post" | "game",
) => {
  const query = useCommentChildrenInfinite(parentId, { enabled }, type);

  const items = query.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    ...query,
    items,
  };
};
