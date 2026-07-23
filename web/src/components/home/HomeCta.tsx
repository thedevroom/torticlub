"use client";

import { Eyes } from "@/components/brand/Eyes";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function HomeCta() {
  return (
    <section className="relative px-5 sm:px-6 md:px-10 lg:px-12 pb-32 md:pb-40">
      <Reveal>
        <div className="mx-auto max-w-[1400px] relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-primary min-h-[48svh] flex items-center">
          <div className="absolute -right-16 md:right-8 top-1/2 -translate-y-1/2 opacity-90">
            <Eyes size={280} expression="happy" className="md:hidden" />
            <Eyes size={400} expression="happy" className="hidden md:block" />
          </div>

          <div className="relative z-10 p-10 sm:p-12 md:p-16 lg:p-20 max-w-xl">
            <p className="text-xs uppercase tracking-[0.28em] font-semibold text-ink/50 mb-5">
              Solo Barcelona
            </p>
            <h2
              className="font-bold tracking-tighter text-ink leading-[0.92]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              ¿Hoy toca tortilla?
            </h2>
            <p className="mt-6 text-lg text-ink/60 font-medium leading-relaxed">
              Elige formato y sabores. Confirmamos por WhatsApp en 5–10 minutos.
              Desde 9,90 €. Envío o recogida en Barcelona.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/pedir">
                <Button size="lg" variant="ink">
                  Hacer pedido
                </Button>
              </Link>
              <Link href="/carta">
                <Button
                  size="lg"
                  variant="ghost"
                  className="border-ink/20 bg-transparent hover:bg-ink/5"
                >
                  Ver precios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
