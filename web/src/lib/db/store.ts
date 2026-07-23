/**
 * Lightweight JSON store for orders, stock and admin data.
 * Serverless-friendly: memory + /tmp fallback when the FS is ephemeral.
 */

import { flavors, type FlavorId, type FormatId } from "@/lib/tokens";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import type {
  AppStore,
  Campaign,
  DailyStock,
  Member,
  Order,
  OrderStatus,
  Reservation,
  WhatsAppMessage,
} from "./types";

export type {
  AppStore,
  Campaign,
  DailyStock,
  Member,
  Order,
  OrderStatus,
  Reservation,
  WhatsAppMessage,
};

const EMPTY: AppStore = {
  orders: [],
  messages: [],
  stock: [],
  members: [],
  campaigns: [],
  reservations: [],
};

/** In-process cache (shared across requests on the same isolate). */
let memory: AppStore | null = null;

function dataPath() {
  // Prefer /tmp on Vercel; fall back to project-local data in development.
  const base =
    process.env.VERCEL || process.env.NODE_ENV === "production"
      ? join(tmpdir(), "torticlub")
      : join(process.cwd(), ".data");
  try {
    if (!existsSync(base)) mkdirSync(base, { recursive: true });
  } catch {
    /* ignore */
  }
  return join(base, "store.json");
}

function loadFromDisk(): AppStore {
  try {
    const p = dataPath();
    if (!existsSync(p)) return structuredClone(EMPTY);
    const raw = readFileSync(p, "utf8");
    const parsed = JSON.parse(raw) as AppStore;
    return {
      orders: parsed.orders ?? [],
      messages: parsed.messages ?? [],
      stock: parsed.stock ?? [],
      members: parsed.members ?? [],
      campaigns: parsed.campaigns ?? [],
      reservations: parsed.reservations ?? [],
    };
  } catch {
    return structuredClone(EMPTY);
  }
}

function saveToDisk(store: AppStore) {
  try {
    writeFileSync(dataPath(), JSON.stringify(store), "utf8");
  } catch (e) {
    console.error("[store] write failed", e);
  }
}

/** Snapshot of the current store (from memory or disk). */
export function readStore(): AppStore {
  if (!memory) memory = loadFromDisk();
  return memory;
}

/** Apply a pure update and persist. */
export function updateStore(fn: (s: AppStore) => AppStore): AppStore {
  const current = readStore();
  const next = fn(current);
  memory = next;
  saveToDisk(next);
  return next;
}

export function uid(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function tomorrowStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

/** Default daily capacity for a service date. */
export function defaultDailyStock(date: string): DailyStock {
  const flavorCaps = Object.fromEntries(
    flavors.map((f) => [f.id, 40]),
  ) as Record<FlavorId, number>;

  return {
    date,
    formats: { solo: 30, duo: 25, club: 20 },
    flavors: flavorCaps,
    sold: {
      formats: { solo: 0, duo: 0, club: 0 },
      flavors: Object.fromEntries(flavors.map((f) => [f.id, 0])) as Record<
        FlavorId,
        number
      >,
    },
    note: "",
  };
}

export function getStockForDate(store: AppStore, date: string): DailyStock {
  return store.stock.find((s) => s.date === date) ?? defaultDailyStock(date);
}

type FulfillOk = { ok: true };
type FulfillFail = { ok: false; reason: string; flavor?: FlavorId };

/** Check whether a cart can be fulfilled against a stock row. */
export function canFulfill(
  stock: DailyStock,
  format: FormatId,
  selected: FlavorId[],
  quantity: number,
): FulfillOk | FulfillFail {
  const qty = Math.max(1, quantity);
  const fmtLeft = (stock.formats[format] ?? 0) - (stock.sold.formats[format] ?? 0);
  if (fmtLeft < qty) {
    return { ok: false, reason: "format" };
  }

  for (const fl of selected) {
    const left = (stock.flavors[fl] ?? 0) - (stock.sold.flavors[fl] ?? 0);
    // Each unit consumes one portion of every selected flavour slot.
    if (left < qty) {
      return { ok: false, reason: "flavor", flavor: fl };
    }
  }

  return { ok: true };
}

/** Increment sold counters after a confirmed sale. */
export function applySale(
  stock: DailyStock,
  format: FormatId,
  selected: FlavorId[],
  quantity: number,
): DailyStock {
  const qty = Math.max(1, quantity);
  const soldFormats = { ...stock.sold.formats };
  const soldFlavors = { ...stock.sold.flavors };

  soldFormats[format] = (soldFormats[format] ?? 0) + qty;
  for (const fl of selected) {
    soldFlavors[fl] = (soldFlavors[fl] ?? 0) + qty;
  }

  return {
    ...stock,
    sold: {
      formats: soldFormats,
      flavors: soldFlavors,
    },
  };
}

/** Upsert a member profile keyed by phone digits. */
export function upsertMember(
  members: Member[],
  name: string,
  phone: string,
): Member[] {
  const key = phone.replace(/\D/g, "");
  const idx = members.findIndex((m) => m.phone.replace(/\D/g, "") === key);
  const now = new Date().toISOString();

  if (idx === -1) {
    return [
      {
        id: uid("mem"),
        name,
        phone,
        createdAt: now,
        ordersCount: 1,
        lastOrderAt: now,
        tags: [],
      },
      ...members,
    ];
  }

  return members.map((m, i) =>
    i === idx
      ? {
          ...m,
          name: name || m.name,
          ordersCount: m.ordersCount + 1,
          lastOrderAt: now,
        }
      : m,
  );
}
