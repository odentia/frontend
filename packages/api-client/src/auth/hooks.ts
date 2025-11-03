import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import { authApi } from "./api"
import type { SessionUser, LoginDto } from "./dto";

export function createAuthHooks(client: AxiosInstance) {

  const api = authApi(client)

  const useSessionQuery = ({ enabled = true }: { enabled?: boolean } = {}) =>
    useQuery<SessionUser>({
      queryKey: ["auth", "session"],
      enabled,
      queryFn: api.me,
      staleTime: 5 * 60 * 1000,
      retry: (count, err: any) =>
        err?.response?.status === 401 ? false : count < 2,
    });

  const useLoginMutation = () => {
    const qc = useQueryClient();
    return useMutation<
      { ok: true },
      unknown,
      LoginDto
    >({
      mutationFn: api.login,
      onSuccess: () => qc.invalidateQueries({ queryKey: ["auth", "session"] }),
    });
  };

  const useLogoutMutation = () => {
    const qc = useQueryClient();
    return useMutation<{ ok: true }, unknown, void>({
      mutationFn: api.logout,
      onSuccess: () => qc.invalidateQueries({ queryKey: ["auth", "session"] }),
    });
  };

  return { useSessionQuery, useLoginMutation, useLogoutMutation };
}
