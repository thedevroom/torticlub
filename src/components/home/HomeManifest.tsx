"use client";

import { Eyes } from "@/components/brand/Eyes";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function HomeManifest() {
  return (
    <section className="relative min-h-[80svh] flex items-center px-5 md:px-10 py-24 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,210,63,0.1),transparent_60%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.1]">
        <Eyes size={520} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[900px] text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-8">
            Barcelona
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="font-bold tracking-tighter text-ink leading-[0.95]"
            style={{ fontSize: "clamp(2.25rem, 6.5vw, 4.5rem)" }}
          >
            No hacemos de todo.
            <br />
            Hacemos tortilla.
            <br />
            Y la hacemos bien.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 text-lg md:text-xl font-medium text-ink/50 tracking-tight max-w-lg mx-auto leading-relaxed">
            Cuatro sabores. Tres formatos. Pedido online.
            Confirmación por WhatsApp. Solo Barcelona.
          </p>
        </Reveal>
        <Reveal delay={0.18} className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/pedir">
            <Button size="lg" variant="ink">
              Pedir ahora
            </Button>
          </Link>
          <Link href="/club">
            <Button size="lg" variant="ghost">
              Cómo funciona
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
