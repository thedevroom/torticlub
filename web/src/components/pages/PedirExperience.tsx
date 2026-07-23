"use client";

import { submitOrder } from "@/app/actions/store";
import { FormatMark } from "@/components/brand/FormatMark";
import { TortillaStage, type TortillaMode } from "@/components/brand/TortillaStage";
import { Button } from "@/components/ui/Button";
import { HoldToConfirm } from "@/components/ui/HoldToConfirm";
import { cn } from "@/lib/cn";
import { flavors, formats, type FormatId } from "@/lib/tokens";
import { useOrderStore } from "@/stores/orderStore";
import type { OrderStep } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

const steps: OrderStep[] = [
  "format",
  "flavors",
  "quantity",
  "delivery",
  "summary",
];

const stepMeta: Record<OrderStep, { n: string; title: string; sub: string }> = {
  format: {
    n: "01",
    title: "Formato",
    sub: "¿Cuántas personas se sientan hoy?",
  },
  flavors: {
    n: "02",
    title: "Sabores",
    sub: "Empieza por tu favorito.",
  },
  quantity: {
    n: "03",
    title: "Cantidad",
    sub: "¿Cuántas tortillas?",
  },
  delivery: {
    n: "04",
    title: "Entrega",
    sub: "¿Dónde llevamos el Club?",
  },
  summary: {
    n: "05",
    title: "Listo",
    sub: "Ya hay sitio para ti.",
  },
};

const modeMap: Record<FormatId, TortillaMode> = {
  solo: "whole",
  duo: "duo",
  club: "club",
};

export function PedirExperience() {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-surface" />}>
      <PedirInner />
    </Suspense>
  );
}

