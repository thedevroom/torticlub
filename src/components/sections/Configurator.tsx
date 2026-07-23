"use client";

import { DotDivider } from "@/components/brand/DotDivider";
import { FormatMark } from "@/components/brand/FormatMark";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { flavors, formats, social, type FormatId } from "@/lib/tokens";
import { useOrderStore } from "@/stores/orderStore";
import type { OrderStep } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ArrowRight, ArrowLeft, MessageCircle } from "lucide-react";

const stepLabels: Record<OrderStep, string> = {
  format: "Formato",
  flavors: "Sabores",
  quantity: "Cantidad",
  delivery: "Entrega",
  summary: "Resumen",
};

const steps: OrderStep[] = ["format", "flavors", "quantity", "delivery", "summary"];

export function Configurator() {
  const store = useOrderStore();
  const stepIndex = steps.indexOf(store.step);

  const canNext = (() => {
    if (store.step === "format") return !!store.format;
    if (store.step === "flavors")
      return store.flavors.length === store.maxFlavors();
    if (store.step === "quantity") return store.quantity >= 1;
    if (store.step === "delivery") {
      if (store.delivery === "delivery") return store.address.trim().length > 3;
      return true;
    }
    return true;
  })();

  const waMessage = buildWhatsAppMessage(store);

  return (
    <section
      id="pedir"
      className="py-24 md:py-36 px-5 bg-ink text-surface"
      aria-labelledby="order-heading"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-primary mb-3">
            Repite.
          </p>
          <h2
            id="order-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Configura tu tortilla
          </h2>
          <p className="mt-4 text-surface/55 font-medium max-w-md mx-auto">
            Como un configurador premium. No como una carta.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => i <= stepIndex && store.setStep(s)}
                    className={cn(
                      "size-2 rounded-full transition-all",
                      i === stepIndex
                        ? "bg-primary w-6"
                        : i < stepIndex
                          ? "bg-surface/50"
                          : "bg-surface/20",
                    )}
                    aria-label={stepLabels[s]}
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-surface/40 font-medium">
            {stepLabels[store.step]}
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-surface/10 bg-surface/[0.04] p-6 md:p-10 min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={store.step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {store.step === "format" && <StepFormat />}
              {store.step === "flavors" && <StepFlavors />}
              {store.step === "quantity" && <StepQuantity />}
              {store.step === "delivery" && <StepDelivery />}
              {store.step === "summary" && <StepSummary message={waMessage} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {store.step !== "summary" && (
          <div className="mt-8 flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="md"
              className="border-surface/15 text-surface hover:bg-surface/5"
              onClick={store.prevStep}
              disabled={store.step === "format"}
            >
              <ArrowLeft className="size-4" />
              Atrás
            </Button>
            <Button
              size="md"
              onClick={store.nextStep}
              disabled={!canNext}
            >
              Continuar
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function StepFormat() {
  const { format, setFormat } = useOrderStore();
  return (
    <div>
      <h3 className="text-xl font-bold tracking-tight mb-2">Elige formato</h3>
      <p className="text-surface/50 text-sm font-medium mb-8">
        ¿Cuántas personas se sientan hoy?
      </p>
      <div className="grid sm:grid-cols-3 gap-3">
        {formats.map((f) => {
          const active = format === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFormat(f.id as FormatId)}
              className={cn(
                "rounded-2xl p-5 text-left border transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                active
                  ? "border-primary bg-primary/10"
                  : "border-surface/10 hover:border-surface/25",
              )}
            >
              <FormatMark format={f.id} size={48} active={active} />
              <p className="mt-4 font-bold tracking-[0.12em] text-sm">{f.label}</p>
              <p className="mt-1 text-xs text-surface/50 font-medium leading-snug">
                {f.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepFlavors() {
  const { flavors: selected, toggleFlavor, maxFlavors, format } = useOrderStore();
  const max = maxFlavors();

  return (
    <div>
      <h3 className="text-xl font-bold tracking-tight mb-2">
        Empieza por tu favorito
      </h3>
      <p className="text-surface/50 text-sm font-medium mb-8">
        Elige {max} sabor{max > 1 ? "es" : ""} para tu {format?.toUpperCase()}.
        {" "}
        <span className="text-primary">
          {selected.length}/{max}
        </span>
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
                "rounded-2xl p-4 text-left border transition-all flex items-start gap-3",
                active
                  ? "border-primary bg-primary/10"
                  : "border-surface/10 hover:border-surface/25",
              )}
            >
              <span
                className="size-4 rounded-full mt-0.5 shrink-0 ring-2 ring-offset-2 ring-offset-ink"
                style={{
                  backgroundColor: f.color,
                  boxShadow: active
                    ? "0 0 0 2px #111111, 0 0 0 4px #FFD23F"
                    : undefined,
                }}
              />
              <div>
                <p className="font-bold">{f.name}</p>
                <p className="text-xs text-surface/50 mt-0.5 font-medium">
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
    <div className="text-center py-6">
      <h3 className="text-xl font-bold tracking-tight mb-2">
        ¿Cuántas se sientan hoy?
      </h3>
      <p className="text-surface/50 text-sm font-medium mb-10">
        Número de tortillas
      </p>
      <div className="inline-flex items-center gap-6">
        <button
          type="button"
          onClick={() => setQuantity(quantity - 1)}
          className="size-12 rounded-full border border-surface/15 flex items-center justify-center hover:bg-surface/5"
          aria-label="Menos"
        >
          <Minus className="size-4" />
        </button>
        <span className="text-6xl font-bold tabular-nums w-20">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity(quantity + 1)}
          className="size-12 rounded-full border border-surface/15 flex items-center justify-center hover:bg-surface/5"
          aria-label="Más"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}

function StepDelivery() {
  const {
    delivery,
    setDelivery,
    name,
    setName,
    phone,
    setPhone,
    address,
    setAddress,
  } = useOrderStore();

  return (
    <div>
      <h3 className="text-xl font-bold tracking-tight mb-2">¿Dónde llevamos el Club?</h3>
      <p className="text-surface/50 text-sm font-medium mb-8">
        Recogida o envío en Barcelona.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {(
          [
            { id: "pickup" as const, label: "Recogida", sub: "Barcelona" },
            { id: "delivery" as const, label: "Envío", sub: "Barcelona" },
          ]
        ).map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setDelivery(d.id)}
            className={cn(
              "rounded-2xl p-4 text-left border transition-all",
              delivery === d.id
                ? "border-primary bg-primary/10"
                : "border-surface/10",
            )}
          >
            <p className="font-bold">{d.label}</p>
            <p className="text-xs text-surface/50 mt-0.5">{d.sub}</p>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <Field
          label="Nombre"
          value={name}
          onChange={setName}
          placeholder="Cómo te llamamos"
        />
        <Field
          label="Teléfono"
          value={phone}
          onChange={setPhone}
          placeholder="Para confirmar el pedido"
          type="tel"
        />
        {delivery === "delivery" && (
          <Field
            label="Dirección"
            value={address}
            onChange={setAddress}
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
      <span className="text-xs uppercase tracking-[0.14em] text-surface/40 font-semibold">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full h-12 rounded-xl bg-surface/5 border border-surface/10 px-4 text-surface placeholder:text-surface/30 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </label>
  );
}

function StepSummary({ message }: { message: string }) {
  const store = useOrderStore();
  const flavorNames = store.flavors
    .map((id) => flavors.find((f) => f.id === id)?.name)
    .filter(Boolean);

  return (
    <div className="text-center">
      <div className="inline-flex mb-6">
        {store.format && <FormatMark format={store.format} size={72} active />}
      </div>
      <h3 className="text-2xl font-bold tracking-tight mb-2">
        Ya hay sitio para ti
      </h3>
      <p className="text-surface/50 text-sm font-medium mb-8">
        Revisa tu pedido y envíalo por WhatsApp.
      </p>

      <div className="rounded-2xl border border-surface/10 bg-surface/[0.03] p-6 text-left space-y-3 mb-8">
        <Row label="Formato" value={store.format?.toUpperCase() ?? "—"} />
        <Row label="Sabores" value={flavorNames.join(" · ") || "—"} />
        <Row label="Cantidad" value={String(store.quantity)} />
        <Row
          label="Entrega"
          value={
            store.delivery === "pickup"
              ? "Recogida · Barcelona"
              : `Envío · ${store.address || "Barcelona"}`
          }
        />
        {store.name && <Row label="Nombre" value={store.name} />}
      </div>

      {social.whatsapp ? (
        <a
          href={`${social.whatsapp}${social.whatsapp.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <Button size="lg" className="gap-2">
            <MessageCircle className="size-5" />
            Enviar pedido por WhatsApp
          </Button>
        </a>
      ) : (
        <p className="text-sm text-surface/50 font-medium">
          Usa el flujo de pedido en la web para confirmar.
        </p>
      )}

      <div className="mt-6">
        <DotDivider className="opacity-40 mb-4" />
        <button
          type="button"
          onClick={store.reset}
          className="text-sm text-surface/40 hover:text-surface/70 font-medium"
        >
          Empezar de nuevo
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-surface/40 font-medium">{label}</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}

function buildWhatsAppMessage(store: ReturnType<typeof useOrderStore.getState>) {
  const flavorNames = store.flavors
    .map((id) => flavors.find((f) => f.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  return [
    "Hola TortiClub 👋",
    "Quiero hacer un pedido:",
    "",
    `• Formato: ${store.format?.toUpperCase() ?? "—"}`,
    `• Sabores: ${flavorNames || "—"}`,
    `• Cantidad: ${store.quantity}`,
    `• Entrega: ${store.delivery === "pickup" ? "Recogida Barcelona" : `Envío — ${store.address}`}`,
    store.name ? `• Nombre: ${store.name}` : null,
    store.phone ? `• Tel: ${store.phone}` : null,
    "",
    "Parte. Comparte. Repite.",
  ]
    .filter(Boolean)
    .join("\n");
}
