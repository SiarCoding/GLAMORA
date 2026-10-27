import "./globals.css";
import { SITE, storeJsonLd } from "@/lib/site";
// Hero + header from the Higgsfield site: engine CSS first, then the site layer.
import "@/components/hero/scroll-scrub.css";
import "@/components/hero/glamora-hero.css";

// Typefaces are self-hosted from /public/fonts via @font-face in globals.css
// (DSGVO: no Google request). Preload the two faces every page uses first.
const PRELOAD_FONTS = [
  "/fonts/urbanist-latin.woff2",
  "/fonts/cormorant-garamond-500-latin.woff2",
];

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: "Abendkleider & Abayas Hamburg – Couture aus Dubai | GLAMORA Harburg",
  description: `GLAMORA – Boutique für Abendkleider und Abayas aus Dubai in Hamburg-Harburg, ${SITE.street}. ${SITE.facts.models} Modelle, Größen ${SITE.facts.sizes}, private Anprobe mit Termin & eigene Schneiderei.`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE.name,
    url: "/",
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  inLanguage: "de-DE",
  publisher: { "@id": `${SITE.url}/#store` },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        {PRELOAD_FONTS.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
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
