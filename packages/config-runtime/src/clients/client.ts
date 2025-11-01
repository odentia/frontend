import { useApiClient } from "../provider/provider";
import { createApiHooks, createAuthHooks } from "../../../api-client/src/index";

export function useAuth() {
  const client = useApiClient();
  return createAuthHooks(client);
}
export function useApi() {
  const client = useApiClient();
  const { useSessionQuery } = createAuthHooks(client);
  return createApiHooks(client, { useSessionQuery });
}
