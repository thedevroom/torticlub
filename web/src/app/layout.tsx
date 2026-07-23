import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://torticlubworld.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TortiClub Barcelona — Tortillas para compartir | Pide a domicilio",
    template: "%s · TortiClub Barcelona",
  },
  description:
    "Tortillas hechas al momento en Barcelona. Formatos SOLO, DUO y CLUB desde 9,90 €. Pedido online. Solo Barcelona.",
  applicationName: "TortiClub Barcelona",
  keywords: [
    "tortilla Barcelona",
    "tortilla a domicilio Barcelona",
    "pedir tortilla Barcelona",
    "tortillas para compartir Barcelona",
    "TortiClub Barcelona",
    "tortilla delivery Barcelona",
    "cena a domicilio Barcelona",
    "mejor tortilla Barcelona",
    "tortilla para llevar Barcelona",
    "comida para compartir Barcelona",
  ],
  authors: [{ name: "Cristian Querol" }, { name: "thedevroom" }],
  creator: "Cristian Querol / thedevroom",
  publisher: "TortiClub Barcelona",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "TortiClub Barcelona",
    title: "TortiClub Barcelona — Tortillas para compartir",
    description:
      "Pide tortillas hechas al momento en Barcelona. SOLO, DUO y CLUB desde 9,90 €. Solo repartimos en Barcelona.",
    images: [
      {
        url: "/brand/logo-oficial.png",
        width: 1254,
        height: 1254,
        alt: "TortiClub Barcelona — tortillas para compartir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TortiClub Barcelona — Tortillas para compartir",
    description:
      "Tortillas hechas al momento. Solo en Barcelona. Pide online desde 9,90 €.",
    images: ["/brand/logo-oficial.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/brand/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/brand/icon.png"],
  },
  manifest: "/site.webmanifest",
  category: "food",
  other: {
    "geo.region": "ES-CT",
    "geo.placename": "Barcelona",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F3E8" },
    { media: "(prefers-color-scheme: dark)", color: "#F7F3E8" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FoodEstablishment",
        "@id": `${siteUrl}/#business`,
        name: "TortiClub Barcelona",
        alternateName: "TortiClub",
        description:
          "Tortillas hechas al momento para compartir. Solo en Barcelona. Formatos SOLO, DUO y CLUB.",
        url: siteUrl,
        image: `${siteUrl}/brand/logo-oficial.png`,
        priceRange: "€€",
        servesCuisine: ["Spanish", "Tortilla de patata"],
        slogan: "Parte. Comparte. Repite.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Barcelona",
          addressRegion: "Barcelona",
          addressCountry: "ES",
        },
        areaServed: {
          "@type": "City",
          name: "Barcelona",
        },
        sameAs: ["https://instagram.com/torticlub"],
        acceptsReservations: true,
        hasMenu: `${siteUrl}/carta`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "TortiClub Barcelona",
        description: "Pedir tortillas a domicilio en Barcelona",
        publisher: { "@id": `${siteUrl}/#business` },
        inLanguage: "es-ES",
      },
    ],
  };

  return (
    <html lang="es-ES" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full bg-surface text-ink font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
