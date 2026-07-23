"use client";

import { Eyes } from "@/components/brand/Eyes";
import { Logo } from "@/components/brand/Logo";
import { Mantra } from "@/components/brand/Mantra";
import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-5 overflow-hidden"
    >
      {/* Soft ambient eyes watermark */}
      <div className="pointer-events-none absolute -right-[20%] top-1/2 -translate-y-1/2 opacity-[0.12] md:opacity-[0.18]">
        <Eyes size={520} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo size="lg" eyesFollow showTagline={false} />
        </motion.div>

        <motion.div
          className="mt-10 md:mt-14"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Mantra stacked size="display" case="upper" />
        </motion.div>

        <motion.p
          className="mt-8 max-w-md text-base md:text-lg font-medium text-ink/65 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.95, ease: [0.22, 1, 0.36, 1] }}
        >
          Tortillas para compartir.
          <br />
          No es un restaurante. Es el Club.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            size="lg"
            onClick={() =>
              document.querySelector("#pedir")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Entrar al Club
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() =>
              document.querySelector("#formatos")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Descubrir
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink/40 font-medium">
          scroll
        </span>
        <motion.span
          className="block w-px h-8 bg-ink/25 origin-top"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
