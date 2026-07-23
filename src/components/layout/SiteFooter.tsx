"use client";

import { Eyes } from "@/components/brand/Eyes";
import { social } from "@/lib/tokens";
import { motion } from "motion/react";
import Link from "next/link";

const cols = [
  {
    title: "Explorar",
    links: [
      { href: "/club", label: "El Club" },
      { href: "/formatos", label: "Formatos" },
      { href: "/sabores", label: "Sabores" },
      { href: "/carta", label: "Carta" },
      { href: "/pedir", label: "Pedir" },
      { href: "/reservar", label: "Reservar" },
    ],
  },
  {
    title: "Pedidos",
    links: [
      { href: "/pedir", label: "Pedir ahora" },
      { href: "/reservar", label: "Reservar mañana" },
      { href: "/carta", label: "Carta y precios" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-surface border-t border-ink/[0.06]">
      <div className="relative bg-primary overflow-hidden">
        <div className="absolute -left-16 -bottom-20 opacity-90 hidden md:block">
          <Eyes size={260} expression="happy" />
        </div>
        <div className="absolute right-[-8%] top-1/2 -translate-y-1/2 opacity-80">
          <Eyes size={200} className="md:hidden" />
          <Eyes size={340} className="hidden md:block" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
          <motion.p
            className="font-bold tracking-tighter text-ink leading-[0.85] max-w-3xl"
            style={{ fontSize: "clamp(2.25rem, 7vw, 5rem)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Parte.
            <br />
            Comparte.
            <br />
            Repite.
          </motion.p>
          <p className="mt-6 text-ink/55 font-medium max-w-sm text-sm md:text-base leading-relaxed">
            Tortillas hechas al momento. Solo en Barcelona.
          </p>
        </div>
      </div>

      <div className="px-2 pt-10 md:pt-14 overflow-hidden select-none" aria-hidden>
        <p
          className="font-bold lowercase tracking-tighter text-center leading-[0.78] text-primary"
          style={{
            fontSize: "clamp(4.5rem, 18vw, 14rem)",
            opacity: 0.55,
          }}
        >
          torticlub
        </p>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pb-8 md:pb-10 -mt-4 md:-mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-10 border-t border-ink/10 pt-12">
          <div className="col-span-2 md:col-span-4">
            <p className="font-bold text-xl tracking-tight lowercase text-ink">
              torticlub
            </p>
            <p className="mt-4 text-sm text-ink/45 font-medium leading-relaxed max-w-[18rem]">
              Tortillas para compartir en Barcelona. Pedido online.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-full border border-ink/12 px-4 text-xs font-bold text-ink/70 hover:bg-ink hover:text-surface transition-colors"
              >
                {social.instagramHandle}
              </a>
              {social.whatsapp ? (
                <a
                  href={social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-xs font-bold text-surface"
                >
                  WhatsApp
                </a>
              ) : null}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-ink/30 mb-4">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm font-semibold text-ink/70 hover:text-ink transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-4 md:text-right">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-ink/30 mb-4">
              Origen
            </p>
            <p className="text-sm font-semibold text-ink/70">{social.location}</p>
            <p className="mt-2 text-sm text-ink/40 font-medium leading-relaxed">
              {social.serviceArea}. Hechas al momento.
            </p>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-ink/8 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-ink/35 font-medium lowercase tracking-wide">
              parte. comparte. repite.
            </p>
            <p className="text-xs text-ink/30 font-medium">
              © {new Date().getFullYear()} TortiClub
            </p>
          </div>

          {/* Credits grid — compact, brand-aligned */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="rounded-2xl border border-ink/[0.07] bg-[#FBF8F1] px-3.5 py-3 sm:px-4 sm:py-3.5">
              <p className="text-[0.58rem] uppercase tracking-[0.18em] font-semibold text-ink/30 mb-1">
                Hecho por
              </p>
              <p className="text-xs sm:text-[0.8125rem] font-bold tracking-tight text-ink leading-snug">
                Cristian Querol
              </p>
            </div>
            <a
              href="https://github.com/thedevroom"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-ink/[0.07] bg-[#FBF8F1] px-3.5 py-3 sm:px-4 sm:py-3.5 transition-colors hover:border-ink/15 hover:bg-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <p className="text-[0.58rem] uppercase tracking-[0.18em] font-semibold text-ink/30 mb-1">
                GitHub
              </p>
              <p className="text-xs sm:text-[0.8125rem] font-bold tracking-tight text-ink leading-snug inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                thedevroom
                <span className="text-ink/30 font-semibold group-hover:text-ink/50 transition-colors">
                  ↗
                </span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
