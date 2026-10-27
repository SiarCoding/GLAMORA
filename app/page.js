import Navigation from "@/components/Navigation";
import GlamoraHero from "@/components/hero/GlamoraHero";
import HeroSequence from "@/components/HeroSequence";
import SechsRobenSection from "@/components/SechsRobenSection";
import ShowroomSection from "@/components/ShowroomSection";
import GarderobeSection from "@/components/GarderobeSection";
import CraftSection from "@/components/CraftSection";
import FittingSection from "@/components/FittingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="inhalt" className="relative bg-porcelain">
      <Navigation />
      {/* Film hero from the Higgsfield site; the former hero follows as chapter 2. */}
      <GlamoraHero />
      <HeroSequence />
      <ShowroomSection />
      <GarderobeSection />
      <SechsRobenSection />
      <CraftSection />
      <FittingSection />
      <Footer />
    </main>
  );
}
