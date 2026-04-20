"use client";
import { Toast } from "@heroui/react";
import { SerwistProvider } from "@serwist/next/react";

import { PushProvider } from "@/provider/push";
import { ServiceWorkerProvider } from "@/provider/serviceWorker";
import { ThemeProvider } from "@/provider/theme";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SerwistProvider swUrl="/api/sw/sw.js">
      <ServiceWorkerProvider>
        <ThemeProvider>
          <PushProvider>{children}</PushProvider>
        </ThemeProvider>
      </ServiceWorkerProvider>
      <Toast.Provider />
    </SerwistProvider>
  );
}
