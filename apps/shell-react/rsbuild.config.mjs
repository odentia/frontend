import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import mfConfig from "./module-federation.config";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSass(),
    pluginModuleFederation(mfConfig),
    pluginSvgr({
      svgrOptions: {
        exportType: "default",
        jsxRuntime: "automatic",
      },
    }),
  ],
  server: {
    port: 3000,
    host: "localhost",

    proxy: {
      "/auth-api": {
        target: "http://89.111.163.192:8011",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/auth-api": "" },
      },

      "/games-api": {
        target: "http://89.111.163.192:8010",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/games-api": "" },
      },

      "/posts-api": {
        target: "http://89.111.163.192:8000",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/posts-api": "" },
      },

      "/profile-api": {
        target: "http://89.111.163.192:8001",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/profile-api": "" },
      },

      "/comments-api": {
        target: "http://89.111.163.192:8012",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/comments-api": "" },
      },
    },
  },
  environments: {
    web: {
      source: {
        entry: {
          index: "./src/index",
        },
      },
    },
    node: {
      output: {
        module: true,
        target: "node",
        distPath: { root: "dist/server" },
      },
      source: {
        entry: {
          index: "./src/index.server",
        },
      },
    },
  },
  html: { template: "./template.html" },
});
