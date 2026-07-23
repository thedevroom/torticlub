"use client";

import { Navigation } from "@/components/layout/Navigation";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Club } from "@/components/sections/Club";
import { Configurator } from "@/components/sections/Configurator";
import { FinalCta } from "@/components/sections/FinalCta";
import { Flavors } from "@/components/sections/Flavors";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Logistics } from "@/components/sections/Logistics";
import { ProductReveal } from "@/components/sections/ProductReveal";
import { Transformation } from "@/components/sections/Transformation";

export function HomeExperience() {
  return (
    <SmoothScroll>
      <Preloader />
      <Navigation />
      <main>
        <Hero />
        <ProductReveal />
        <Transformation />
        <Flavors />
        <Club />
        <Configurator />
        <Logistics />
        <FinalCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
