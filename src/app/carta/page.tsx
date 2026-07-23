import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CartaExperience } from "@/components/pages/CartaExperience";

export const metadata: Metadata = {
  title: "Carta — Nuestras recetas",
  description:
    "La Clásica, Trufada, Cebolla Caramelizada, Jamón Ibérico y Chorizo Picante. Carta TortiClub.",
};

export default function CartaPage() {
  return (
    <PageShell headerSolid>
      <CartaExperience />
    </PageShell>
  );
}
