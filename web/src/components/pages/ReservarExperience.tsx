"use client";

import { submitReservation } from "@/app/actions/store";
import { FormatMark } from "@/components/brand/FormatMark";
import { TortillaStage } from "@/components/brand/TortillaStage";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { flavors, formats, type FlavorId, type FormatId } from "@/lib/tokens";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo, useState, useTransition } from "react";
import Link from "next/link";

export function ReservarExperience() {
  const tomorrow = useMemo(
    () => format(addDays(new Date(), 1), "yyyy-MM-dd"),
    [],
  );
  const tomorrowLabel = useMemo(
    () => format(addDays(new Date(), 1), "EEEE d MMMM", { locale: es }),
    [],
  );

  const [formatId, setFormatId] = useState<FormatId>("duo");
  const [selected, setSelected] = useState<FlavorId[]>(["clasica"]);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const max = formatId === "solo" ? 1 : formatId === "duo" ? 2 : 4;

  function toggle(f: FlavorId) {
    setSelected((prev) => {
      if (prev.includes(f)) return prev.filter((x) => x !== f);
      if (prev.length >= max) return [...prev.slice(1), f];
      return [...prev, f];
    });
  }

  function onSubmit() {
    setError(null);
    if (!name.trim() || !phone.trim()) {
      setError("Necesitamos nombre y teléfono para guardarte sitio.");
      return;
    }
    if (selected.length !== max) {
      setError(`Elige ${max} sabor${max > 1 ? "es" : ""} para ${formatId.toUpperCase()}.`);
      return;
    }
    start(async () => {
      const res = await submitReservation({
        format: formatId,
        flavors: selected,
        quantity: qty,
        name,
        phone,
        notes,
        forDate: tomorrow,
      });
      if (res.ok) setDone(res.forDate);
    });
  }

  if (done) {
    return (
      <section className="min-h-[100svh] flex flex-col items-center justify-center px-5 text-center pt-24 pb-20">
        <TortillaStage mode="whole" size="md" />
        <h1
          className="mt-10 font-bold tracking-tighter text-ink"
          style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
        >
          Ya hay sitio
          <br />
          para ti mañana
        </h1>
        <p className="mt-4 text-ink/50 font-medium max-w-md">
          Reserva confirmada para el {tomorrowLabel}. Te escribimos por WhatsApp
          para cerrar detalles.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link href="/">
            <Button size="lg">Volver al inicio</Button>
          </Link>
          <Link href="/pedir">
            <Button size="lg" variant="ghost">
              Intentar pedir hoy
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[100svh] px-5 md:px-10 pt-28 pb-20">
      <div className="mx-auto max-w-[900px]">
        <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-4">
          Reserva
        </p>
        <h1
          className="font-bold tracking-tighter text-ink leading-[0.92]"
          style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}
        >
          Mañana el Club
          <br />
          te espera
        </h1>
        <p className="mt-5 text-lg text-ink/50 font-medium max-w-lg leading-relaxed">
          Cuando hoy se agota la magia, no te quedas fuera. Reserva para{" "}
          <strong className="text-ink font-bold">{tomorrowLabel}</strong> y te
          guardamos tortilla.
        </p>

        <div className="mt-12 space-y-10">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-ink/35 mb-3">
              FORMATO
            </p>
            <div className="grid grid-cols-3 gap-2">
              {formats.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFormatId(f.id);
                    setSelected((s) => s.slice(0, f.id === "solo" ? 1 : f.id === "duo" ? 2 : 4));
                  }}
                  className={cn(
                    "rounded-2xl border-2 p-4 text-left transition-all",
                    formatId === f.id
                      ? "border-ink bg-ink text-surface"
                      : "border-ink/10",
                  )}
                >
                  <FormatMark format={f.id} size={36} active={formatId === f.id} />
                  <p className="mt-2 text-xs font-bold tracking-wider">{f.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-ink/35 mb-3">
              SABORES ({selected.length}/{max})
            </p>
            <div className="flex flex-wrap gap-2">
              {flavors.map((f) => {
                const on = selected.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggle(f.id)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-bold border transition-all",
                      on
                        ? "bg-primary border-primary text-ink"
                        : "border-ink/12 text-ink/60",
                    )}
                  >
                    {f.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-xs font-bold tracking-[0.16em] text-ink/35">
              CANTIDAD
            </p>
            <button
              type="button"
              className="size-10 rounded-full border border-ink/15 font-bold"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="text-2xl font-bold tabular-nums w-8 text-center">
              {qty}
            </span>
            <button
              type="button"
              className="size-10 rounded-full border border-ink/15 font-bold"
              onClick={() => setQty((q) => Math.min(12, q + 1))}
            >
              +
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-ink/35 font-semibold">
                Nombre
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full h-12 rounded-2xl border border-ink/12 px-4 font-medium focus:outline-none focus:border-ink"
                placeholder="Cómo te llamamos"
              />
            </label>
            <label className="block">
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-ink/35 font-semibold">
                Teléfono / WhatsApp
              </span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full h-12 rounded-2xl border border-ink/12 px-4 font-medium focus:outline-none focus:border-ink"
                placeholder="600 000 000"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-[0.65rem] uppercase tracking-[0.16em] text-ink/35 font-semibold">
              Notas
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 w-full min-h-[88px] rounded-2xl border border-ink/12 px-4 py-3 font-medium focus:outline-none focus:border-ink"
              placeholder="Alergias, hora preferida…"
            />
          </label>

          {error && (
            <p className="text-sm font-semibold text-red-600" role="alert">
              {error}
            </p>
          )}

          <Button size="lg" variant="ink" disabled={pending} onClick={onSubmit}>
            {pending ? "Guardando…" : "Reservar para mañana"}
          </Button>
        </div>
      </div>
    </section>
  );
}
