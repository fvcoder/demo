"use client";
import { Button } from "@heroui/react";
import { useEffect } from "react";

import { useSW } from "@/hooks/useSW";

export function Status() {
  const sw = useSW();

  useEffect(() => {
    return sw.subscribe((event) => {
      alert(
        event.type === "ping" ? event.ping : `Received event of type ${event.type} with data: ${JSON.stringify(event)}`,
      );
    });
  }, []);

  return (
    <div>
      <p>asd {sw.sw?.active ? "Active" : "Inactive"}</p>
      <Button onClick={() => sw.sendCommand({ type: "ping" })}> Send ping</Button>
    </div>
  );
}
