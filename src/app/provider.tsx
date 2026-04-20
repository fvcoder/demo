"use client";
import { SerwistProvider } from "@serwist/next/react";

import { ServiceWorkerProvider } from "@/provider/serviceWorker";
import { ThemeProvider } from "@/provider/theme";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SerwistProvider swUrl="/api/sw/sw.js">
      <ServiceWorkerProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ServiceWorkerProvider>
    </SerwistProvider>
  );
}
