import { FrameSequence } from "@/components/brand/FrameSequence";
import { HomeCta } from "@/components/home/HomeCta";
import { HomeExclusivity } from "@/components/home/HomeExclusivity";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeFormatsTeaser } from "@/components/home/HomeFormatsTeaser";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeManifest } from "@/components/home/HomeManifest";
import { HomeProduct } from "@/components/home/HomeProduct";
import { HomeStickyCta } from "@/components/home/HomeStickyCta";
import { PageShell } from "@/components/layout/PageShell";
import { Preloader } from "@/components/layout/Preloader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TortiClub Barcelona — Tortillas para compartir | Pide a domicilio",
  description:
    "Tortillas hechas al momento en Barcelona. SOLO, DUO y CLUB desde 9,90 €. Pedido online y confirmación por WhatsApp. Solo Barcelona.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "TortiClub Barcelona — Tortillas para compartir",
    description:
      "Pide tortillas en Barcelona. Hechas al momento. Desde 9,90 €.",
    url: "https://torticlubworld.vercel.app",
  },
};

export default function HomePage() {
  return (
    <PageShell>
      <Preloader />
      <HomeHero />
      <HomeProduct />
      <FrameSequence />
      <HomeFormatsTeaser />
      <HomeExclusivity />
      <HomeManifest />
      <HomeCta />
      <HomeFaq />
      <HomeStickyCta />
    </PageShell>
  );
}
