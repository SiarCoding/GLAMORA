import {
  Cormorant_Garamond,
  Manrope,
  Playfair_Display,
  Urbanist,
} from "next/font/google";
import "./globals.css";
// Hero + header from the Higgsfield site: engine CSS first, then the site layer.
import "@/components/hero/scroll-scrub.css";
import "@/components/hero/glamora-hero.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

// Faces of the ported hero/header (glamora-hamburg uses @fontsource 400/500).
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  title: "GLAMORA — Die Dubai Kollektion | Atelier Hamburg",
  description:
    "GLAMORA — Hamburgs privates Atelier für exklusive Abend-Couture aus Dubai. Handgefertigte Vollendung, nur nach Vereinbarung.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="de"
      className={`${playfair.variable} ${urbanist.variable} ${cormorant.variable} ${manrope.variable}`}
    >
      <body className="font-sans bg-porcelain text-noir selection:bg-gold/30">
        {children}
      </body>
    </html>
  );
}
