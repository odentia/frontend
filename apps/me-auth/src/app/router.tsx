import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../shared/layouts/layout";
import Home from "./pages";

export function AuthRoutes() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </Layout>
  );
}
