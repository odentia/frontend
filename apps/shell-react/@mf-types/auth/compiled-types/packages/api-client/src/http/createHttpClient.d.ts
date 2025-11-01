import { AxiosInstance } from "axios";
export type HttpClientOpts = {
  baseURL: string;
  withCredentials?: boolean;
  refreshPath?: string;
};
export declare function createHttpClient(opts: HttpClientOpts): AxiosInstance;
