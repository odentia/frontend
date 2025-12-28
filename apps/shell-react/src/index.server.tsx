// src/server-entry.tsx
import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { routesConfig } from "./app/router";
import { ApiProvider } from "./app/providers/query/Provider";
import { ThemeProvider } from "@ui";

export async function render(
  url: string = "/",
  requestHeaders: Record<string, string> = {},
) {
  try {
    const actualUrl = url || "/";

    if (typeof actualUrl !== "string") {
      throw new Error(`Invalid URL parameter: ${actualUrl}`);
    }

    const normalizedUrl = actualUrl.startsWith("/")
      ? actualUrl
      : `/${actualUrl}`;

    const baseUrl = "http://localhost:3000";
    const fullUrl = new URL(normalizedUrl, baseUrl).toString();

    const handler = createStaticHandler(routesConfig);
    const context = await handler.query(
      new Request(fullUrl, {
        headers: requestHeaders,
      }),
    );

    if (context instanceof Response) {
      if (context.status >= 300 && context.status < 400) {
        const redirectUrl = context.headers.get("Location");
        throw new Error(`Redirect to: ${redirectUrl}`);
      }
      throw new Error(`HTTP ${context.status}: ${context.statusText}`);
    }

    const router = createStaticRouter(routesConfig, context);

    return ReactDOMServer.renderToString(
      <React.StrictMode>
        <ThemeProvider>
          <ApiProvider>
            <StaticRouterProvider
              router={router}
              context={context}
              hydrate={false}
            />
          </ApiProvider>
        </ThemeProvider>
      </React.StrictMode>,
    );
  } catch (error) {
    console.error("SSR Render error:", error);
    // Fallback to empty content - будет использован CSR
    return '<div id="root"></div>';
  }
}