import { SessionUser, LoginDto } from "./dto"
import { AxiosInstance } from "axios"


export const authApi = (client: AxiosInstance) => ({
  me: async () => (await client.get<SessionUser>("auth/me")).data,
  login: async (vars: LoginDto) => (await client.post("auth/login", vars)).data,
  logout: async () => (await client.post("auth/logout")).data,
})