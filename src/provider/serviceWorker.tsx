"use client";

import { createContext, useEffect, useRef, useState } from "react";

import { ServiceWorkerCommand, ServiceWorkerEvent } from "@/types/sw";

interface ServiceWorkerCtx {
  sw?: ServiceWorkerRegistration;
  sendCommand: (command: ServiceWorkerCommand) => void;
  subscribe: (cb: (event: ServiceWorkerEvent) => void) => () => void;
  subscribeCommands: (cb: (event: ServiceWorkerCommand) => void) => () => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const serviceWorkerCtx = createContext<ServiceWorkerCtx>(null!);

export function ServiceWorkerProvider({ children }: { children: React.ReactNode }) {
  const [sw, setSw] = useState<ServiceWorkerRegistration | undefined>();
  const listeners = useRef(new Set<(event: ServiceWorkerEvent) => void>());
  const commandListeners = useRef(new Set<(event: ServiceWorkerCommand) => void>());

  function onMessage(e: MessageEvent<ServiceWorkerEvent>) {
    listeners.current.forEach((cb) => {
      cb(e.data);
    });
  }

  const subscribe = (cb: (event: ServiceWorkerEvent) => void) => {
    listeners.current.add(cb);

    return () => {
      listeners.current.delete(cb);
    };
  };

  const subscribeCommands = (cb: (event: ServiceWorkerCommand) => void) => {
    commandListeners.current.add(cb);

    return () => {
      commandListeners.current.delete(cb);
    };
  };

  function sendCommand(command: ServiceWorkerCommand) {
    if (!sw || !sw.active) {
      return;
    }
    sw.active.postMessage(command);
    commandListeners.current.forEach((cb) => {
      cb(command);
    });
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          setSw(registration);
        })
        .catch((error) => {
          console.error("Service worker registration failed:", error);
        });

      navigator.serviceWorker.addEventListener("message", onMessage);

      return () => {
        navigator.serviceWorker.removeEventListener("message", onMessage);
      };
    }
  }, []);

  return (
    <serviceWorkerCtx.Provider value={{ sw, sendCommand, subscribe, subscribeCommands }}>
      {children}
    </serviceWorkerCtx.Provider>
  );
}
