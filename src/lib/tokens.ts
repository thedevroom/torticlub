/**
 * Brand tokens, catalog and public copy.
 * Keep product data here so UI components stay presentational.
 */

export const colors = {
  surface: "#F7F3E8",
  surfaceElevated: "#FFFFFF",
  ink: "#111111",
  inkMuted: "rgba(17, 17, 17, 0.64)",
  primary: "#FFD23F",
  primaryDeep: "#F5C400",
  border: "rgba(17, 17, 17, 0.12)",
} as const;

export const ease = {
  brand: [0.22, 1, 0.36, 1] as const,
};

export const duration = {
  fast: 0.16,
  normal: 0.28,
  slow: 0.48,
  extraSlow: 0.8,
} as const;

export const formats = [
  {
    id: "solo" as const,
    label: "SOLO",
    title: "una tortilla, un sabor",
    description: "Para ti. Sin compartir. Esta vez.",
    image: "/brand/product-solo.png",
    priceFrom: 9.9,
    priceLabel: "desde 9,90 €",
  },
  {
    id: "duo" as const,
    label: "DUO",
    title: "dos mitades, dos sabores",
    description: "La conversación empieza aquí.",
    image: "/brand/product-duo.png",
    priceFrom: 12.9,
    priceLabel: "12,90 €",
  },
  {
    id: "club" as const,
    label: "CLUB",
    title: "cuatro cuartos, cuatro sabores",
    description: "La mesa completa. El ritual completo.",
    image: "/brand/product-club.png",
    priceFrom: 14.9,
    priceLabel: "14,90 €",
  },
];

export const pricing = {
  soloClasica: 9.9,
  soloEspecial: 11.9,
  soloJamon: 12.9,
  duo: 12.9,
  club: 14.9,
} as const;

export function formatPrice(n: number) {
  return n.toFixed(2).replace(".", ",") + " €";
}

export function soloPriceForFlavor(flavorId: string) {
  if (flavorId === "clasica") return pricing.soloClasica;
  if (flavorId === "jamon") return pricing.soloJamon;
  return pricing.soloEspecial;
}

/** 4 sabores activos */
export const flavors = [
  {
    id: "clasica",
    number: "Nº1",
    name: "La Clásica",
    tagline: "Nuestra receta original. La que empezó todo.",
    description:
      "Huevos camperos, patata, cebolla y AOVE. El origen del Club.",
    ingredients: ["Huevos camperos", "Patata", "Cebolla", "AOVE", "Sal"],
    allergens: "Huevo.",
    color: "#E8C547",
    image: "/brand/sabor-clasica.png",
  },
  {
    id: "chorizo",
    number: "Nº2",
    name: "Chorizo Picante",
    tagline: "Para los que disfrutan con intensidad.",
    description: "Chorizo picante. Para quien no pide permiso.",
    ingredients: [
      "Huevos camperos",
      "Patata",
      "Cebolla",
      "Chorizo picante",
      "AOVE",
      "Sal",
    ],
    allergens: "Huevo. Puede contener trazas de cerdo.",
    color: "#B33A2B",
    image: "/brand/sabor-chorizo.png",
  },
  {
    id: "cebolla",
    number: "Nº3",
    name: "Cebolla Caramelizada",
    tagline: "Dulce por fuera, jugosa por dentro.",
    description: "Cebolla caramelizada al punto. Imposible a medias.",
    ingredients: [
      "Huevos camperos",
      "Patata",
      "Cebolla caramelizada",
      "AOVE",
      "Sal",
    ],
    allergens: "Huevo.",
    color: "#D4A574",
    image: "/brand/sabor-cebolla.png",
  },
  {
    id: "jamon",
    number: "Nº4",
    name: "Jamón Ibérico",
    tagline: "El toque ibérico que la hace única.",
    description: "Jamón ibérico integrado en la masa. Pura pertenencia.",
    ingredients: [
      "Huevos camperos",
      "Patata",
      "Cebolla",
      "Jamón ibérico",
      "AOVE",
      "Sal",
    ],
    allergens: "Huevo. Puede contener trazas de cerdo.",
    color: "#C45C3E",
    image: "/brand/sabor-jamon.png",
  },
];

export const values = [
  { id: "calidad", label: "Ingredientes de calidad", icon: "quality" as const },
  { id: "dia", label: "Hechas cada día", icon: "people" as const },
  { id: "compartir", label: "Para compartir", icon: "heart" as const },
];

/**
 * Public contact and location — no private numbers in the client bundle.
 * Optional WhatsApp deep-link: set NEXT_PUBLIC_WHATSAPP_URL in the environment.
 */
export const social = {
  instagram: "https://instagram.com/torticlub",
  instagramHandle: "@torticlub",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
  location: "Barcelona",
  city: "Barcelona",
  serviceArea: "Solo Barcelona",
};

export const faqItems = [
  {
    q: "¿Cómo hago un pedido en Barcelona?",
    a: "Entra en Pedir, elige formato y sabores, deja tus datos y mantén pulsado «Confirmar pedido». Te confirmamos el pedido en 5–10 minutos.",
  },
  {
    q: "¿Cuánto tarda la confirmación?",
    a: "5–10 minutos en horario de servicio.",
  },
  {
    q: "¿Repartís fuera de Barcelona?",
    a: "No. TortiClub opera exclusivamente en Barcelona (envío o recogida).",
  },
  {
    q: "¿Qué pasa si no hay stock hoy?",
    a: "Puedes reservar para mañana en Reservar. Te confirmamos el hueco disponible.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "SOLO desde 9,90 €, DUO 12,90 € y CLUB 14,90 €. Precios en la carta.",
  },
  {
    q: "¿Las tortillas se hacen al momento?",
    a: "Sí. Jugosa por dentro, dorada por fuera. Cada pedido se cocina cuando lo confirmamos.",
  },
];

export type FormatId = (typeof formats)[number]["id"];
export type FlavorId = (typeof flavors)[number]["id"];
