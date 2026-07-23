"use server";

import { verifyAdminSession } from "@/lib/auth";
import {
  applySale,
  canFulfill,
  defaultDailyStock,
  getStockForDate,
  readStore,
  todayStr,
  tomorrowStr,
  uid,
  updateStore,
  upsertMember,
  type Campaign,
  type Order,
  type OrderStatus,
  type Reservation,
} from "@/lib/db/store";
import type { FlavorId, FormatId } from "@/lib/tokens";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  if (!(await verifyAdminSession())) {
    throw new Error("Unauthorized");
  }
}

function revalidateAll() {
  revalidatePath("/admin");
  revalidatePath("/pedir");
  revalidatePath("/reservar");
  revalidatePath("/carta");
  revalidatePath("/");
}

/* ── Public: stock & orders ── */

export async function getPublicStock(date?: string) {
  const store = readStore();
  const d = date ?? todayStr();
  const stock = getStockForDate(store, d);
  // Ensure exists
  if (!store.stock.find((s) => s.date === d)) {
    updateStore((s) => ({ ...s, stock: [...s.stock, stock] }));
  }
  return stock;
}

export async function checkAvailability(input: {
  format: FormatId;
  flavors: FlavorId[];
  quantity: number;
  date?: string;
}) {
  const store = readStore();
  const d = input.date ?? todayStr();
  const stock = getStockForDate(store, d);
  const result = canFulfill(stock, input.format, input.flavors, input.quantity);
  return {
    date: d,
    available: result.ok,
    reason: result.ok ? null : result.reason,
    flavor: result.ok ? null : "flavor" in result ? result.flavor : null,
    remainingFormat:
      (stock.formats[input.format] ?? 0) - (stock.sold.formats[input.format] ?? 0),
    tomorrow: tomorrowStr(),
  };
}

export async function submitOrder(input: {
  format: FormatId;
  flavors: FlavorId[];
  quantity: number;
  delivery: "pickup" | "delivery";
  name: string;
  phone: string;
  address: string;
  notes?: string;
  serviceDate?: string;
}) {
  try {
    if (!input.format) {
      return { ok: false as const, code: "INVALID" as const, message: "Elige un formato." };
    }
    if (!input.name?.trim() || !input.phone?.trim()) {
      return {
        ok: false as const,
        code: "INVALID" as const,
        message: "Nombre y teléfono son obligatorios.",
      };
    }
    if (!input.flavors?.length) {
      return {
        ok: false as const,
        code: "INVALID" as const,
        message: "Elige al menos un sabor.",
      };
    }

    const date = input.serviceDate ?? todayStr();
    const store = readStore();
    let stock = getStockForDate(store, date);
    const check = canFulfill(
      stock,
      input.format,
      input.flavors,
      Math.max(1, input.quantity || 1),
    );

    if (!check.ok) {
      return {
        ok: false as const,
        code: "OUT_OF_STOCK" as const,
        message:
          "Hoy el Club se ha quedado sin magia suficiente. Reserva para mañana y te guardamos mesa.",
        tomorrow: tomorrowStr(),
      };
    }

    const qty = Math.max(1, Math.min(12, input.quantity || 1));
    const order: Order = {
      id: uid("ord"),
      createdAt: new Date().toISOString(),
      date,
      format: input.format,
      flavors: input.flavors,
      quantity: qty,
      delivery: input.delivery || "pickup",
      name: input.name.trim(),
      phone: input.phone.trim(),
      address: (input.address || "").trim(),
      status: "pending",
      notes: input.notes ?? "",
      source: "web",
      isReservation: false,
      reservationFor: null,
    };

    stock = applySale(stock, input.format, input.flavors, qty);

    updateStore((s) => {
      const stocks = s.stock.filter((x) => x.date !== date);
      stocks.push(stock);
      return {
        ...s,
        orders: [order, ...s.orders],
        stock: stocks,
        members: upsertMember(s.members, order.name, order.phone),
        messages: [
          {
            id: uid("msg"),
            createdAt: new Date().toISOString(),
            from: order.name,
            phone: order.phone,
            body: `Nuevo pedido web ${order.format.toUpperCase()} ×${order.quantity} — ${order.flavors.join(", ")} · ${order.phone}`,
            direction: "in" as const,
            read: false,
            orderId: order.id,
          },
          ...s.messages,
        ],
      };
    });

    try {
      revalidateAll();
    } catch {
      /* ignore revalidate errors */
    }

    return { ok: true as const, orderId: order.id };
  } catch (e) {
    console.error("[submitOrder]", e);
    return {
      ok: false as const,
      code: "ERROR" as const,
      message: "No pudimos registrar el pedido. Inténtalo de nuevo en unos segundos.",
    };
  }
}

