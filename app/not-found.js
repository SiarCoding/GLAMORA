import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: { absolute: "Seite nicht gefunden | GLAMORA Hamburg" },
  robots: { index: false, follow: true },
};

const LINKS = [
  ["Abendkleider Hamburg", "/abendkleider-hamburg"],
  ["Abaya Hamburg", "/abaya-hamburg"],
  ["Hijab-Abendkleider", "/hijab-abendkleider-hamburg"],
  ["Abiballkleider", "/abiballkleider-hamburg"],
  ["Termin vereinbaren", "/termin"],
  ["Ratgeber", "/ratgeber"],
  ["Türkçe: Abiye Hamburg", "/tr/abiye-hamburg"],
  ["العربية: فساتين سهرة", "/ar/fasatin-sahra-hamburg"],
];

export default function NotFound() {
  return (
    <main id="inhalt" className="relative bg-porcelain">
      <Navigation />
      <section className="mx-auto max-w-[920px] px-6 pb-28 pt-40 md:px-10 md:pt-52">
        <h1 className="font-display text-[44px] leading-[1.05] tracking-tight text-noir md:text-[64px]">
          Diese Seite gibt es nicht.
        </h1>
        <p className="mt-6 text-[16px] leading-[1.85] text-noir/70">
          Vielleicht suchen Sie eines davon – oder Sie besuchen uns direkt in der Lüneburger Straße 33 in Hamburg-Harburg.
        </p>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="block border border-line bg-linen px-6 py-5 font-display text-[19px] text-noir transition-colors hover:bg-mist">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </main>
  );
}
