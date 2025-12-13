import { SessionUser, LoginDto } from "./dto";
import { AxiosInstance } from "axios";

export const authApi = (client: AxiosInstance) => ({
  me: async (signal?: AbortSignal) =>
    (await client.get<SessionUser>("auth/me", { signal })).data,

  login: async (vars: LoginDto) =>
    (await client.post("auth/login", vars)).data,

  logout: async () =>
    (await client.post("auth/logout")).data,
});
