import { useApi } from "@config-runtime/dist";
import { Post } from "../../../entities/post/models";

export const usePostCreate = () => {
  const create = useApi().useAuthedMutation<Post>("http://89.111.163.192:8000/api/v1/posts", "post");

  return create;
};
