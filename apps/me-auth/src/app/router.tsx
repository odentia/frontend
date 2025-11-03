import { Routes, Route } from "react-router-dom";
import { Login, SignUp } from "./pages";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" index element={<Login />} />
      <Route path="signup" element={<SignUp/>} />
    </Routes>
  );
}
