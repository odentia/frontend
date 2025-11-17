import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

export function ProfileRoutes() {
  return (
    <Routes>
      <Route element={<Home />} index />
    </Routes>
  );
}
