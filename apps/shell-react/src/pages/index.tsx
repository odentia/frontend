import { Routes, Route } from "react-router-dom";
import { Home } from "./home";
import Auth from "./auth/auth";
import { Layout } from "../shared/layouts/layout";

const Pages = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </Layout>
);

export default Pages;
