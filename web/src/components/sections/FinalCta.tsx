"use client";

import { Eyes } from "@/components/brand/Eyes";
import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";
import { useState } from "react";

export function FinalCta() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="py-24 md:py-36 px-5"
      aria-labelledby="final-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          className="relative mx-auto w-full max-w-sm aspect-[4/3] mb-12 cursor-pointer"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Abrir la caja del Club"
        >
          {/* Box */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-[#EFE9DC] border border-ink/10 shadow-product flex flex-col items-center justify-center"
            animate={open ? { rotateX: -18, y: 20 } : { rotateX: 0, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 800 }}
          >
            <p className="text-xl font-bold tracking-tight text-ink lowercase">
              torticlub
            </p>
            <Eyes size={36} className="mt-2" />
            {!open && (
              <p className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-ink/40 font-semibold">
                toca para abrir
              </p>
            )}
          </motion.div>

          {/* Lid open content */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-surface border border-ink/8 flex flex-col items-center justify-center"
            initial={false}
            animate={
              open
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.96, y: 12 }
            }
            transition={{ duration: 0.5, delay: open ? 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
            style={{ pointerEvents: open ? "auto" : "none" }}
          >
            <Eyes size={64} expression="happy" />
            <p className="mt-5 text-sm font-medium text-ink/50 lowercase tracking-wide">
              bienvenido al club.
            </p>
          </motion.div>
        </motion.div>

        <h2
          id="final-heading"
          className="text-3xl md:text-5xl font-bold tracking-tight text-ink"
        >
          El Club te está esperando
        </h2>
        <p className="mt-4 text-ink/55 font-medium max-w-md mx-auto">
          Tu primera tortilla. Tu primera mesa. Tu primera vez en el Club.
        </p>

        <div className="mt-10">
          <Button
            size="lg"
            onClick={() =>
              document.querySelector("#pedir")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Hacer mi primer pedido
          </Button>
        </div>
      </div>
    </section>
  );
}
