import axios, { AxiosError, AxiosInstance } from "axios";

export type HttpClientOpts = {
  baseURL: string;
  withCredentials?: boolean;
  refreshPath?: string;
  onAuthFailed?: () => void;
};

export function createHttpClient(opts: HttpClientOpts): AxiosInstance {
  const client = axios.create({
    baseURL: opts.baseURL,
    withCredentials: opts.withCredentials ?? true,
  });

  let isRefreshing = false;
  let queue: Array<(ok: boolean) => void> = [];
  const flush = (ok: boolean) => {
    queue.forEach((r) => r(ok));
    queue = [];
  };

  client.interceptors.response.use(
    (r) => r,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const original: any = error.config;
      if (status === 401 && !original?._retry && opts.refreshPath) {
        original._retry = true;
        if (isRefreshing) {
          const gate = new Promise<boolean>((r) => queue.push(r));
          const ok = await gate;
          if (!ok) throw error;
          return client.request(original);
        }
        isRefreshing = true;
        try {
          await client.post(opts.refreshPath);
          flush(true);
          return client.request(original);
        } catch (e) {
          flush(false);
          opts.onAuthFailed?.();
          throw e;
        } finally {
          isRefreshing = false;
        }
      }
      throw error;
    },
  );

  return client;
}
