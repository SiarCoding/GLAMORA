import "./globals.css";
import { SITE, storeJsonLd, websiteJsonLd } from "@/lib/site";
// Hero + header from the Higgsfield site: engine CSS first, then the site layer.
import "@/components/hero/scroll-scrub.css";
import "@/components/hero/glamora-hero.css";

// Typefaces are self-hosted from /public/fonts via @font-face in globals.css
// (DSGVO: no Google request). Preload the two faces every page uses first.
const PRELOAD_FONTS = [
  "/fonts/urbanist-latin.woff2",
  "/fonts/cormorant-garamond-500-latin.woff2",
];

// Search Console / Bing Webmaster verification codes come from the hosting env
// (GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION) — nothing is emitted unset.
const verification = {
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
  ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
};

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "GLAMORA Hamburg-Harburg – Abendkleider, Abayas & Abiye aus Dubai ab 70 €",
    template: "%s | GLAMORA Hamburg",
  },
  description: `GLAMORA – Boutique für Abendkleider und Abayas aus Dubai in Hamburg-Harburg, ${SITE.street}. ${SITE.facts.models} Modelle, ${SITE.facts.priceDress}, Größen ${SITE.facts.sizes}, private Anprobe mit Termin.`,
  applicationName: SITE.brandLocal,
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE.brandLocal,
    url: "/",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "GLAMORA Hamburg – Boutique für Abendkleider und Abayas aus Dubai" }],
  },
  twitter: { card: "summary_large_image", images: ["/og/home.jpg"] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
  other: {
    "geo.region": "DE-HH",
    "geo.placename": "Hamburg-Harburg",
    "geo.position": `${SITE.geo.lat};${SITE.geo.lng}`,
    ICBM: `${SITE.geo.lat}, ${SITE.geo.lng}`,
  },
  ...(Object.keys(verification).length ? { verification } : {}),
};

export const viewport = {
  themeColor: "#FAF8F3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        {PRELOAD_FONTS.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM summary" />
      </head>
      <body className="font-sans bg-porcelain text-noir selection:bg-gold/30">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([storeJsonLd(), websiteJsonLd]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
