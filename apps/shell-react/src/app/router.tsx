import { Layout } from "../shared/layouts/layout";
import { Home } from "../pages";
import Auth from "../pages/auth/auth";
import type { RouteObject } from "react-router-dom";
import Profile from "../pages/profile/profile";
import { PublicationPage } from "../pages/publications/publication/publication";
import { CreatePostPage } from "../pages/publications/create";
import { ProtectedRoute } from "./routes/protectedRoute";
import { NetworkError } from "../pages/networkError";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth/*", element: <Auth /> },
      { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "publication", element: <Home /> },
      { path: "publication/:id", element: <PublicationPage /> },
      { path: "publication/create", element: <CreatePostPage /> },
      { path: "network", element: <NetworkError/> }
    ],
  },
];
