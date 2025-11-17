import { useApi } from "@config-runtime/dist";

export const useAvatar = () => {
  const api = useApi();
  const add = api.useAuthedMutation<number>("/user/avatar");

  return { add };
};
