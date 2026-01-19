import { useApi } from "@config-runtime";

export const useDeleteUser = () => {
   const api = useApi().useAuthedMutation<unknown, void>("/profile/account", "delete", [
     "user-me",
   ]);

   return api;
};
