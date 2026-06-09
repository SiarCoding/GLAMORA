import Navigation from "@/components/Navigation";
import HeroSequence from "@/components/HeroSequence";
import SechsRobenSection from "@/components/SechsRobenSection";
import ShowroomSection from "@/components/ShowroomSection";
import CraftSection from "@/components/CraftSection";
import FittingSection from "@/components/FittingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-porcelain">
      <Navigation />
      <HeroSequence />
      <ShowroomSection />
      <SechsRobenSection />
      <CraftSection />
      <FittingSection />
      <Footer />
    </main>
  );
}
