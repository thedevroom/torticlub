"use client";

import { Eyes } from "@/components/brand/Eyes";
import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end md:justify-center px-5 sm:px-6 md:px-10 lg:px-12 pb-28 md:pb-12 pt-32 md:pt-28 overflow-hidden">
      {/* Giant ambient eyes */}
      <div className="pointer-events-none absolute right-[-18%] md:right-[-8%] top-1/2 -translate-y-1/2 opacity-[0.14]">
        <Eyes size={680} followCursor />
      </div>

      {/* Sales badge */}
      <motion.div
        className="absolute top-24 md:top-28 left-5 md:left-10 z-10"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1.5 text-[0.65rem] md:text-xs font-bold tracking-[0.12em] uppercase text-ink shadow-soft">
          Solo Barcelona · Desde 9,90 €
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <motion.p
          className="text-xs md:text-sm uppercase tracking-[0.28em] font-semibold text-ink/40 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Tortillas a domicilio · Barcelona
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            className="font-bold tracking-tighter text-ink leading-[0.88]"
            style={{ fontSize: "clamp(3.5rem, 14vw, 9.5rem)" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1.05, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            PARTE.
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-bold tracking-tighter text-ink leading-[0.88]"
            style={{ fontSize: "clamp(3.5rem, 14vw, 9.5rem)" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            COMPARTE.
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-bold tracking-tighter text-ink leading-[0.88]"
            style={{ fontSize: "clamp(3.5rem, 14vw, 9.5rem)" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            REPITE.
          </motion.h1>
        </div>

        <motion.div
          className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-end gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-md text-base md:text-lg text-ink/55 font-medium leading-relaxed">
            Tortillas hechas al momento en Barcelona.
            <br />
            SOLO, DUO o CLUB. Confirmación por WhatsApp.
            <br />
            <span className="text-ink font-semibold">Solo repartimos en Barcelona.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/pedir">
              <Button size="lg">Pedir ahora</Button>
            </Link>
            <Link href="/carta">
              <Button size="lg" variant="ghost">
                Ver carta y precios
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Quick price strip — sells without looking like a startup pitch */}
        <motion.div
          className="mt-10 md:mt-14 flex flex-wrap gap-2 md:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.75, duration: 0.5 }}
        >
          {[
            { label: "SOLO", price: "desde 9,90 €" },
            { label: "DUO", price: "12,90 €" },
            { label: "CLUB", price: "14,90 €" },
          ].map((item) => (
            <Link
              key={item.label}
              href="/pedir"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface/90 backdrop-blur px-4 py-2 shadow-soft hover:border-ink/25 hover:bg-primary/40 transition-colors"
            >
              <span className="text-[0.65rem] font-bold tracking-[0.16em] text-ink">
                {item.label}
              </span>
              <span className="text-xs font-semibold text-ink/50">{item.price}</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
