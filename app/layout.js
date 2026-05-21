import { Playfair_Display, Urbanist } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "GLAMORA — Die Dubai Kollektion | Atelier Hamburg",
  description:
    "GLAMORA — Hamburgs privates Atelier für exklusive Abend-Couture aus Dubai. Handgefertigte Vollendung, nur nach Vereinbarung.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${playfair.variable} ${urbanist.variable}`}>
      <body className="font-sans bg-porcelain text-noir selection:bg-gold/30">
        {children}
      </body>
    </html>
  );
}
