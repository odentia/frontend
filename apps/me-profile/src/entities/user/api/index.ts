import { useApi } from "@config-runtime";
import { User } from "../model/types";

export const useUser = () => {
  const user = useApi().useAuthedQuery<User>({
    key: ["user-me"],
    path: "/auth-api/api/v1/auth/me",
  });
  return user;
};
