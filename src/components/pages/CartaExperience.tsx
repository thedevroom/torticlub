"use client";

import { Eyes } from "@/components/brand/Eyes";
import { FormatMark } from "@/components/brand/FormatMark";
import { Button } from "@/components/ui/Button";
import {
  flavors,
  formatPrice,
  formats,
  pricing,
  soloPriceForFlavor,
} from "@/lib/tokens";
import Image from "next/image";
import Link from "next/link";

export function CartaExperience() {
  return (
    <div className="bg-surface min-h-[100svh]">
      <header className="px-5 md:px-10 pt-28 pb-14">
        <div className="mx-auto max-w-[1200px] text-center">
          <Eyes size={48} className="mx-auto" />
          <p className="mt-5 font-bold lowercase tracking-tight text-lg">
            torticlub
          </p>
          <h1
            className="mt-4 font-bold tracking-tighter text-ink leading-[0.9]"
            style={{ fontSize: "clamp(2.75rem, 9vw, 5rem)" }}
          >
            Nuestras recetas
          </h1>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] font-semibold text-ink/40">
            Parte. Comparte. Repite.
          </p>
          <p className="mt-6 max-w-md mx-auto text-ink/50 font-medium leading-relaxed">
            Hechas al momento. Jugosa por dentro, dorada por fuera.
            Para compartir — o no.
          </p>
        </div>
      </header>

      {/* Price table formats */}
      <section className="px-5 md:px-10 pb-12">
        <div className="mx-auto max-w-[1200px] grid sm:grid-cols-3 gap-3">
          {formats.map((f) => (
            <div
              key={f.id}
              className="rounded-3xl border border-ink/8 bg-[#FBF8F1] p-6 md:p-8 text-center"
            >
              <span className="inline-flex justify-center w-full">
                <FormatMark format={f.id} size={48} active />
              </span>
              <p className="mt-4 text-xs font-bold tracking-[0.22em]">{f.label}</p>
              <p className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
                {f.priceLabel}
              </p>
              <p className="mt-2 text-sm text-ink/45 font-medium">{f.title}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-ink/40 font-medium max-w-lg mx-auto">
          SOLO Clásica {formatPrice(pricing.soloClasica)} · SOLO especial{" "}
          {formatPrice(pricing.soloEspecial)} · SOLO Jamón Ibérico{" "}
          {formatPrice(pricing.soloJamon)}
        </p>
      </section>

      {/* Visual recipe cards */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 py-8 md:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {flavors.map((f, i) => {
            const soloP = soloPriceForFlavor(f.id);
            return (
              <article
                key={f.id}
                className="group rounded-[1.75rem] overflow-hidden border border-ink/[0.07] bg-[#FBF8F1] flex flex-col"
              >
                <div className="relative aspect-[5/4] bg-surface">
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    className="object-contain p-5 group-hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={i < 3}
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-surface/95 border border-ink/8 px-2.5 py-1 text-[0.65rem] font-bold tracking-wider text-ink/50">
                    {f.number}
                  </span>
                  <span className="absolute top-4 right-4 rounded-full bg-ink text-surface px-3 py-1 text-xs font-bold">
                    SOLO {formatPrice(soloP)}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold tracking-tight">{f.name}</h2>
                  <p className="mt-1 text-sm text-ink/45 font-medium italic">
                    {f.tagline}
                  </p>
                  <p className="mt-3 text-sm text-ink/55 font-medium leading-relaxed flex-1">
                    {f.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {f.ingredients.slice(0, 4).map((ing) => (
                      <span
                        key={ing}
                        className="rounded-full border border-ink/8 px-2.5 py-0.5 text-[0.65rem] font-semibold text-ink/45"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-[0.7rem] text-ink/35 font-medium">
                    Alérgenos: {f.allergens}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Packaging desire + notes */}
        <div className="mt-16 grid md:grid-cols-2 gap-4">
          <div className="relative rounded-[1.75rem] overflow-hidden min-h-[280px] border border-ink/8">
            <Image
              src="/brand/pack-box-open.jpg"
              alt="Unboxing TortiClub"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-bold tracking-[0.18em] text-ink/50">
                EXPERIENCIA
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-ink">
                Llega. Se abre. Se comparte.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-ink/8 p-6 bg-[#FBF8F1]">
              <p className="text-xs font-bold tracking-[0.16em] text-ink/35 mb-2">
                HECHAS AL MOMENTO
              </p>
              <p className="text-sm font-medium text-ink/60 leading-relaxed">
                Cada tortilla es única. Jugosa por dentro, dorada por fuera.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-ink/8 p-6 bg-[#FBF8F1]">
              <p className="text-xs font-bold tracking-[0.16em] text-ink/35 mb-2">
                CONSERVACIÓN
              </p>
              <p className="text-sm font-medium text-ink/60 leading-relaxed">
                Entre 2°C y 4°C. Consumir en menos de 24 horas.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-primary p-6">
              <p className="text-xs font-bold tracking-[0.16em] text-ink/50 mb-2">
                ESTÁNDAR
              </p>
              <p className="text-sm font-semibold text-ink leading-relaxed">
                La tortilla perfecta. Ese es nuestro compromiso.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-3 justify-center">
          <Link href="/pedir">
            <Button size="lg" variant="ink">
              Pedir ahora
            </Button>
          </Link>
          <Link href="/reservar">
            <Button size="lg" variant="ghost">
              Reservar mañana
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
