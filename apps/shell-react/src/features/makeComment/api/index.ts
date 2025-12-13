import { useApi } from "@config-runtime";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import type { CommentDto, Comment } from "../models";
import { CommentTarget, MakeCommentVars } from "../models";

export const useMakeComment = (
  type: "game" | "post",
  target: CommentTarget,
) => {
  const api = useApi();
  const qc = useQueryClient();

  let prevData: CommentDto | InfiniteData<CommentDto> | undefined;

  const path =
    target.kind === "post"
      ? `/${type}/${target.id}/comments`
      : `/${type}/comments/${target.parentId}/replies`;

  return api.useAuthedMutation<Comment, MakeCommentVars, MakeCommentVars>(
    path,
    "post",
    [],
    {
      onMutate: async (variables: MakeCommentVars) => {
        const { text } = variables;

        const queryKey =
          target.kind === "post"
            ? ["comment", target.id, type, target.page]
            : ["children", target.parentId, type];

        await qc.cancelQueries({ queryKey });

        prevData = qc.getQueryData(queryKey);

        const optimisticComment: Comment = {
          id: -Date.now(),
          text,
          parentId: target.kind === "children" ? target.parentId : null,
          rating: 0,
          childrenCount: 0,
          isLikedMe: false,
          isDisLikedMe: false,
          isPositive: true,
          author: {
            id: 0,
            name: "Вы",
            avatar: null,
          },
          date: new Date().toISOString(),
          // @ts-ignore
          isOptimistic: true,
        };

        if (target.kind === "post") {
          qc.setQueryData<CommentDto | undefined>(queryKey, (old) => {
            if (!old) {
              return {
                items: [optimisticComment],
                hasMore: false,
                nextCursor: null,
              };
            }

            return {
              ...old,
              items: [optimisticComment, ...old.items],
            };
          });
        } else {
          qc.setQueryData<InfiniteData<CommentDto> | undefined>(
            queryKey,
            (old) => {
              if (!old) {
                return {
                  pages: [
                    {
                      items: [optimisticComment],
                      hasMore: false,
                      nextCursor: null,
                    },
                  ],
                  pageParams: [null],
                };
              }

              return {
                ...old,
                pages: old.pages.map((page, index) =>
                  index === 0
                    ? {
                        ...page,
                        items: [optimisticComment, ...page.items],
                      }
                    : page,
                ),
              };
            },
          );
        }
        return variables;
      },

      onError: (_err, _vars) => {
        if (!prevData) return;

        const queryKey =
          target.kind === "post"
            ? ["comment", target.id, type, target.page]
            : ["children", target.parentId, type];

        qc.setQueryData(queryKey, prevData);
      },

      onSettled: (_data, _err, _vars) => {
        const queryKey =
          target.kind === "post"
            ? ["comment", target.id, type, target.page]
            : ["children", target.parentId, type];

        qc.invalidateQueries({ queryKey });
      },
    },
  );
};
