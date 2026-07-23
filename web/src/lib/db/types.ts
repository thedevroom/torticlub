import type { FlavorId, FormatId } from "@/lib/tokens";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "kitchen"
  | "ready"
  | "delivered"
  | "cancelled";

export type DeliveryMethod = "pickup" | "delivery";

export interface Order {
  id: string;
  createdAt: string;
  date: string; // YYYY-MM-DD service date
  format: FormatId;
  flavors: FlavorId[];
  quantity: number;
  delivery: DeliveryMethod;
  name: string;
  phone: string;
  address: string;
  status: OrderStatus;
  notes: string;
  source: "web" | "whatsapp" | "admin" | "reservation";
  isReservation: boolean;
  reservationFor: string | null;
}

export interface WhatsAppMessage {
  id: string;
  createdAt: string;
  from: string;
  phone: string;
  body: string;
  direction: "in" | "out";
  read: boolean;
  orderId: string | null;
}

export interface DailyStock {
  date: string;
  formats: Record<FormatId, number>;
  flavors: Record<FlavorId, number>;
  sold: {
    formats: Record<FormatId, number>;
    flavors: Record<FlavorId, number>;
  };
  note: string;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  ordersCount: number;
  lastOrderAt: string | null;
  tags: string[];
}

export interface Campaign {
  id: string;
  title: string;
  body: string;
  channel: "instagram" | "whatsapp" | "email" | "web";
  status: "draft" | "scheduled" | "sent";
  scheduledAt: string | null;
  createdAt: string;
}

export interface Reservation {
  id: string;
  createdAt: string;
  forDate: string;
  format: FormatId;
  flavors: FlavorId[];
  quantity: number;
  name: string;
  phone: string;
  notes: string;
  status: "pending" | "confirmed" | "fulfilled" | "cancelled";
}

export interface AppStore {
  orders: Order[];
  messages: WhatsAppMessage[];
  stock: DailyStock[];
  members: Member[];
  campaigns: Campaign[];
  reservations: Reservation[];
}
