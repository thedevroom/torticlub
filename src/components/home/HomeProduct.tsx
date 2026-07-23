"use client";

import { TortillaStage } from "@/components/brand/TortillaStage";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function HomeProduct() {
  return (
    <section className="relative min-h-[100svh] flex items-center px-5 sm:px-6 md:px-10 lg:px-12 py-28 md:py-24 lg:py-0">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,210,63,0.12),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-[1400px] grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <Reveal className="order-2 lg:order-1">
          <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-5">
            Hecha al momento · Barcelona
          </p>
          <h2
            className="font-bold tracking-tighter text-ink leading-[0.92]"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
          >
            Jugosa por dentro.
            <br />
            Dorada por fuera.
          </h2>
          <p className="mt-8 max-w-md text-lg text-ink/55 font-medium leading-relaxed">
            Tortilla de 24 cm, huevos camperos y aceite de oliva. Cuatro recetas
            fijas. Sin menú infinito: solo lo que hacemos bien, cada día, en
            Barcelona.
          </p>
          <ul className="mt-6 space-y-2 text-sm md:text-base font-semibold text-ink/70">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary shrink-0" />
              Confirmación por WhatsApp en 5–10 min
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary shrink-0" />
              Envío o recogida solo en Barcelona
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary shrink-0" />
              Precios claros desde 9,90 €
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/pedir">
              <Button size="lg">Pedir la mía</Button>
            </Link>
            <Link href="/sabores">
              <Button size="lg" variant="ghost">
                Ver los 4 sabores
              </Button>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2 flex justify-center">
          <div className="relative">
            <TortillaStage mode="club" size="hero" priority />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-surface/95 border border-ink/8 shadow-soft backdrop-blur-sm">
              <span className="text-[0.65rem] uppercase tracking-[0.18em] font-bold text-ink/50">
                Club · 4 sabores · 14,90 €
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
