export interface BaseNotification {
  title: string;
  body: string;
  icon?: string;
  url?: string;
}

export interface SimpleNotification extends BaseNotification {
  type: "simple";
}

export interface UpdateNotification extends BaseNotification {
  type: "update";
  timestamp: number;
}

export type PushNotification = SimpleNotification | UpdateNotification;
