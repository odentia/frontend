import { useApi } from "@config-runtime";
import { ThemePayload } from "../../../entities/theme/models";

export function useSaveTheme() {
    const api = useApi().useAuthedMutation<ThemePayload>("/profile/theme", "put", ["theme"]);
    return api;
}