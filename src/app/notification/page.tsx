import { Metadata } from "next";

import { HeaderTitle } from "@/components/header";
import { Container } from "@/components/ui/container";

import { Events } from "./events";
import { Status } from "./status";

export const metadata: Metadata = {
  title: "Notificaciones Push",
  description: "Implementación de notificaciones push utilizando service workers en una aplicación web.",
};

export default function NotificationPage() {
  return (
    <Container className="space-y-4 py-4">
      <HeaderTitle title="Notificaciones Push" subtitle="Con service workers" />
      <div className="grid grid-cols-2 gap-4">
        <Status />
        <Events />
      </div>
    </Container>
  );
}
