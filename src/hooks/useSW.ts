import { useContext } from "react";

import { serviceWorkerCtx } from "@/provider/serviceWorker";

export function useSW() {
  const ctx = useContext(serviceWorkerCtx);

  return ctx;
}
