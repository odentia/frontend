import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages";

export function AuthRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
}
