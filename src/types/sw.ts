import { PushNotification } from "./push";

/* ---------- SW -> Client ---------- */
export interface ServiceWorkerPushEvent {
  type: "push";
  push: {
    isFocused: boolean;
    data: PushNotification;
  };
}
export interface ServiceWorkerPingEvent {
  type: "ping";
  ping: string;
}

export type ServiceWorkerEvent = ServiceWorkerPushEvent | ServiceWorkerPingEvent;

/* ---------- Client -> SW ---------- */
export interface ServiceWorkerPingCommand {
  type: "ping";
}

export type ServiceWorkerCommand = ServiceWorkerPingCommand;
