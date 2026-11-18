import Navigation from "@/components/Navigation";
import GlamoraHero from "@/components/hero/GlamoraHero";
import HeroSequence from "@/components/HeroSequence";
import ShowroomSection from "@/components/ShowroomSection";
import GarderobeSection from "@/components/GarderobeSection";
import FittingSection from "@/components/FittingSection";
import HomeFacts, { homeJsonLd } from "@/components/HomeFacts";
import Footer from "@/components/Footer";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="inhalt" className="relative bg-porcelain">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }} />
      <Navigation />
      {/* Film hero from the Higgsfield site; the former hero follows as chapter 2. */}
      <GlamoraHero />
      <ShowroomSection />
      <GarderobeSection />
      {/* Scroll film „Getragen von einer Einzigen" — closing CTA before the booking section. */}
      <HeroSequence />
      <FittingSection />
      <HomeFacts />
      <Footer />
    </main>
  );
}
