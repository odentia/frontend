import { useMemo } from "react";
import { useApi } from "@config-runtime/dist";
import { payloadToCss, ScssTheme, ThemePayload } from "../models";

export function useLoadThemeVars(enabled: boolean) {
  const q = useApi().useAuthedQuery<ThemePayload>({
    key: ["theme"],
    path: "/profile/theme",
    enabled,
  });

  const vars: ScssTheme | undefined = useMemo(() => {
    if (!q.data) return undefined;
    return payloadToCss(q.data) as unknown as ScssTheme;
  }, [q.data]);

  return { ...q, vars };
}

export async function loadThemeVarsServer(
  baseUrl: string,
  requestHeaders: Record<string, string>,
): Promise<ScssTheme | undefined> {
  const res = await fetch(`${baseUrl}/profile/theme`, {
    headers: requestHeaders,
  });

  if (!res.ok) return undefined;
  const data = (await res.json()) as ThemePayload;
  return payloadToCss(data) as unknown as ScssTheme;
}