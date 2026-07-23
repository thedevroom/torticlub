"use client";

import { DotDivider } from "@/components/brand/DotDivider";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export function ProductReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.7], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 px-5 overflow-hidden"
      aria-labelledby="product-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-primary-deep mb-4">
            El producto
          </p>
          <h2
            id="product-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight text-ink leading-tight"
          >
            No es un plato.
            <br />
            Es un objeto de deseo.
          </h2>
          <DotDivider className="mt-8" />
          <p className="mt-8 max-w-lg mx-auto text-ink/60 font-medium leading-relaxed">
            Cada tortilla se prepara para compartir. Textura, punto y porciones
            pensadas como un ritual — no como un menú.
          </p>
        </div>

        <motion.div
          style={{ y, opacity, scale }}
          className="relative mx-auto max-w-2xl"
        >
          <div className="relative aspect-square md:aspect-[5/4] rounded-[2rem] overflow-hidden bg-surface shadow-product">
            <Image
              src="/brand/poster.png"
              alt="Tortilla TortiClub multiporción sobre tabla de madera"
              fill
              className="object-cover object-bottom"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
            {/* Soft vignette to blend crop */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-surface/20 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
