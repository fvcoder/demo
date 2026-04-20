"use client";
import { Card, Table } from "@heroui/react";
import { useEffect, useState } from "react";

import { useSW } from "@/hooks/useSW";
import { generateId } from "@/utils/generateId";

interface EventItem {
  id: string;
  from: "SW" | "Client";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const { subscribe, subscribeCommands } = useSW();

  useEffect(() => {
    const unsubscribe = subscribe((event) => {
      setEvents((prevEvents) => [...prevEvents, { id: generateId("sw"), from: "SW", data: event }]);
    });

    const unsubscribeCommands = subscribeCommands((command) => {
      setEvents((prevEvents) => [...prevEvents, { id: generateId("client"), from: "Client", data: command }]);
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
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Lista de eventos del Service Worker">
            <Table.Header>
              <Table.Column isRowHeader>Origen</Table.Column>
              <Table.Column>Data</Table.Column>
            </Table.Header>
            <Table.Body>
              {events.map((event) => (
                <Table.Row key={event.id}>
                  <Table.Cell>{event.from}</Table.Cell>
                  <Table.Cell>{JSON.stringify(event.data)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </Card>
  );
}
