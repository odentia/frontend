import { useApi } from "@config-runtime/dist";
import { ThemePayload } from "../models";

export function useGetTheme() {
  const api = useApi().useAuthedQuery<ThemePayload>({
    path: "http://89.111.163.192:8001/api/v1/profile/theme",
    method: "get",
    key: ["theme"],
  });
  return api;
}
