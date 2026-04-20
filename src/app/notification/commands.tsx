"use client";
import { Button, Card } from "@heroui/react";

import { useSW } from "@/hooks/useSW";

export function Commands() {
  const { sendCommand } = useSW();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Acciones</Card.Title>
        <Card.Description>Aquí puedes enviar comandos al service worker para probar su funcionalidad.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Button
          onClick={() =>
            sendCommand({
              type: "push",
              push: { type: "simple", title: "Notificación simple", body: "Este es el cuerpo de la notificación" },
            })
          }
        >
          Notificación simple
        </Button>
        <Button
          onClick={() => {
            setTimeout(() => {
              sendCommand({
                type: "push",
                push: { type: "simple", title: "Notificación simple", body: "con atraso (1s)" },
              });
            }, 1000);
          }}
        >
          Notificación con atraso (1s)
        </Button>
      </Card.Content>
    </Card>
  );
}
