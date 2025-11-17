import { createModuleFederationConfig } from "@module-federation/enhanced/rspack";

const shared = {
  react: { singleton: true, requiredVersion: "^19.1.1", eager: true },
  "react-dom": { singleton: true, requiredVersion: "^19.1.1", eager: true },
  "react-router-dom": {
    singleton: true,
    requiredVersion: "^7.9.4",
    eager: true,
  },
  "@ui": { singleton: true, eager: true },
  "@api-client": { singleton: true, eager: true },
  "@config-runtime": { singleton: true, eager: true },
  "react/jsx-runtime": {
    singleton: true,
    requiredVersion: "^19.1.1",
    eager: true,
  },
  "react/jsx-dev-runtime": {
    singleton: true,
    requiredVersion: "^19.1.1",
    eager: true,
  },
};

export default createModuleFederationConfig({
  name: "host",
  remotes: {
    auth: "auth@http://localhost:3010/remoteEntry.js",
    profile: "profile@http://localhost:3020/remoteEntry.js",
  },
  shared,
});
