import { useApi } from "@config-runtime";
import type { User, UserDto } from "../model/types";

export const useUpdateUser = () => {
  const api = useApi();

  return api.useAuthedMutation<User, UserDto>("/user/me", "patch", ["user-me"]);
};
