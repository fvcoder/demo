"use client";
import { Button } from "@heroui/react";
import { useEffect } from "react";

import { useSW } from "@/hooks/useSW";

export function Status() {
  const sw = useSW();

  useEffect(() => {
    return sw.subscribe((event) => {
      console.log("Received event from service worker:", event);
    });
  }, []);

  return (
    <div>
      <p>asd {sw.sw?.active ? "Active" : "Inactive"}</p>
      <Button onClick={() => sw.sendCommand({ type: "ping" })}> Send ping</Button>
    </div>
  );
}
