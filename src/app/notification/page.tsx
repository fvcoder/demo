import { Metadata } from "next";

import { HeaderTitle } from "@/components/header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Notificaciones Push",
  description: "Implementación de notificaciones push utilizando service workers en una aplicación web.",
};

export default function NotificationPage() {
  return (
    <Container className="space-y-4 py-4">
      <HeaderTitle title="Notificaciones Push" subtitle="Con service workers" />
    </Container>
  );
}