export async function submitReservation(input: {
  format: FormatId;
  flavors: FlavorId[];
  quantity: number;
  name: string;
  phone: string;
  notes?: string;
  forDate?: string;
}) {
  const forDate = input.forDate ?? tomorrowStr();
  const reservation: Reservation = {
    id: uid("res"),
    createdAt: new Date().toISOString(),
    forDate,
    format: input.format,
    flavors: input.flavors,
    quantity: input.quantity,
    name: input.name.trim(),
    phone: input.phone.trim(),
    notes: input.notes ?? "",
    status: "pending",
  };

  updateStore((s) => ({
    ...s,
    reservations: [reservation, ...s.reservations],
    members: upsertMember(s.members, reservation.name, reservation.phone),
    messages: [
      {
        id: uid("msg"),
        createdAt: new Date().toISOString(),
        from: reservation.name,
        phone: reservation.phone,
        body: `Reserva para ${forDate}: ${reservation.format.toUpperCase()} ×${reservation.quantity}`,
        direction: "in" as const,
        read: false,
        orderId: null,
      },
      ...s.messages,
    ],
  }));

  revalidateAll();
  return { ok: true as const, reservationId: reservation.id, forDate };
}

/* ── Admin ── */

export async function adminGetDashboard() {
  await requireAdmin();
  const s = readStore();
  const today = todayStr();
  const stock = getStockForDate(s, today);
  return {
    orders: s.orders,
    messages: s.messages,
    stock,
    allStock: s.stock,
    members: s.members,
    campaigns: s.campaigns,
    reservations: s.reservations,
    today,
    tomorrow: tomorrowStr(),
  };
}

export async function adminUpdateOrderStatus(orderId: string, status: OrderStatus) {
  await requireAdmin();
  updateStore((s) => ({
    ...s,
    orders: s.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
  }));
  revalidatePath("/admin");
}

export async function adminSetStock(input: {
  date: string;
  formats: Record<FormatId, number>;
  flavors: Record<FlavorId, number>;
  note?: string;
}) {
  await requireAdmin();
  updateStore((s) => {
    const existing = s.stock.find((x) => x.date === input.date);
    const base = existing ?? defaultDailyStock(input.date);
    const next = {
      ...base,
      formats: input.formats,
      flavors: input.flavors,
      note: input.note ?? base.note,
    };
    return {
      ...s,
      stock: [...s.stock.filter((x) => x.date !== input.date), next],
    };
  });
  revalidateAll();
}

export async function adminMarkMessageRead(id: string) {
  await requireAdmin();
  updateStore((s) => ({
    ...s,
    messages: s.messages.map((m) =>
      m.id === id ? { ...m, read: true } : m,
    ),
  }));
  revalidatePath("/admin");
}

export async function adminReplyWhatsApp(phone: string, body: string) {
  await requireAdmin();
  updateStore((s) => ({
    ...s,
    messages: [
      {
        id: uid("msg"),
        createdAt: new Date().toISOString(),
        from: "TortiClub",
        phone,
        body,
        direction: "out" as const,
        read: true,
        orderId: null,
      },
      ...s.messages,
    ],
  }));
  revalidatePath("/admin");
  // Deep link for real WhatsApp send
  return {
    waUrl: `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(body)}`,
  };
}

export async function adminSaveCampaign(input: {
  id?: string;
  title: string;
  body: string;
  channel: Campaign["channel"];
  status: Campaign["status"];
  scheduledAt?: string | null;
}) {
  await requireAdmin();
  updateStore((s) => {
    if (input.id) {
      return {
        ...s,
        campaigns: s.campaigns.map((c) =>
          c.id === input.id
            ? {
                ...c,
                title: input.title,
                body: input.body,
                channel: input.channel,
                status: input.status,
                scheduledAt: input.scheduledAt ?? null,
              }
            : c,
        ),
      };
    }
    const c: Campaign = {
      id: uid("camp"),
      title: input.title,
      body: input.body,
      channel: input.channel,
      status: input.status,
      scheduledAt: input.scheduledAt ?? null,
      createdAt: new Date().toISOString(),
    };
    return { ...s, campaigns: [c, ...s.campaigns] };
  });
  revalidatePath("/admin");
}

export async function adminUpdateReservation(
  id: string,
  status: Reservation["status"],
) {
  await requireAdmin();
  updateStore((s) => ({
    ...s,
    reservations: s.reservations.map((r) =>
      r.id === id ? { ...r, status } : r,
    ),
  }));
  revalidatePath("/admin");
}

export async function adminFulfillReservation(id: string) {
  await requireAdmin();
  const store = readStore();
  const res = store.reservations.find((r) => r.id === id);
  if (!res) throw new Error("Not found");

  const order: Order = {
    id: uid("ord"),
    createdAt: new Date().toISOString(),
    date: res.forDate,
    format: res.format,
    flavors: res.flavors,
    quantity: res.quantity,
    delivery: "pickup",
    name: res.name,
    phone: res.phone,
    address: "",
    status: "confirmed",
    notes: `Desde reserva ${res.id}`,
    source: "reservation",
    isReservation: true,
    reservationFor: res.forDate,
  };

  let stock = getStockForDate(store, res.forDate);
  const check = canFulfill(stock, res.format, res.flavors, res.quantity);
  if (check.ok) {
    stock = applySale(stock, res.format, res.flavors, res.quantity);
  }

  updateStore((s) => ({
    ...s,
    orders: [order, ...s.orders],
    reservations: s.reservations.map((r) =>
      r.id === id ? { ...r, status: "fulfilled" as const } : r,
    ),
    stock: [...s.stock.filter((x) => x.date !== res.forDate), stock],
  }));
  revalidateAll();
}
