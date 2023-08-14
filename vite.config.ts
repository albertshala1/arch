import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig(({ mode }) => {
  return {
    plugins: [qwikCity({
      trailingSlash: false
    }), qwikVite({
      entryStrategy: { type: "component" }
    }), tsconfigPaths(), qwikReact(),
      basicSsl() // creates valid SSL cert, ref: https://vitejs.dev/config/server-options.html#server-https
    ],
    optimizeDeps: {
      include: ["@aws-amplify/auth"]
    },
    envPrefix: "BRIDGE_", // VITE_ available by default
    define: {
      "window.global": {}, // <-- Fixes error: "global is not defined" from amplify in dev mode
      "window.bridgeGlobal": {} // bridgeGlobal stores the stuff that needs to be available across the app, eg: flowbite modals
    },
    resolve: {
      // Ref: https://ui.docs.amplify.aws/react/getting-started/troubleshooting#vite
      alias: {
        "./runtimeConfig": "./runtimeConfig.browser" // <-- Fixes prod build amplify error: "request" is not exported by "__vite-browser-external"
      }
    },
    preview: {
      host: "alpha-bridge.cloud",
      port: 443,
      strictPort: true
    },
    server: mode !== "production" ? {
      host: "alpha-bridge.cloud",
      port: 443,
      strictPort: true
    } : {}
  };
});
