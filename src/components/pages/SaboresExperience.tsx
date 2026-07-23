"use client";

import { Button } from "@/components/ui/Button";
import { flavors } from "@/lib/tokens";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function SaboresExperience() {
  const [active, setActive] = useState(0);
  const current = flavors[active];

  return (
    <>
      <section className="relative min-h-[100svh] flex flex-col">
        {/* Full-bleed photo */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/92 to-surface/40 md:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/50" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-between px-5 md:px-10 pt-32 pb-12 max-w-[1400px] mx-auto w-full min-h-[100svh]">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.28em] font-semibold text-ink/40 mb-4">
              {current.number} · Sabores · 0{active + 1} / 0{flavors.length}
            </p>
            <AnimatePresence mode="wait">
              <motion.h1
                key={current.name}
                className="font-bold tracking-tighter text-ink leading-[0.9]"
                style={{ fontSize: "clamp(3rem, 10vw, 6.5rem)" }}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.name}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={current.tagline}
                className="mt-5 text-xl md:text-2xl font-semibold text-ink/55 tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {current.tagline}
              </motion.p>
            </AnimatePresence>
            <p className="mt-6 text-ink/50 font-medium leading-relaxed max-w-md">
              {current.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {current.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="rounded-full border border-ink/10 bg-surface/80 backdrop-blur px-3 py-1 text-xs font-semibold text-ink/60"
                >
                  {ing}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink/35 font-medium">
              Alérgenos: {current.allergens}
            </p>
          </div>

          <div className="mt-12">
            <div className="flex flex-wrap gap-2 mb-8">
              {flavors.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border transition-all duration-300",
                    i === active
                      ? "border-ink ring-2 ring-ink/20"
                      : "border-ink/10 hover:border-ink/25",
                  )}
                >
                  <span className="relative block w-[72px] h-[72px] md:w-20 md:h-20">
                    <Image
                      src={f.image}
                      alt={f.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </span>
                </button>
              ))}
            </div>
            <Link href="/pedir">
              <Button size="lg" variant="ink">
                Pedir {current.name}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Carta grid */}
      <section className="px-5 md:px-10 py-24 md:py-32 bg-surface">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-4">
                Nuestras recetas
              </p>
              <h2
                className="font-bold tracking-tighter text-ink"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Cinco sabores.
                <br />
                Perfectos.
              </h2>
            </div>
            <p className="text-ink/45 font-medium max-w-sm text-sm leading-relaxed">
              Carta real TortiClub. Hechas al momento. Jugosa por dentro,
              dorada por fuera.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {flavors.map((f, i) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setActive(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group text-left rounded-[1.5rem] overflow-hidden border border-ink/8 hover:border-ink/20 transition-all bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[0.65rem] font-bold tracking-[0.2em] text-ink/30">
                    {f.number}
                  </p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight">
                    {f.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink/45 font-medium">
                    {f.tagline}
                  </p>
                </div>
              </button>
            ))}

            {/* Carta full image card */}
            <Link
              href="/carta"
              className="group relative rounded-[1.5rem] overflow-hidden border border-ink/8 sm:col-span-2 lg:col-span-1 min-h-[280px] bg-primary flex flex-col justify-end p-6"
            >
              <p className="text-xs font-bold tracking-[0.2em] text-ink/50">
                CARTA
              </p>
              <p className="mt-2 font-bold text-2xl tracking-tight text-ink">
                Ver menú completo
                <br />
                y precios
              </p>
              <p className="mt-3 text-sm font-medium text-ink/55">
                SOLO · DUO · CLUB →
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-28 md:py-36">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-8">
            Filosofía
          </p>
          <h2
            className="font-bold tracking-tighter text-ink leading-[0.95]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            No lanzamos veinte sabores.
            <br />
            Lanzamos pocos. Perfectos.
          </h2>
          <p className="mt-8 text-ink/45 font-medium text-lg leading-relaxed max-w-lg mx-auto">
            Cocina para compartir. Cocina para recordar. Cada tortilla se hace
            al momento.
          </p>
        </div>
      </section>
    </>
  );
}
