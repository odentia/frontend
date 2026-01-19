import { useApi } from "@config-runtime/dist";
import { Post } from "../../../entities/post/models";

export const usePostCreate = () => {
  const create = useApi().useAuthedMutation<Post>("/posts/create", "post");

  return create;
};
