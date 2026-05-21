import Navigation from "@/components/Navigation";
import HeroSequence from "@/components/HeroSequence";
import ShowroomSection from "@/components/ShowroomSection";
import CraftSection from "@/components/CraftSection";
import FittingSection from "@/components/FittingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-black">
      <Navigation />
      <HeroSequence />
      <ShowroomSection />
      <CraftSection />
      <FittingSection />
      <Footer />
    </main>
  );
}
