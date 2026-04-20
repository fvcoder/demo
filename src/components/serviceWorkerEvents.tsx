"use client";
import { Card, Modal, Table, TableLayout, Virtualizer } from "@heroui/react";
import { useEffect, useState } from "react";

import { useSW } from "@/hooks/useSW";
import { generateId } from "@/utils/generateId";

interface EventItem {
  id: string;
  from: "SW" | "Client";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  date: Date;
}

export function ServiceWorkerEventsCard() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | undefined>(undefined);
  const { subscribe, subscribeCommands } = useSW();

  useEffect(() => {
    const unsubscribe = subscribe((event) => {
      setEvents((prevEvents) => [{ id: generateId("sw"), from: "SW", data: event, date: new Date() }, ...prevEvents]);
    });

    const unsubscribeCommands = subscribeCommands((command) => {
      setEvents((prevEvents) => [
        { id: generateId("client"), from: "Client", data: command, date: new Date() },
        ...prevEvents,
      ]);
    });

    return () => {
      unsubscribe();
      unsubscribeCommands();
    };
  }, [subscribe, subscribeCommands]);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Eventos del Service Worker</Card.Title>
        <Card.Description>Aquí puedes ver los intercambios de mensajes con el Service Worker.</Card.Description>
      </Card.Header>
      <Virtualizer
        layout={TableLayout}
        layoutOptions={{
          rowHeight: 45,
          headingHeight: 40,
        }}
      >
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Lista de eventos del Service Worker" className="h-75 overflow-auto">
              <Table.Header className="size-full">
                <Table.Column isRowHeader maxWidth={64}>
                  Origen
                </Table.Column>
                <Table.Column>Tipo de evento</Table.Column>
                <Table.Column>Hora</Table.Column>
                <Table.Column maxWidth={96}>Acciones</Table.Column>
              </Table.Header>
              <Table.Body items={events}>
                {(event) => (
                  <Table.Row key={event.id}>
                    <Table.Cell>{event.from}</Table.Cell>
                    <Table.Cell>{event.data.type}</Table.Cell>
                    <Table.Cell>
                      {event.date.toLocaleString("es-BO", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </Table.Cell>
                    <Table.Cell>
                      <button className="link" onClick={() => setSelectedEvent(event)}>
                        Ver datos
                      </button>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Virtualizer>
      <Modal isOpen={!!selectedEvent} onOpenChange={(status) => !status && setSelectedEvent(undefined)}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Detalles del evento</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <pre className="overflow-auto rounded-2xl bg-gray-100 p-4">
                  {JSON.stringify(selectedEvent?.data, null, 2) || "Selecciona un evento para ver sus datos"}
                </pre>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </Card>
  );
}
