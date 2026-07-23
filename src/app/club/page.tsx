import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ClubExperience } from "@/components/pages/ClubExperience";

export const metadata: Metadata = {
  title: "El Club",
  description:
    "Esto es más que tortillas. Esto es el Club. Tortillas para compartir en Barcelona.",
};

export default function ClubPage() {
  return (
    <PageShell headerSolid>
      <ClubExperience />
    </PageShell>
  );
}
