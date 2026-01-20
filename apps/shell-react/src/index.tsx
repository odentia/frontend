import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "./app/router";
import { ApiProvider } from "./app/providers/query/Provider";
import { ThemeProvider } from "@ui";
import { useLoadThemeVars } from "./entities/theme/api";
import { useAuth } from "@config-runtime";

const router = createBrowserRouter(routesConfig, { basename: "/" });

function RootInner() {
  const auth = useAuth();
  const sessionQuery = auth.useSessionQuery();
  const isAuthed = sessionQuery.isSuccess;

  const { vars } = useLoadThemeVars(isAuthed);

  return (
    <ThemeProvider initial={vars}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <ApiProvider>
      <RootInner />
    </ApiProvider>
  </React.StrictMode>,
);
