import { useApi } from "@config-runtime";

export const useAvatar = () => {
  const api = useApi();
  const add = api.useAuthedMutation<number>("/user/avatar");

  return { add };
};
