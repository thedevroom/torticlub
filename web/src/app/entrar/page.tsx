import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { EntrarExperience } from "@/components/pages/EntrarExperience";

export const metadata: Metadata = {
  title: "Entrar al Club",
  description:
    "Tu espacio en TortiClub. Pedidos, combinaciones y el ritual de compartir.",
};

export default function EntrarPage() {
  return (
    <PageShell headerSolid>
      <EntrarExperience />
    </PageShell>
  );
}
