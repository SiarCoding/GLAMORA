import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

/* Plain text page shell for Impressum / Datenschutz. */
export default function LegalPage({ title, children }) {
  return (
    <main id="inhalt" className="relative bg-porcelain">
      <Navigation />
      <article className="mx-auto max-w-[820px] px-6 pb-28 pt-32 md:px-10 md:pt-44">
        <h1 className="font-display text-[40px] leading-[1.05] tracking-tight text-noir md:text-[56px]">{title}</h1>
        <div className="mt-12 space-y-6 text-[15px] leading-[1.85] text-noir/75">{children}</div>
      </article>
      <Footer />
    </main>
  );
}
