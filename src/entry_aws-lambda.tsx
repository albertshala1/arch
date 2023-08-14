/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Express HTTP server when building for production.
 *
 * Learn more about Node.js server integrations here:
 * - https://qwik.builder.io/docs/deployments/node/
 *
 */
import "source-map-support/register";
import { createQwikCity, type PlatformNode } from "@builder.io/qwik-city/middleware/node";
// eslint-disable-next-line import/no-unresolved
import qwikCityPlan from "@qwik-city-plan";
// eslint-disable-next-line import/no-unresolved
import { manifest } from "@qwik-client-manifest";
import serverless from "serverless-http";
import render from "./entry.ssr";

declare global {
  interface QwikCityPlatform extends PlatformNode {}
}

// Create the Qwik City router
const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
  static: {
    cacheControl: "public, max-age=31557600",
  },
  getOrigin(req) {
    if (process.env.IS_OFFLINE) {
      return `http://${req.headers.host}`;
    }
    return null;
  },
});

export const bridgeApp = serverless(
  {
    handle: (req: any, res: any) => {
      req.url = fixPath(req.url);
      staticFile(req, res, () => {
        router(req, res, () => {
          notFound(req, res, () => {});
        });
      });
    },
  },
  {
    binary: true,
  }
);

function fixPath(path: string) {
  if (qwikCityPlan.trailingSlash) {
    const url = new URL(path, `${import.meta.env.BRIDGE_URL}`);
    if (url.pathname.includes(".", url.pathname.lastIndexOf("/"))) {
      return path;
    }
    if (!url.pathname.endsWith("/")) {
      return url.pathname + "/" + url.search;
    }
  }
  return path;
}
