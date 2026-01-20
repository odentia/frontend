import { useApi } from "@config-runtime";
import type { User, UserDto } from "../model/types";

export const useUpdateUser = () => {
  const api = useApi();

  return api.useAuthedMutation<User, UserDto>("/profile-api/api/v1/profile/me", "put", [
    "user-me",
  ]);
};
