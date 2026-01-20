import { SessionUser, LoginDto } from "./dto";
import { AxiosInstance } from "axios";

export const authApi = (client: AxiosInstance) => ({
  me: async (signal?: AbortSignal) =>
    (await client.get<SessionUser>("/auth-api/api/v1/auth/me", { signal })).data,

  login: async (vars: LoginDto) => (await client.post("/auth-api/api/v1/auth/login", vars)).data,

  logout: async () => (await client.post("/auth-api/api/v1/auth/logout")).data,
});
