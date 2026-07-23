"use client";

import { FormatMark } from "@/components/brand/FormatMark";
import { formats } from "@/lib/tokens";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import Link from "next/link";

/**
 * Formatos — diseño de producto + precios claros para convertir.
 */
export function HomeFormatsTeaser() {
  return (
    <section className="relative bg-surface py-24 md:py-32">
      <div className="px-5 sm:px-6 md:px-10 lg:px-12 max-w-[1400px] mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-4">
            Elige y pide
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-14 md:mb-20">
            <h2
              className="font-bold tracking-tighter text-ink leading-[0.9] max-w-2xl"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              Tres formatos.
              <br />
              Un solo ritual.
            </h2>
            <p className="text-ink/50 font-medium max-w-xs leading-relaxed">
              Para uno, para dos o para la mesa. Solo en Barcelona.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {formats.map((f, i) => (
            <Reveal key={f.id} delay={0.06 * i}>
              <Link href="/pedir" className="group block h-full">
                <article className="h-full rounded-[1.75rem] md:rounded-[2rem] border border-ink/[0.08] bg-[#FBF8F1] overflow-hidden shadow-soft hover:shadow-product hover:border-primary/50 transition-all duration-500">
                  <div className="relative aspect-[4/5] bg-surface">
                    <Image
                      src={f.image}
                      alt={`${f.label} — tortilla TortiClub Barcelona`}
                      fill
                      className="object-contain p-6 md:p-8 group-hover:scale-[1.04] transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={i === 0}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-surface/95 backdrop-blur border border-ink/8 px-3 py-1.5">
                        <FormatMark format={f.id} size={20} active />
                        <span className="text-[0.65rem] font-bold tracking-[0.18em]">
                          {f.label}
                        </span>
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="rounded-full bg-primary text-ink px-3 py-1.5 text-[0.7rem] font-bold shadow-soft">
                        {f.priceLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="font-bold tracking-tight text-ink text-xl md:text-2xl leading-snug">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink/50 font-medium leading-relaxed">
                      {f.description}
                    </p>
                    <p className="mt-4 text-xs font-bold tracking-[0.14em] uppercase text-ink/40 group-hover:text-ink transition-colors">
                      Pedir {f.label} →
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/pedir">
            <Button size="lg" variant="ink">
              Configurar mi pedido
            </Button>
          </Link>
          <Link href="/formatos">
            <Button size="lg" variant="ghost">
              Ver formatos
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
