import type { MetadataRoute } from "next";

const base = "https://torticlubworld.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/pedir", priority: 0.95, changeFrequency: "weekly" },
    { path: "/carta", priority: 0.9, changeFrequency: "weekly" },
    { path: "/formatos", priority: 0.85, changeFrequency: "monthly" },
    { path: "/sabores", priority: 0.85, changeFrequency: "monthly" },
    { path: "/reservar", priority: 0.8, changeFrequency: "weekly" },
    { path: "/club", priority: 0.7, changeFrequency: "monthly" },
    { path: "/entrar", priority: 0.6, changeFrequency: "monthly" },
  ];
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