function PedirInner() {
  const store = useOrderStore();
  const params = useSearchParams();
  const stepIndex = steps.indexOf(store.step);
  const meta = stepMeta[store.step];

  useEffect(() => {
    const f = params.get("formato") as FormatId | null;
    if (f && ["solo", "duo", "club"].includes(f)) {
      store.setFormat(f);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const canNext = (() => {
    if (store.step === "format") return !!store.format;
    if (store.step === "flavors")
      return store.flavors.length === store.maxFlavors();
    if (store.step === "quantity") return store.quantity >= 1;
    if (store.step === "delivery") {
      if (!store.name.trim() || !store.phone.trim()) return false;
      if (store.delivery === "delivery") return store.address.trim().length > 3;
      return true;
    }
    return true;
  })();

  const stageMode: TortillaMode = store.format
    ? modeMap[store.format]
    : "whole";

  return (
    <section className="min-h-[100svh] pt-28 pb-16 px-5 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-4">
            Pedido · {meta.n}
          </p>
          <h1
            className="font-bold tracking-tighter text-ink leading-[0.9]"
            style={{ fontSize: "clamp(2.75rem, 8vw, 5rem)" }}
          >
            {meta.title}
          </h1>
          <p className="mt-4 text-lg text-ink/45 font-medium">{meta.sub}</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-12 md:mb-16 max-w-xl">
          {steps.map((s, i) => (
            <div
              key={s}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                i <= stepIndex ? "bg-ink" : "bg-ink/10",
              )}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Visual stage — always present */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-[2rem] bg-ink/[0.03] border border-ink/[0.06] p-8 md:p-12 flex flex-col items-center">
              <TortillaStage mode={stageMode} size="lg" />
              <p className="mt-8 text-center text-xs uppercase tracking-[0.2em] font-bold text-ink/30">
                {store.format ? store.format : "elige formato"}
              </p>
              {store.flavors.length > 0 && (
                <p className="mt-2 text-center text-sm font-semibold text-ink/50">
                  {store.flavors
                    .map((id) => flavors.find((f) => f.id === id)?.name)
                    .join(" · ")}
                </p>
              )}
            </div>
          </div>

          {/* Steps */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={store.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {store.step === "format" && <StepFormat />}
                {store.step === "flavors" && <StepFlavors />}
                {store.step === "quantity" && <StepQuantity />}
                {store.step === "delivery" && <StepDelivery />}
                {store.step === "summary" && <StepSummary />}
              </motion.div>
            </AnimatePresence>

            {store.step !== "summary" && (
              <div className="mt-12 flex items-center justify-between gap-4">
                <Button
                  variant="ghost"
                  onClick={store.prevStep}
                  disabled={store.step === "format"}
                >
                  <ArrowLeft className="size-4" />
                  Atrás
                </Button>
                <Button onClick={store.nextStep} disabled={!canNext} size="lg">
                  Continuar
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepFormat() {
  const { format, setFormat } = useOrderStore();
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {formats.map((f) => {
        const active = format === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => setFormat(f.id)}
            className={cn(
              "rounded-[1.5rem] p-6 text-left border-2 transition-all duration-300",
              active
                ? "border-ink bg-ink text-surface"
                : "border-ink/8 hover:border-ink/20 bg-surface",
            )}
          >
            <FormatMark format={f.id} size={56} active />
            <p
              className={cn(
                "mt-6 text-xs font-bold tracking-[0.2em]",
                active ? "text-primary" : "text-ink/40",
              )}
            >
              {f.label}
            </p>
            <p className="mt-2 font-bold tracking-tight text-lg leading-snug">
              {f.title}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function StepFlavors() {
  const { flavors: selected, toggleFlavor, maxFlavors, format } = useOrderStore();
  const max = maxFlavors();

  return (
    <div>
      <p className="text-sm font-semibold text-ink/40 mb-6">
        Elige {max} ·{" "}
        <span className="text-ink">
          {selected.length}/{max}
        </span>
        {format && (
          <span className="ml-2 uppercase tracking-wider text-xs">
            ({format})
          </span>
        )}
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {flavors.map((f) => {
          const active = selected.includes(f.id);
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => toggleFlavor(f.id)}
              className={cn(
                "rounded-[1.5rem] p-6 text-left border-2 transition-all flex gap-4 items-start",
                active
                  ? "border-ink bg-ink text-surface"
                  : "border-ink/8 hover:border-ink/20",
              )}
            >
              <span
                className="size-5 rounded-full shrink-0 mt-0.5"
                style={{
                  backgroundColor: f.color,
                  boxShadow: active
                    ? `0 0 0 2px #111111, 0 0 0 4px ${f.color}`
                    : "0 0 0 1px rgba(17,17,17,0.12)",
                }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-lg tracking-tight">{f.name}</p>
                  {active && <Check className="size-4 text-primary" />}
                </div>
                <p
                  className={cn(
                    "text-sm mt-1 font-medium leading-snug",
                    active ? "text-surface/50" : "text-ink/45",
                  )}
                >
                  {f.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepQuantity() {
  const { quantity, setQuantity } = useOrderStore();
  return (
    <div className="flex flex-col items-center py-10">
      <div className="inline-flex items-center gap-10">
        <button
          type="button"
          onClick={() => setQuantity(quantity - 1)}
          className="size-14 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-surface transition-colors"
          aria-label="Menos"
        >
          <Minus className="size-5" />
        </button>
        <span
          className="font-bold tabular-nums tracking-tighter text-ink"
          style={{ fontSize: "clamp(4rem, 12vw, 7rem)" }}
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity(quantity + 1)}
          className="size-14 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-surface transition-colors"
          aria-label="Más"
        >
          <Plus className="size-5" />
        </button>
      </div>
      <p className="mt-6 text-ink/40 font-medium text-sm">tortillas</p>
    </div>
  );
}

function StepDelivery() {
  const s = useOrderStore();
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            { id: "pickup" as const, label: "Recogida", sub: "Barcelona" },
            { id: "delivery" as const, label: "Envío", sub: "Barcelona" },
          ]
        ).map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => s.setDelivery(d.id)}
            className={cn(
              "rounded-[1.25rem] p-5 text-left border-2 transition-all",
              s.delivery === d.id
                ? "border-ink bg-ink text-surface"
                : "border-ink/8",
            )}
          >
            <p className="font-bold text-lg">{d.label}</p>
            <p
              className={cn(
                "text-sm mt-1 font-medium",
                s.delivery === d.id ? "text-surface/50" : "text-ink/40",
              )}
            >
              {d.sub}
            </p>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <Field
          label="Nombre"
          value={s.name}
          onChange={s.setName}
          placeholder="Cómo te llamamos en el Club"
        />
        <Field
          label="Teléfono"
          value={s.phone}
          onChange={s.setPhone}
          placeholder="Para confirmar"
          type="tel"
        />
        {s.delivery === "delivery" && (
          <Field
            label="Dirección en Barcelona"
            value={s.address}
            onChange={s.setAddress}
            placeholder="Calle, número, piso…"
          />
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-ink/35">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full h-14 rounded-2xl bg-transparent border border-ink/12 px-5 text-ink placeholder:text-ink/25 font-medium focus:outline-none focus:border-ink focus:ring-0 transition-colors"
      />
    </label>
  );
}

function StepSummary() {
  const store = useOrderStore();
  const [status, setStatus] = useState<
    "idle" | "loading" | "ok" | "oos" | "error"
  >("idle");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const flavorNames = store.flavors
    .map((id) => flavors.find((f) => f.id === id)?.name)
    .filter(Boolean);

  const confirmOrder = useCallback(async () => {
    if (!store.format) {
      setErrorMsg("Elige un formato.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await submitOrder({
        format: store.format,
        flavors: store.flavors,
        quantity: store.quantity,
        delivery: store.delivery,
        name: store.name,
        phone: store.phone,
        address: store.address,
      });
      if (!res.ok) {
        if (res.code === "OUT_OF_STOCK") {
          setStatus("oos");
          return;
        }
        setErrorMsg(res.message || "No se pudo confirmar.");
        setStatus("error");
        return;
      }
      setOrderId(res.orderId);
      setStatus("ok");
    } catch (e) {
      console.error(e);
      setErrorMsg("No pudimos registrar el pedido. Inténtalo de nuevo.");
      setStatus("error");
    }
  }, [store]);

  if (status === "oos") {
    return (
      <div className="rounded-[1.75rem] bg-primary p-8 md:p-10 text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-ink/50 mb-4">
          HOY SE AGOTÓ
        </p>
        <h3
          className="font-bold tracking-tighter text-ink leading-[0.95]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
        >
          Hoy el Club se ha quedado
          <br />
          sin magia suficiente
        </h3>
        <p className="mt-4 text-ink/60 font-medium leading-relaxed max-w-md mx-auto">
          Reserva para mañana y te guardamos mesa.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/reservar">
            <Button size="lg" variant="ink">
              Reservar para mañana
            </Button>
          </Link>
          <Button size="lg" variant="ghost" onClick={() => setStatus("idle")}>
            Cambiar pedido
          </Button>
        </div>
      </div>
    );
  }

  if (status === "ok") {
    return (
      <div className="text-center py-6 px-2">
        <div className="inline-flex size-16 items-center justify-center rounded-full bg-primary mb-6">
          <Check className="size-7 text-ink" strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
          Pedido recibido
        </h3>
        {orderId && (
          <p className="mt-2 text-xs font-bold tracking-wider text-ink/35">
            Ref. {orderId}
          </p>
        )}
        <p className="mt-5 text-base md:text-lg text-ink/60 font-medium leading-relaxed max-w-md mx-auto">
          Te escribiremos por WhatsApp para confirmar tu pedido.
          <br />
          <span className="text-ink font-semibold">
            Tiempo medio de atención 5–10 minutos.
          </span>
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg" variant="ink">
              Volver al inicio
            </Button>
          </Link>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => {
              store.reset();
              setStatus("idle");
              setOrderId(null);
            }}
          >
            Nuevo pedido
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-[1.75rem] border border-ink/10 overflow-hidden">
        {[
          ["Formato", store.format?.toUpperCase() ?? "—"],
          ["Sabores", flavorNames.join(" · ") || "—"],
          ["Cantidad", String(store.quantity)],
          [
            "Entrega",
            store.delivery === "pickup"
              ? "Recogida · Barcelona"
              : `Envío · ${store.address}`,
          ],
          ["Nombre", store.name || "—"],
          ["Teléfono", store.phone || "—"],
        ].map(([k, v], i) => (
          <div
            key={k}
            className={cn(
              "flex justify-between gap-4 px-5 md:px-6 py-3.5 md:py-4 text-sm",
              i > 0 && "border-t border-ink/8",
            )}
          >
            <span className="text-ink/40 font-medium">{k}</span>
            <span className="font-bold text-right tracking-tight">{v}</span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        {status === "loading" ? (
          <div className="h-14 md:h-16 rounded-full bg-ink/10 flex items-center justify-center text-sm font-bold text-ink/40">
            Enviando pedido…
          </div>
        ) : (
          <HoldToConfirm
            label="Mantén pulsado para confirmar el pedido"
            onConfirm={confirmOrder}
            disabled={
              !store.format ||
              !store.name.trim() ||
              !store.phone.trim() ||
              store.flavors.length === 0
            }
          />
        )}
        <p className="mt-4 text-center text-sm text-ink/45 font-medium leading-relaxed max-w-sm mx-auto">
          Te escribiremos por WhatsApp para confirmar tu pedido.
          Tiempo medio de atención 5–10 minutos.
        </p>
      </div>

      {status === "error" && errorMsg && (
        <p className="mt-4 text-sm text-red-600 font-medium text-center" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="button"
        onClick={store.reset}
        className="mt-6 w-full text-center text-sm font-semibold text-ink/35 hover:text-ink transition-colors"
      >
        Empezar de nuevo
      </button>
    </div>
  );
}
