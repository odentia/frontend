import { useApi } from "@config-runtime";
import { Publication } from "../models";

export const usePost = (id: number) => {
  const post = useApi().useApiQuery<Publication>({
    key: [`post-${id}`],
    path: `/posts/${id}`,
  });

  const samePosts = useApi().useApiQuery<Publication[]>({
    key: [`post-${id}`, "same"],
    path: `/posts/${id}/same`,
  });

  return { post, samePosts };
};
