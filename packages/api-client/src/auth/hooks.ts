import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";

export type SessionUser = { id: string; email: string };

export function createAuthHooks(client: AxiosInstance) {
  const useSessionQuery = ({ enabled = true }: { enabled?: boolean } = {}) =>
    useQuery<SessionUser>({
      queryKey: ["auth", "session"],
      enabled,
      queryFn: async () => (await client.get<SessionUser>("/auth/me")).data,
      staleTime: 5 * 60 * 1000,
      retry: (count, err: any) =>
        err?.response?.status === 401 ? false : count < 2,
    });

  const useLoginMutation = () => {
    const qc = useQueryClient();
    return useMutation<
      { ok: true },
      unknown,
      { email: string; password: string }
    >({
      mutationFn: async (vars) => (await client.post("/auth/login", vars)).data,
      onSuccess: () => qc.invalidateQueries({ queryKey: ["auth", "session"] }),
    });
  };

  const useLogoutMutation = () => {
    const qc = useQueryClient();
    return useMutation<{ ok: true }, unknown, void>({
      mutationFn: async () => (await client.post("/auth/logout")).data,
      onSuccess: () => qc.invalidateQueries({ queryKey: ["auth", "session"] }),
    });
  };

  return { useSessionQuery, useLoginMutation, useLogoutMutation };
}
