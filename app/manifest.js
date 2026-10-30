import { SITE } from "@/lib/site";

export default function manifest() {
  return {
    name: `${SITE.brandLocal} – Abendkleider & Abayas`,
    short_name: SITE.name,
    description: "Boutique für Abendkleider und Abayas aus Dubai in Hamburg-Harburg.",
    start_url: "/",
    display: "browser",
    lang: "de",
    background_color: "#FAF8F3",
    theme_color: "#1A1611",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
