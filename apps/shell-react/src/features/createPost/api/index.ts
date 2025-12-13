import { useApi } from "@config-runtime/dist";

export const usePostCreate = () => {
  const create = useApi().useAuthedMutation("/posts/create", "post");

  return create;
};
