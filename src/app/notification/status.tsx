"use client";
import { Card } from "@heroui/react";

import { useSW } from "@/hooks/useSW";

export function Status() {
  const { sw } = useSW();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Estado del Service Worker</Card.Title>
        <Card.Description>
          {sw ? "Service Worker está registrado." : "Service Worker no está registrado."}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div>
          <strong>Estado:</strong>
          <p>{sw?.active?.state}</p>
        </div>
      </Card.Content>
    </Card>
  );
}
