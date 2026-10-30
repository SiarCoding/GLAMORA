import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SITE, STORE_ID } from "@/lib/site";
import { ARTICLES } from "@/lib/ratgeber";

export const metadata = {
  title: { absolute: "Ratgeber Abendmode: Dresscodes, Abayas, Größen, Anlässe | GLAMORA Hamburg" },
  description: "Ratgeber von GLAMORA Hamburg: Dresscodes erklärt, Abaya-Stoffe, Dubai-Größen umrechnen, Abiball-Planung, Farben für Hochzeitsgäste, Nikah & Henna.",
  alternates: { canonical: "/ratgeber" },
  openGraph: { type: "website", locale: "de_DE", url: "/ratgeber", images: [{ url: "/og/atelier-1.jpg", width: 1200, height: 630 }] },
};

const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE.url}/ratgeber#webpage`,
  url: `${SITE.url}/ratgeber`,
  name: "Ratgeber Abendmode",
  inLanguage: "de-DE",
  publisher: { "@id": STORE_ID },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: ARTICLES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/ratgeber/${a.slug}`,
      name: a.h1,
    })),
  },
};

export default function RatgeberIndex() {
  return (
    <main id="inhalt" className="relative bg-porcelain">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }} />
      <Navigation />
      <header className="pb-16 pt-32 md:pt-44">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <h1 className="max-w-4xl font-display text-[40px] leading-[1.04] tracking-tight text-noir md:text-[64px]">
            Ratgeber Abendmode – Dresscodes, Abayas, Größen und Anlässe
          </h1>
          <p className="mt-8 max-w-3xl text-[17px] leading-[1.85] text-noir/70">
            Antworten auf die Fragen, die wir in der Anprobe in Hamburg-Harburg am häufigsten hören – kurz, mit Tabellen und konkreten Zahlen.
          </p>
        </div>
      </header>
      <section className="pb-28">
        <ul className="mx-auto grid max-w-[1280px] gap-px border border-line bg-line px-0 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <li key={a.slug} className="bg-linen">
              <a href={`/ratgeber/${a.slug}`} className="group block h-full">
                <img src={`/og/${a.image}.jpg`} alt={a.h1} width={1200} height={630} loading="lazy" className="h-auto w-full" />
                <div className="px-6 py-7">
                  <h2 className="font-display text-[22px] leading-snug text-noir">{a.h1}</h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-noir/60">{a.description}</p>
                  <div className="mt-4 text-[10px] uppercase tracking-widest2 text-gold-600 transition-transform group-hover:translate-x-1">Lesen →</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </main>
  );
}
