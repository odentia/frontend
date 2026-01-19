import { useApi } from "@config-runtime/dist";
import { ThemePayload } from "../models";

export function useGetTheme() {
    const api = useApi().useAuthedQuery<ThemePayload>({path: "/profile/theme", method: "get", key: ["theme"]});
    return api;
}