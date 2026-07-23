"use client";

import { Eyes } from "@/components/brand/Eyes";
import { DotDivider } from "@/components/brand/DotDivider";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { social, values } from "@/lib/tokens";
import { Heart, Users, CircleDot, MapPin, Bike, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const icons = { quality: CircleDot, people: Users, heart: Heart };

export function ClubExperience() {
  return (
    <>
      <section className="min-h-[100svh] flex flex-col justify-end px-5 md:px-10 pb-20 pt-32 relative overflow-hidden">
        <div className="pointer-events-none absolute right-[-10%] top-[20%] opacity-15">
          <Eyes size={480} followCursor />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-6">
              El Club
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              className="font-bold tracking-tighter text-ink leading-[0.88] max-w-5xl"
              style={{ fontSize: "clamp(3rem, 11vw, 7.5rem)" }}
            >
              Esto es más
              <br />
              que tortillas.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="mt-4 font-bold tracking-tighter text-ink/20 leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              Esto es el Club.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 md:px-10 py-24 md:py-32">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <p className="text-2xl md:text-4xl font-bold tracking-tight text-ink leading-snug">
              No hacemos muchas tortillas. Hacemos la tortilla perfecta para
              que la disfrutes a tu manera.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <DotDivider className="mt-12 justify-start" />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-12 text-lg text-ink/50 font-medium leading-relaxed max-w-xl">
              Hablamos como amigos. Sin rodeos. Con humor. Sin postureo.
              Cercanos, divertidos, directos y honestos. Nunca gritamos —
              por eso se nos escucha.
            </p>
          </Reveal>

          <div className="mt-20 grid sm:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = icons[v.icon];
              return (
                <Reveal key={v.id} delay={0.06 * i}>
                  <div className="rounded-3xl border border-ink/8 p-8 h-full">
                    <Icon className="size-5 text-ink mb-6" strokeWidth={2.2} />
                    <p className="font-bold tracking-tight text-lg">{v.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-5 md:px-10 py-28 md:py-36 overflow-hidden">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-6">
              Origen
            </p>
            <h2
              className="font-bold tracking-tighter text-ink leading-[0.92] max-w-3xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Desde Barcelona,
              <br />
              para toda la ciudad.
            </h2>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                icon: MapPin,
                t: "Barcelona",
                d: "Base en la ciudad. Aquí nace el Club.",
              },
              {
                icon: ShoppingBag,
                t: "Recogida",
                d: "Pide online y pasa a recoger tu pedido.",
              },
              {
                icon: Bike,
                t: "Envíos",
                d: "Llevamos TortiClub a cualquier punto de Barcelona.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={0.08 * i}>
                <div className="rounded-3xl border border-ink/8 bg-[#FBF8F1] p-8 h-full">
                  <item.icon className="size-5 text-ink mb-5" />
                  <h3 className="text-xl font-bold tracking-tight text-ink">
                    {item.t}
                  </h3>
                  <p className="mt-2 text-ink/50 font-medium leading-relaxed">
                    {item.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-12">
            <p className="text-ink/35 text-sm font-medium">
              {social.location} · {social.instagramHandle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Packaging exclusivity */}
      <section className="px-5 md:px-10 pb-28">
        <div className="mx-auto max-w-[1100px] grid md:grid-cols-2 gap-4">
          <div className="relative rounded-[2rem] overflow-hidden min-h-[320px] border border-ink/8">
            <Image
              src="/brand/pack-box-closed.jpg"
              alt="Packaging TortiClub"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="relative rounded-[2rem] overflow-hidden min-h-[320px] border border-ink/8">
            <Image
              src="/brand/pack-bag.jpg"
              alt="Bolsa TortiClub"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-28 text-center">
        <Reveal>
          <Eyes size={96} followCursor className="mx-auto" />
          <h2
            className="mt-10 font-bold tracking-tighter text-ink"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Bienvenido al Club
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/entrar">
              <Button size="lg">Entrar al Club</Button>
            </Link>
            <Link href="/pedir">
              <Button size="lg" variant="ghost">
                Hacer un pedido
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
