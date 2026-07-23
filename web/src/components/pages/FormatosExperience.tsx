"use client";

import { FormatMark } from "@/components/brand/FormatMark";
import { FrameSequence } from "@/components/brand/FrameSequence";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formats, type FormatId } from "@/lib/tokens";
import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function FormatosExperience() {
  const [active, setActive] = useState<FormatId>("club");
  const current = formats.find((f) => f.id === active) ?? formats[2];

  return (
    <>
      {/* Hero centered full-screen */}
      <section className="min-h-[100svh] flex flex-col items-center justify-center px-5 md:px-10 pt-28 pb-16 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-6">
            Formatos
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1
            className="font-bold tracking-tighter text-ink leading-[0.88]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)" }}
          >
            Parte.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md mx-auto text-lg text-ink/50 font-medium leading-relaxed">
            Tres formas de compartir. Un solo ritual.
            Elige cómo se sienta la mesa.
          </p>
        </Reveal>
      </section>

      {/* Centered interactive stage */}
      <section className="px-5 md:px-10 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative rounded-[2rem] md:rounded-[2.5rem] bg-[#FBF8F1] border border-ink/[0.06] overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0 items-center min-h-[70svh]">
              <div className="relative aspect-square lg:aspect-auto lg:min-h-[560px] bg-surface">
                <Image
                  key={current.image}
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-contain p-8 md:p-14"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-8 md:p-14 lg:p-16 text-left">
                <FormatMark format={current.id} size={56} active />
                <p className="mt-6 text-xs font-bold tracking-[0.22em] text-primary-deep">
                  {current.label}
                </p>
                <h2
                  className="mt-3 font-bold tracking-tighter text-ink leading-[0.95]"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  {current.title}
                </h2>
                <p className="mt-4 text-ink/50 font-medium leading-relaxed max-w-sm">
                  {current.description}
                </p>
                <p className="mt-6 text-2xl font-bold tracking-tight text-ink">
                  {current.priceLabel}
                </p>
                <div className="mt-8">
                  <Link href={`/pedir?formato=${current.id}`}>
                    <Button size="lg" variant="ink">
                      Pedir {current.label}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Format selector — centered row */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {formats.map((f) => {
              const on = active === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  className={cn(
                    "rounded-2xl border-2 p-5 text-left transition-all duration-300",
                    on
                      ? "border-ink bg-ink text-surface shadow-product"
                      : "border-ink/10 bg-surface hover:border-ink/25",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <FormatMark format={f.id} size={36} active={on} />
                    <span
                      className={cn(
                        "text-sm font-bold tabular-nums",
                        on ? "text-primary" : "text-ink/40",
                      )}
                    >
                      {f.priceLabel}
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-bold tracking-[0.18em]">
                    {f.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-snug opacity-80">
                    {f.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sequence */}
      <FrameSequence />

      {/* Packaging desire strip */}
      <section className="px-5 md:px-10 py-24 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-4">
              La experiencia
            </p>
            <h2
              className="font-bold tracking-tighter text-ink"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              No es solo una tortilla.
              <br />
              Es un ritual.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                src: "/brand/pack-box-closed.jpg",
                t: "La caja",
                d: "Cerrada con cuidado. Lista para abrir.",
              },
              {
                src: "/brand/pack-box-open.jpg",
                t: "El momento",
                d: "Se abre. Aparece. Se parte.",
              },
              {
                src: "/brand/pack-card.jpg",
                t: "El Club",
                d: "Gracias por formar parte.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={0.08 * i}>
                <article className="rounded-[1.5rem] overflow-hidden border border-ink/[0.07] bg-[#FBF8F1]">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={item.src}
                      alt={item.t}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold tracking-tight text-lg">{item.t}</h3>
                    <p className="mt-1 text-sm text-ink/50 font-medium">
                      {item.d}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
