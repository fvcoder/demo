import { createSerwistRoute } from "@serwist/turbopack";
import { spawnSync } from "node:child_process";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const revision = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout ?? crypto.randomUUID();

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute({
  additionalPrecacheEntries: [{ url: "/~offline", revision }],
  swSrc: "worker/index.ts",
  useNativeEsbuild: true,
});
