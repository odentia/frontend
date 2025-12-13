import { useApi } from "@config-runtime";
import { Page } from "../models";

export const usePost = (id: number) => {
  const post = useApi().useApiQuery<Page>({
    key: [`post-${id}`],
    path: `/posts/${id}`,
  });

  const samePosts = useApi().useApiQuery<Page[]>({
    key: [`post-${id}`, "same"],
    path: `/posts/${id}/same`,
  });

  return { post, samePosts };
};
