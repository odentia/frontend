import { Layout } from "../shared/layouts/layout";
import { Home } from "../pages";
import Auth from "../pages/auth/auth";
import type { RouteObject } from "react-router-dom";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <Auth /> },
    ],
  },
];
