"use client";

import {
  adminFulfillReservation,
  adminGetDashboard,
  adminMarkMessageRead,
  adminReplyWhatsApp,
  adminSaveCampaign,
  adminSetStock,
  adminUpdateOrderStatus,
  adminUpdateReservation,
} from "@/app/actions/store";
import { adminLogout } from "@/app/actions/admin";
import { Eyes } from "@/components/brand/Eyes";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type {
  Campaign,
  DailyStock,
  Member,
  Order,
  OrderStatus,
  Reservation,
  WhatsAppMessage,
} from "@/lib/db/types";
import { flavors, formats, type FlavorId } from "@/lib/tokens";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";

type Tab =
  | "overview"
  | "orders"
  | "kitchen"
  | "whatsapp"
  | "stock"
  | "members"
  | "campaigns"
  | "reservations";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "Pedidos" },
  { id: "kitchen", label: "Cocina" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "stock", label: "Stock" },
  { id: "reservations", label: "Reservas" },
  { id: "members", label: "Miembros" },
  { id: "campaigns", label: "Campañas" },
];

const statusLabel: Record<OrderStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  kitchen: "En cocina",
  ready: "Listo",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [data, setData] = useState<Awaited<
    ReturnType<typeof adminGetDashboard>
  > | null>(null);
  const [pending, start] = useTransition();

  const reload = useCallback(() => {
    start(async () => {
      const d = await adminGetDashboard();
      setData(d);
    });
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  if (!data) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-surface">
        <p className="text-ink/40 font-semibold">Cargando panel…</p>
      </div>
    );
  }

  const unread = data.messages.filter((m) => !m.read && m.direction === "in")
    .length;
  const activeOrders = data.orders.filter(
    (o) => !["delivered", "cancelled"].includes(o.status),
  );

  return (
    <div className="min-h-[100svh] bg-surface text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/8 bg-surface/95 backdrop-blur-xl">
        <div className="px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eyes size={26} />
            <span className="font-bold lowercase tracking-tight">torticlub</span>
            <span className="text-[0.6rem] uppercase tracking-widest text-ink/35 font-bold">
              Admin
            </span>
            {pending && (
              <span className="text-[0.6rem] text-ink/30 ml-2">sync…</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs font-semibold text-ink/40">
              Web
            </Link>
            <form action={adminLogout}>
              <button
                type="submit"
                className="text-xs font-semibold text-ink/50 hover:text-ink"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
        <div className="px-2 md:px-4 overflow-x-auto scrollbar-none">
          <nav className="flex gap-1 pb-2 min-w-max">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition-colors",
                  tab === t.id
                    ? "bg-ink text-surface"
                    : "text-ink/45 hover:bg-ink/5",
                )}
              >
                {t.label}
                {t.id === "whatsapp" && unread > 0 && (
                  <span className="ml-1.5 inline-flex size-4 items-center justify-center rounded-full bg-primary text-[0.55rem] text-ink">
                    {unread}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="relative h-36 md:h-44 overflow-hidden">
        <Image
          src="/brand/product-club.png"
          alt=""
          fill
          className="object-contain object-right opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent" />
        <div className="absolute bottom-5 left-4 md:left-6">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ink/35 font-bold">
            {data.today}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Panel del Club
          </h1>
        </div>
      </div>

      <main className="px-4 md:px-6 py-8 max-w-6xl mx-auto pb-20">
        {tab === "overview" && (
          <Overview
            orders={activeOrders.length}
            messages={unread}
            members={data.members.length}
            reservations={data.reservations.filter((r) => r.status === "pending").length}
            stock={data.stock}
          />
        )}
        {tab === "orders" && (
          <OrdersPanel orders={data.orders} onChange={reload} />
        )}
        {tab === "kitchen" && (
          <KitchenBoard orders={data.orders} onChange={reload} />
        )}
        {tab === "whatsapp" && (
          <WhatsAppInbox messages={data.messages} onChange={reload} />
        )}
        {tab === "stock" && (
          <StockPanel
            stock={data.stock}
            allStock={data.allStock}
            today={data.today}
            tomorrow={data.tomorrow}
            onChange={reload}
          />
        )}
        {tab === "members" && <MembersPanel members={data.members} />}
        {tab === "campaigns" && (
          <CampaignsPanel campaigns={data.campaigns} onChange={reload} />
        )}
        {tab === "reservations" && (
          <ReservationsPanel
            reservations={data.reservations}
            onChange={reload}
          />
        )}
      </main>
    </div>
  );
}

function Overview({
  orders,
  messages,
  members,
  reservations,
  stock,
}: {
  orders: number;
  messages: number;
  members: number;
  reservations: number;
  stock: DailyStock;
}) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { t: "Pedidos activos", n: orders },
          { t: "WA sin leer", n: messages },
          { t: "Miembros", n: members },
          { t: "Reservas", n: reservations },
        ].map((s) => (
          <div key={s.t} className="rounded-2xl border border-ink/8 p-5">
            <p className="text-[0.65rem] uppercase tracking-wider text-ink/35 font-bold">
              {s.t}
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{s.n}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="font-bold text-lg mb-3">Stock hoy</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {formats.map((f) => {
            const rem =
              (stock.formats[f.id] ?? 0) - (stock.sold.formats[f.id] ?? 0);
            return (
              <div
                key={f.id}
                className="rounded-2xl border border-ink/8 p-4 flex items-center justify-between"
              >
                <span className="font-bold tracking-wider text-sm">
                  {f.label}
                </span>
                <span
                  className={cn(
                    "text-2xl font-bold tabular-nums",
                    rem <= 0 ? "text-red-600" : "text-ink",
                  )}
                >
                  {rem}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OrdersPanel({
  orders,
  onChange,
}: {
  orders: Order[];
  onChange: () => void;
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-bold text-lg">Pedidos</h2>
      {orders.length === 0 && (
        <p className="text-ink/40 text-sm">Aún no hay pedidos.</p>
      )}
      {orders.map((o) => {
        const waText = encodeURIComponent(
          `Hola ${o.name}, te escribimos de TortiClub sobre tu pedido ${o.format.toUpperCase()} ×${o.quantity} (${o.flavors.join(", ")}). Ref: ${o.id}`,
        );
        const phoneDigits = o.phone.replace(/\D/g, "");
        const waHref = `https://wa.me/${phoneDigits.startsWith("34") ? phoneDigits : `34${phoneDigits}`}?text=${waText}`;

        return (
          <div
            key={o.id}
            className="rounded-2xl border border-ink/8 p-4 md:p-5 space-y-3"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-bold">{o.name}</p>
                <p className="text-xs text-ink/40 font-medium">
                  {o.phone} · {o.format.toUpperCase()} ×{o.quantity} · {o.date}
                </p>
                <p className="text-xs text-ink/50 mt-1">
                  {o.flavors.join(" · ")}
                </p>
              </div>
              <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[0.65rem] font-bold">
                {statusLabel[o.status]}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  "pending",
                  "confirmed",
                  "kitchen",
                  "ready",
                  "delivered",
                  "cancelled",
                ] as OrderStatus[]
              ).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={async () => {
                    await adminUpdateOrderStatus(o.id, st);
                    onChange();
                  }}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[0.65rem] font-bold border",
                    o.status === st
                      ? "bg-ink text-surface border-ink"
                      : "border-ink/10 text-ink/45",
                  )}
                >
                  {statusLabel[st]}
                </button>
              ))}
            </div>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/15 text-[#128C7E] px-3 py-2 text-xs font-bold hover:bg-[#25D366]/25"
            >
              Escribir por WhatsApp
            </a>
          </div>
        );
      })}
    </div>
  );
}

