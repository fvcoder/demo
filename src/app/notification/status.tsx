"use client";
import { Button, Card } from "@heroui/react";
import { useEffect, useState } from "react";

import { useSW } from "@/hooks/useSW";

export function Status() {
  const [notificationPermission, setNotificationPermission] = useState("default");
  const { sw } = useSW();

  function requestPermission() {
    if (!("Notification" in window)) {
      alert("Este navegador no soporta notificaciones.");

      return;
    }
    Notification.requestPermission().then((permission) => {
      setNotificationPermission(permission);
      if (permission === "granted") {
        alert("Permiso concedido para notificaciones.");
      } else {
        alert("Permiso denegado para notificaciones.");
      }
    });
  }
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

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
        <div>
          <strong>Permiso de notificaciones:</strong>
          <p className="mb-1">{notificationPermission}</p>
          <Button onClick={requestPermission}>Solicitar permiso</Button>
        </div>
      </Card.Content>
    </Card>
  );
}
