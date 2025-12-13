import { useApi } from "@config-runtime";
import { Page, Post } from "../models";

export const usePost = (id: number) => {
  const post = useApi().useApiQuery<Post>({
    key: [`post-${id}`],
    path: `/posts/${id}`,
  });

  const samePosts = useApi().useApiQuery<Post[]>({
    key: [`post-${id}`, "same"],
    path: `/posts/${id}/same`,
  });

  return { post, samePosts };
};
