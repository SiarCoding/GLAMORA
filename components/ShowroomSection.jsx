import CollectionsSlider from "@/components/showroom/CollectionsSlider";
import KineticHeadline from "@/components/showroom/KineticHeadline";
import OccasionsBand from "@/components/showroom/OccasionsBand";

// Section 2 — „Der Showroom", in three acts.
//   I   KineticHeadline — the title card, pinned, type sweeping the full width
//   II  CollectionsSlider — Abendkleider and Abayas side by side on one pinned
//       stage: the first turns, the stage glides over, the second turns
//   III OccasionsBand   — one oversized line per occasion, closing on the CTA
const COLLECTIONS = [
  {
    no: "Nº 01",
    name: "Abendkleider",
    occasion: "Kollektion · Gala & Abiball",
    backdrop: { word: "Abend", size: "30vw" },
    headline: "Der Abend, an dem alle Blicke",
    accent: "Ihnen gehören.",
    body: "Korsett-Roben mit Perlenstickerei, Plissee mit Kristallgürtel, Meerjungfrau-Silhouetten aus Satin. Unsere Abendkleider aus Dubai — ausgewählt für Gala, Abiball und Hochzeit.",
    proof: "Dubai Kollektion · Anprobe im Atelier Hamburg",
    cta: "Abendkleider entdecken",
    href: "#garderobe",
    basePath: "/showroom/khaleeji",
    frameCount: 73,
  },
  {
    no: "Nº 02",
    name: "Abayas",
    occasion: "Kollektion · Hochzeit & Eid",
    backdrop: { word: "Abaya", size: "28vw" },
    headline: "Eleganz, die",
    accent: "Ihnen Raum lässt.",
    body: "Fließende Abayas aus Seidenkrepp und Chiffon, mit Goldfaden-Borten und Kristallakzenten — für Hochzeit, Eid und Verlobung. Modest Fashion aus Dubai, anprobiert in Hamburg.",
    proof: "Dubai Kollektion · Anprobe im Atelier Hamburg",
    cta: "Anprobe in Hamburg vereinbaren",
    href: "#anprobe",
    basePath: "/showroom/layla",
    frameCount: 73,
  },
];

export default function ShowroomSection() {
  return (
    <section id="showroom" className="relative bg-porcelain">
      <KineticHeadline />

      <CollectionsSlider collections={COLLECTIONS} />

      <OccasionsBand />
    </section>
  );
}
