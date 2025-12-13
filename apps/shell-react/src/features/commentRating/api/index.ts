import { useApi } from "@config-runtime";
import { useQueryClient } from "@tanstack/react-query";

export const useCommentRating = (commentId: number) => {
  const api = useApi();
  const qc = useQueryClient();

  const queryKey = [`comment-${commentId}`];

  let prevPost: any;

  const likePost = api.useAuthedMutation(
    `/posts/like/${commentId}`,
    "post",
    queryKey,
    {
      onMutate: async () => {
        await qc.cancelQueries({ queryKey });

        prevPost = qc.getQueryData<any>(queryKey);

        qc.setQueryData<any>(queryKey, (old) => {
          if (!old) return old;

          const isLiked = old.isLikedByMe;
          const nextRating = old.rating + (isLiked ? -1 : 1);

          return {
            ...old,
            isLikedByMe: !isLiked,
            rating: nextRating,
          };
        });
      },

      onError: (_err, _vars) => {
        if (prevPost) {
          qc.setQueryData(queryKey, prevPost);
        }
      },

      onSettled: () => {
        qc.invalidateQueries({ queryKey });
      },
    },
  );

  return { likePost };
};
