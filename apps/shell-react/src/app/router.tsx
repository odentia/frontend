import { Layout } from "../shared/layouts/layout";
import { Home } from "../pages";
import Auth from "../pages/auth/auth";
import type { RouteObject } from "react-router-dom";
import Profile from "../pages/profile/profile";
import { PublicationPage } from "../pages/publications/publication/publication";
import { CreatePostPage } from "../pages/publications/create";
import { ProtectedRoute } from "./routes/protectedRoute";
import { NetworkError } from "../pages/networkError";
import { NotFoundPage } from "../pages/notFound";
import { GamesPage } from "../pages/games";
import { PublicationsCatalog } from "../pages/publications/catalog";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth/*", element: <Auth /> },
      {
        path: "user",
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      { path: "publications", element: <PublicationsCatalog /> },
      { path: "publications/:id", element: <PublicationPage /> },
      { path: "publications/create", element: <ProtectedRoute><CreatePostPage /></ProtectedRoute> },
      { path: "network", element: <NetworkError /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "games", element: <GamesPage /> },
    ],
  },
];
