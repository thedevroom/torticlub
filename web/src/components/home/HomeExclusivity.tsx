"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export function HomeExclusivity() {
  return (
    <section className="px-5 sm:px-6 md:px-10 lg:px-12 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-4">
            Packaging · Barcelona
          </p>
          <h2
            className="font-bold tracking-tighter text-ink"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            Llega a tu mesa.
            <br />
            Lista para abrir.
          </h2>
          <p className="mt-5 text-ink/50 font-medium max-w-md mx-auto leading-relaxed">
            Caja de marca, tortilla caliente y el ritual de partir. Pedidos con
            envío o recogida solo en Barcelona.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-4">
          <Reveal className="md:col-span-7 relative rounded-[1.75rem] md:rounded-[2rem] overflow-hidden min-h-[320px] md:min-h-[480px] border border-ink/8">
            <Image
              src="/brand/pack-box-open.jpg"
              alt="Caja TortiClub abierta — Barcelona"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
              <p className="text-xs font-bold tracking-[0.2em] text-ink/50">
                UNBOXING
              </p>
              <p className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-ink">
                El pedido llega listo para compartir
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-5 grid gap-4">
            <Reveal delay={0.08} className="relative rounded-[1.75rem] overflow-hidden min-h-[220px] border border-ink/8">
              <Image
                src="/brand/pack-box-closed.jpg"
                alt="Caja cerrada TortiClub Barcelona"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </Reveal>
            <Reveal delay={0.12} className="relative rounded-[1.75rem] overflow-hidden min-h-[220px] border border-ink/8">
              <Image
                src="/brand/pack-card.jpg"
                alt="Tarjeta de agradecimiento TortiClub"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/pedir">
            <Button size="lg" variant="ink">
              Quiero la mía hoy
            </Button>
          </Link>
          <Link href="/reservar">
            <Button size="lg" variant="ghost">
              Reservar para mañana
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
