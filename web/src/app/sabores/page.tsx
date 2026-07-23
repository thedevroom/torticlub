import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SaboresExperience } from "@/components/pages/SaboresExperience";

export const metadata: Metadata = {
  title: "Sabores",
  description:
    "Pocos sabores. Perfectos. Clásica, Cebolla, Chistorra y Trufa. TortiClub Barcelona.",
};

export default function SaboresPage() {
  return (
    <PageShell headerSolid>
      <SaboresExperience />
    </PageShell>
  );
}
