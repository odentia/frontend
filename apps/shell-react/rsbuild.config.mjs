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
    cors: { origin: ["http://localhost:3010"] },
    headers: { "Access-Control-Allow-Origin": "*" },
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
