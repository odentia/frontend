import { type PropsWithChildren } from "react";
import type { AxiosInstance } from "axios";
export declare function ApiProvider({
  client,
  children,
}: PropsWithChildren<{
  client: AxiosInstance;
}>): import("react/jsx-runtime").JSX.Element;
export declare function useApiClient(): AxiosInstance;
