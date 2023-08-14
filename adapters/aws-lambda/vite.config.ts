import { nodeServerAdapter } from "@builder.io/qwik-city/adapters/node-server/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";
import { builtinModules } from "module";
import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { loadEnv } from "vite";

export default extendConfig(baseConfig, ({ command, ssrBuild, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    ssr: {
      // This configuration will bundle all dependencies, except the node builtins (path, fs, etc.)
      external: builtinModules,
      noExternal: /./
    },
    build: {
      minify: false,
      ssr: true,
      rollupOptions: {
        input: ["./src/entry_aws-lambda.tsx", "@qwik-city-plan"]
      }
    },
    plugins: [
      nodeServerAdapter({ name: "aws-lambda" }),
      staticAdapter({ origin: env.BRIDGE_URL })
    ]
  };
});
