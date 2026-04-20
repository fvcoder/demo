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
  type: "pong";
  pong: string;
}

export type ServiceWorkerEvent = ServiceWorkerPushEvent | ServiceWorkerPingEvent;

/* ---------- Client -> SW ---------- */
export interface ServiceWorkerPingCommand {
  type: "ping";
}

export interface ServiceWorkerPushCommand {
  type: "push";
  push: PushNotification;
}

export type ServiceWorkerCommand = ServiceWorkerPingCommand | ServiceWorkerPushCommand;
