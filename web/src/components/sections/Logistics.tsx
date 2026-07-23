"use client";

import { DotDivider } from "@/components/brand/DotDivider";
import { Eyes } from "@/components/brand/Eyes";
import { social } from "@/lib/tokens";
import { motion } from "motion/react";
import { MapPin, ShoppingBag, Bike } from "lucide-react";

const items = [
  {
    icon: MapPin,
    title: "Barcelona",
    body: "Operamos exclusivamente en la ciudad.",
  },
  {
    icon: ShoppingBag,
    title: "Recogida en Barcelona",
    body: "Pide online y pasa a recoger tu pedido.",
  },
  {
    icon: Bike,
    title: "Envíos a toda Barcelona",
    body: "Llevamos TortiClub a cualquier punto de la ciudad.",
  },
];

export function Logistics() {
  return (
    <section
      className="py-24 md:py-32 px-5"
      aria-labelledby="logistics-heading"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-primary-deep mb-3">
            Dónde estamos
          </p>
          <h2
            id="logistics-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight text-ink"
          >
            Del barrio a tu mesa
          </h2>
          <DotDivider className="mt-8" />
        </div>

        <div className="space-y-0">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="flex gap-5 py-8 border-t border-ink/8 last:border-b"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="size-14 shrink-0 rounded-full bg-primary flex items-center justify-center">
                  <Icon className="size-5 text-ink" strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="font-bold text-lg tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-ink/55 font-medium">{item.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-ink/8 bg-surface p-5 flex items-center gap-4 justify-center">
          <Eyes size={40} />
          <div className="text-left">
            <p className="text-sm font-bold tracking-tight text-ink">
              Parte. Comparte. Repite.
            </p>
            <p className="text-xs text-ink/50 font-medium">
              Bienvenido al Club. · {social.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
