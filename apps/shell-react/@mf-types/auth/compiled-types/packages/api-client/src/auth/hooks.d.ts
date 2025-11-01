import type { AxiosInstance } from "axios";
export type SessionUser = {
  id: string;
  email: string;
};
export declare function createAuthHooks(client: AxiosInstance): {
  useSessionQuery: ({
    enabled,
  }?: {
    enabled?: boolean;
  }) => import("@tanstack/react-query").UseQueryResult<SessionUser, Error>;
  useLoginMutation: () => import("@tanstack/react-query").UseMutationResult<
    {
      ok: true;
    },
    unknown,
    {
      email: string;
      password: string;
    },
    unknown
  >;
  useLogoutMutation: () => import("@tanstack/react-query").UseMutationResult<
    {
      ok: true;
    },
    unknown,
    void,
    unknown
  >;
};
