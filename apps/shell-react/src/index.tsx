// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "./app/router";
import { ApiProvider } from "./app/providers/query/Provider";
import { ThemeProvider } from "@ui";

const router = createBrowserRouter(routesConfig, { basename: "/" });

ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <ThemeProvider>
      <ApiProvider>
        <RouterProvider router={router} />
      </ApiProvider>
    </ThemeProvider>
  </React.StrictMode>,
);