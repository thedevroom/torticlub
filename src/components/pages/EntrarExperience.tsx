"use client";

import { Eyes } from "@/components/brand/Eyes";
import { FormatMark } from "@/components/brand/FormatMark";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { social } from "@/lib/tokens";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    title: "Pedidos prioritarios",
    body: "Tu mesa tiene sitio. Configura y confirma por WhatsApp en minutos.",
  },
  {
    title: "Combinaciones guardadas",
    body: "Recuerda tu mix favorito. Repite sin pensar dos veces.",
  },
  {
    title: "Novedades del Club",
    body: "Sabores limitados y momentos especiales, antes que nadie.",
  },
];

export function EntrarExperience() {
  return (
    <>
      <section className="min-h-[100svh] flex flex-col justify-center px-5 md:px-10 pt-28 pb-20 relative overflow-hidden">
        <div className="pointer-events-none absolute right-[-5%] top-[15%] opacity-20">
          <Eyes size={420} followCursor expression="happy" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] w-full">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-6">
              Miembros
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              className="font-bold tracking-tighter text-ink leading-[0.88] max-w-4xl"
              style={{ fontSize: "clamp(3.25rem, 12vw, 8rem)" }}
            >
              Entrar
              <br />
              al Club
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg md:text-xl text-ink/50 font-medium leading-relaxed">
              No es un login frío. Es la puerta al ritual.
              Tu espacio para pedir, repetir y pertenecer.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 flex flex-wrap gap-3">
            <Link href="/pedir">
              <Button size="lg">Hacer un pedido</Button>
            </Link>
            {social.whatsapp ? (
              <a href={social.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="ghost">
                  <MessageCircle className="size-4" />
                  WhatsApp
                </Button>
              </a>
            ) : (
              <Link href="/#faq">
                <Button size="lg" variant="ghost">
                  Ayuda
                </Button>
              </Link>
            )}
          </Reveal>
        </div>
      </section>

      {/* Member hub cards */}
      <section className="px-5 md:px-10 pb-24">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-3 gap-4">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={0.06 * i}>
              <article className="rounded-[1.75rem] border border-ink/8 p-8 md:p-10 h-full bg-surface hover:border-ink/20 transition-colors">
                <span className="text-xs font-bold tracking-[0.2em] text-ink/25">
                  0{i + 1}
                </span>
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-ink">
                  {p.title}
                </h2>
                <p className="mt-3 text-ink/45 font-medium leading-relaxed">
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="px-5 md:px-10 pb-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2
              className="font-bold tracking-tighter text-ink mb-10"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            >
              Accesos rápidos
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                href: "/pedir?formato=solo",
                label: "Pedir SOLO",
                mark: "solo" as const,
              },
              {
                href: "/pedir?formato=duo",
                label: "Pedir DUO",
                mark: "duo" as const,
              },
              {
                href: "/pedir?formato=club",
                label: "Pedir CLUB",
                mark: "club" as const,
              },
              {
                href: "/sabores",
                label: "Explorar sabores",
                mark: null,
              },
            ].map((item, i) => (
              <Reveal key={item.href} delay={0.05 * i}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-ink/8 px-6 py-6 hover:bg-ink hover:text-surface hover:border-ink transition-all duration-400"
                >
                  <div className="flex items-center gap-4">
                    {item.mark ? (
                      <FormatMark format={item.mark} size={40} active />
                    ) : (
                      <Eyes size={40} />
                    )}
                    <span className="font-bold text-lg tracking-tight">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="size-5 opacity-30 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink/40 hover:text-ink transition-colors"
            >
              <Instagram className="size-4" />
              Síguenos {social.instagramHandle}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="px-5 md:px-10 py-28 md:py-36 text-center">
        <Reveal>
          <Eyes size={80} className="mx-auto" />
          <p
            className="mt-10 font-bold tracking-tighter lowercase text-ink"
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
          >
            parte. comparte. repite.
          </p>
          <p className="mt-4 text-ink/40 font-medium">Bienvenido al Club.</p>
        </Reveal>
      </section>
    </>
  );
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
