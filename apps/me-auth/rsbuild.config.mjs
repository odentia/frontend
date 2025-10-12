import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { DtsPlugin } from "@module-federation/dts-plugin";
import mfConfig from "./module-federation.config";

export default defineConfig({
  plugins: [pluginReact(), pluginSass(), pluginModuleFederation(mfConfig), DtsPlugin()],
  server: {
    port: 3010,
    host: "localhost",
    cors: {
      origin: ["http://localhost:3000"],
    },
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  output: {
    assetPrefix: "http://localhost:3010/",
  },
  environments: {
    web: {
      source: {
        entry: {
          index: "./src/index",
        },
      },
    },
  },
  html: {
    template: "./template.html",
  },
});
