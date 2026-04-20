/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { disableDevLogs, Serwist } from "serwist";

import { PushNotification } from "@/types/push";
import { ServiceWorkerCommand, ServiceWorkerEvent } from "@/types/sw";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() as PushNotification;

  event.waitUntil(
    (async () => {
      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      if (clients.length > 0) {
        clients.forEach((client) => {
          client.postMessage({
            type: "push",
            push: {
              data,
              isFocused: client.visibilityState === "visible",
            },
          } satisfies ServiceWorkerEvent);
        });
      }

      if (clients.some((client) => client.visibilityState === "visible")) {
        return;
      }

      await self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
        silent: false,
      });
    })(),
  );
});

self.addEventListener("message", async (event) => {
  const data = event.data as ServiceWorkerCommand;

  const clients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (data.type === "ping") {
    clients.forEach((client) => {
      client.postMessage({
        type: "ping",
        ping: `Pong from service worker at ${new Date().toISOString()}`,
      } satisfies ServiceWorkerEvent);
    });
  }
});

serwist.addEventListeners();
disableDevLogs();