function KitchenBoard({
  orders,
  onChange,
}: {
  orders: Order[];
  onChange: () => void;
}) {
  const cols: OrderStatus[] = ["confirmed", "kitchen", "ready"];
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Estado de cocina</h2>
      <div className="grid md:grid-cols-3 gap-3">
        {cols.map((col) => (
          <div key={col} className="rounded-2xl bg-[#F3EDE0]/80 p-3 min-h-[200px]">
            <p className="text-xs font-bold tracking-wider text-ink/40 mb-3 px-1">
              {statusLabel[col]}
            </p>
            <div className="space-y-2">
              {orders
                .filter((o) => o.status === col)
                .map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={async () => {
                      const next =
                        col === "confirmed"
                          ? "kitchen"
                          : col === "kitchen"
                            ? "ready"
                            : "delivered";
                      await adminUpdateOrderStatus(o.id, next);
                      onChange();
                    }}
                    className="w-full text-left rounded-xl bg-surface border border-ink/8 p-3 hover:border-ink/20"
                  >
                    <p className="font-bold text-sm">{o.name}</p>
                    <p className="text-xs text-ink/45 mt-0.5">
                      {o.format.toUpperCase()} · {o.flavors.join(", ")}
                    </p>
                    <p className="text-[0.65rem] text-ink/30 mt-2 font-semibold">
                      Toca para avanzar →
                    </p>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatsAppInbox({
  messages,
  onChange,
}: {
  messages: WhatsAppMessage[];
  onChange: () => void;
}) {
  const [reply, setReply] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg">Inbox WhatsApp</h2>
      <div className="rounded-2xl border border-ink/8 divide-y divide-ink/8 max-h-[420px] overflow-y-auto">
        {messages.map((m) => (
          <button
            key={m.id}
            type="button"
            className={cn(
              "w-full text-left p-4 hover:bg-ink/[0.02]",
              !m.read && m.direction === "in" && "bg-primary/15",
            )}
            onClick={async () => {
              setPhone(m.phone);
              if (!m.read) {
                await adminMarkMessageRead(m.id);
                onChange();
              }
            }}
          >
            <div className="flex justify-between gap-2">
              <p className="font-bold text-sm">
                {m.direction === "out" ? "Tú → " : ""}
                {m.from}
              </p>
              <p className="text-[0.6rem] text-ink/30">
                {new Date(m.createdAt).toLocaleString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                })}
              </p>
            </div>
            <p className="text-sm text-ink/55 mt-1 font-medium">{m.body}</p>
          </button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono"
          className="h-11 rounded-xl border border-ink/12 px-3 text-sm font-medium sm:w-40"
        />
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Respuesta…"
          className="h-11 rounded-xl border border-ink/12 px-3 text-sm font-medium flex-1"
        />
        <Button
          size="sm"
          variant="ink"
          onClick={async () => {
            if (!phone || !reply) return;
            const r = await adminReplyWhatsApp(phone, reply);
            setReply("");
            onChange();
            window.open(r.waUrl, "_blank");
          }}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}

function StockPanel({
  stock,
  today,
  tomorrow,
  onChange,
}: {
  stock: DailyStock;
  allStock: DailyStock[];
  today: string;
  tomorrow: string;
  onChange: () => void;
}) {
  const [date, setDate] = useState(today);
  const [formatsState, setFormatsState] = useState(stock.formats);
  const [flavorsState, setFlavorsState] = useState(stock.flavors);
  const [note, setNote] = useState(stock.note);

  useEffect(() => {
    setFormatsState(stock.formats);
    setFlavorsState(stock.flavors);
    setNote(stock.note);
  }, [stock]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-bold text-lg">Stock día a día</h2>
        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-9 rounded-lg border border-ink/12 px-2 text-sm font-semibold"
        >
          <option value={today}>Hoy ({today})</option>
          <option value={tomorrow}>Mañana ({tomorrow})</option>
        </select>
      </div>

      <div>
        <p className="text-xs font-bold tracking-wider text-ink/35 mb-2">
          FORMATOS (unidades)
        </p>
        <div className="grid grid-cols-3 gap-2">
          {formats.map((f) => (
            <label key={f.id} className="rounded-xl border border-ink/10 p-3">
              <span className="text-xs font-bold">{f.label}</span>
              <input
                type="number"
                min={0}
                value={formatsState[f.id] ?? 0}
                onChange={(e) =>
                  setFormatsState((s) => ({
                    ...s,
                    [f.id]: Number(e.target.value),
                  }))
                }
                className="mt-1 w-full text-xl font-bold bg-transparent outline-none"
              />
              <span className="text-[0.6rem] text-ink/35">
                vendidos: {stock.date === date ? stock.sold.formats[f.id] ?? 0 : "—"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold tracking-wider text-ink/35 mb-2">
          SABORES
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {flavors.map((f) => (
            <label
              key={f.id}
              className="rounded-xl border border-ink/10 p-3 flex items-center justify-between gap-3"
            >
              <span className="text-sm font-bold">{f.name}</span>
              <input
                type="number"
                min={0}
                value={flavorsState[f.id as FlavorId] ?? 0}
                onChange={(e) =>
                  setFlavorsState((s) => ({
                    ...s,
                    [f.id]: Number(e.target.value),
                  }))
                }
                className="w-20 text-right text-lg font-bold bg-transparent outline-none"
              />
            </label>
          ))}
        </div>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Nota del día…"
        className="w-full min-h-[72px] rounded-xl border border-ink/10 p-3 text-sm font-medium"
      />

      <Button
        variant="ink"
        onClick={async () => {
          await adminSetStock({
            date,
            formats: formatsState,
            flavors: flavorsState,
            note,
          });
          onChange();
        }}
      >
        Guardar stock
      </Button>
    </div>
  );
}

function MembersPanel({ members }: { members: Member[] }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Miembros del Club</h2>
      <div className="space-y-2">
        {members.length === 0 && (
          <p className="text-sm text-ink/40">Aún no hay miembros registrados.</p>
        )}
        {members.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl border border-ink/8 p-4 flex justify-between gap-3"
          >
            <div>
              <p className="font-bold">{m.name}</p>
              <p className="text-xs text-ink/40">{m.phone}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold tabular-nums">{m.ordersCount}</p>
              <p className="text-[0.6rem] text-ink/30 font-semibold">pedidos</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CampaignsPanel({
  campaigns,
  onChange,
}: {
  campaigns: Campaign[];
  onChange: () => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [channel, setChannel] =
    useState<Campaign["channel"]>("instagram");

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-lg">Campañas</h2>
      <div className="rounded-2xl border border-ink/8 p-5 space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="w-full h-11 rounded-xl border border-ink/10 px-3 text-sm font-semibold"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Copy de la campaña…"
          className="w-full min-h-[88px] rounded-xl border border-ink/10 p-3 text-sm"
        />
        <div className="flex flex-wrap gap-2">
          {(["instagram", "whatsapp", "email", "web"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setChannel(c)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold border",
                channel === c
                  ? "bg-ink text-surface border-ink"
                  : "border-ink/10",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <Button
          variant="ink"
          size="sm"
          onClick={async () => {
            if (!title || !body) return;
            await adminSaveCampaign({
              title,
              body,
              channel,
              status: "draft",
            });
            setTitle("");
            setBody("");
            onChange();
          }}
        >
          Crear campaña
        </Button>
      </div>
      <div className="space-y-2">
        {campaigns.map((c) => (
          <div key={c.id} className="rounded-2xl border border-ink/8 p-4">
            <div className="flex justify-between gap-2">
              <p className="font-bold">{c.title}</p>
              <span className="text-[0.65rem] font-bold text-ink/35 uppercase">
                {c.channel} · {c.status}
              </span>
            </div>
            <p className="text-sm text-ink/50 mt-1">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReservationsPanel({
  reservations,
  onChange,
}: {
  reservations: Reservation[];
  onChange: () => void;
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-bold text-lg">Reservas</h2>
      {reservations.length === 0 && (
        <p className="text-sm text-ink/40">No hay reservas.</p>
      )}
      {reservations.map((r) => (
        <div key={r.id} className="rounded-2xl border border-ink/8 p-4 space-y-3">
          <div className="flex justify-between gap-2">
            <div>
              <p className="font-bold">{r.name}</p>
              <p className="text-xs text-ink/40">
                {r.phone} · para {r.forDate}
              </p>
              <p className="text-xs text-ink/50 mt-1">
                {r.format.toUpperCase()} ×{r.quantity} · {r.flavors.join(", ")}
              </p>
            </div>
            <span className="text-[0.65rem] font-bold uppercase text-ink/35">
              {r.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="ink"
              onClick={async () => {
                await adminUpdateReservation(r.id, "confirmed");
                onChange();
              }}
            >
              Confirmar
            </Button>
            <Button
              size="sm"
              onClick={async () => {
                await adminFulfillReservation(r.id);
                onChange();
              }}
            >
              Convertir en pedido
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                await adminUpdateReservation(r.id, "cancelled");
                onChange();
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
