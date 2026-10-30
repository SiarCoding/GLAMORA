import { SITE, ADDRESS_LINE } from "@/lib/site";
import { UI } from "@/lib/i18n";
import { Faq, faqJsonLd } from "@/components/seiten/LandingPage";

/* Homepage "at a glance": the plain-text facts, topic links and FAQ the film
 * and scroll scenes above cannot carry. This is what Google, AI Overviews and
 * the chat assistants quote for the brand query. */

const F = SITE.facts;

export const HOME_FAQ = [
  ["Was ist GLAMORA?", `GLAMORA ist eine Boutique für Abendkleider, Abayas und festliche Couture aus Dubai in Hamburg-Harburg, ${ADDRESS_LINE}. Vor Ort hängen ${F.models} Modelle in Größen ${F.sizes}.`],
  ["Was kostet ein Abendkleid bei GLAMORA?", `Abendkleider kosten ${F.priceDress}, festliche Abayas ${F.priceAbaya}. Vergleichbare Kleider kosten in Hamburger Boutiquen meist ${F.marketPrice}.`],
  ["Brauche ich einen Termin für die Anprobe?", `Wir empfehlen einen Termin: Er ist kostenlos, dauert ${F.appointmentLength}, Sie können ${F.companions} mitbringen und Ihre Vorauswahl hängt bereit.`],
  ["Gibt es Abayas und Hijab-Abendkleider?", "Ja, das ist ein Schwerpunkt: festliche Dubai-Abayas sowie hochgeschlossene Abendkleider mit langen Ärmeln. Die Anprobe ist auf Wunsch nur unter Frauen."],
  ["Was passiert, wenn mein Kleid nicht in meiner Größe da ist?", `Dann bestellen wir es aus Dubai in Ihrer Größe oder Wunschfarbe – in der Regel in ${F.orderDubai}.`],
  ["Wo liegt GLAMORA?", `In der Fußgängerzone Lüneburger Straße 33, 21073 Hamburg-Harburg. ${SITE.transit}.`],
];

const TOPICS = [
  ["Abendkleider Hamburg", "/abendkleider-hamburg"],
  ["Abaya Hamburg", "/abaya-hamburg"],
  ["Hijab-Abendkleider", "/hijab-abendkleider-hamburg"],
  ["Abiballkleider 2027", "/abiballkleider-hamburg"],
  ["Kleid für Hochzeitsgäste", "/kleid-hochzeitsgast-hamburg"],
  ["Verlobungskleid", "/verlobungskleid-hamburg"],
  ["Nikah & Henna", "/nikah-henna-kleid-hamburg"],
  ["Große Größen bis 54", "/abendkleider-grosse-groessen-hamburg"],
  ["Brautjungfern", "/brautjungfernkleider-hamburg"],
  ["Eid & Bayram", "/eid-kleid-hamburg"],
  ["Günstige Abendkleider", "/abendkleid-guenstig-hamburg"],
  ["Ratgeber", "/ratgeber"],
];

const FACTS = [
  ["Adresse", ADDRESS_LINE],
  ["Modelle", F.models],
  ["Abendkleider", F.priceDress],
  ["Abayas", F.priceAbaya],
  ["Größen", F.sizes],
  ["Öffnungszeiten", SITE.hoursLabel],
];

export function homeJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE.url}/#webpage`,
      url: SITE.url,
      name: "GLAMORA Hamburg-Harburg – Abendkleider, Abayas & Abiye aus Dubai",
      inLanguage: "de-DE",
      dateModified: SITE.updated,
      about: { "@id": `${SITE.url}/#store` },
      isPartOf: { "@id": `${SITE.url}/#website` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE.url}/og/home.jpg`, width: 1200, height: 630 },
    },
    faqJsonLd(HOME_FAQ, "de-DE"),
  ];
}

export default function HomeFacts() {
  return (
    <>
      <section aria-labelledby="auf-einen-blick" className="bg-porcelain py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[10.5px] uppercase tracking-widest2 text-gold-600">Auf einen Blick</span>
          </div>
          <h2 id="auf-einen-blick" className="max-w-4xl font-display text-[36px] leading-[1.06] tracking-tight text-noir md:text-[56px]">
            Abendkleider &amp; Abayas aus Dubai in Hamburg-Harburg
          </h2>
          <p className="mt-8 max-w-3xl text-[16px] leading-[1.85] text-noir/70 md:text-[18px]">
            GLAMORA in Hamburg-Harburg ({SITE.street}) führt {F.models} Abendkleider, Abiballkleider und Abayas aus Dubai in den Größen {F.sizes}.
            Abendkleider kosten {F.priceDress}, Abayas {F.priceAbaya}. Die Anprobe findet mit Termin im privaten Salon statt, auf Wunsch nur unter Frauen;
            nicht vorrätige Größen und Farben bestellen wir aus Dubai ({F.orderDubai}).
          </p>
          <p className="mt-6 max-w-3xl border-s-2 border-gold ps-5 text-[14px] leading-[1.8] text-noir/80 md:text-[15px]">
            {SITE.valueProp}
          </p>

          <dl className="mt-14 grid grid-cols-1 border-s border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {FACTS.map(([k, v]) => (
              <div key={k} className="border-b border-e border-line bg-linen px-6 py-5">
                <dt className="text-[10px] uppercase tracking-widest2 text-gold-600">{k}</dt>
                <dd className="mt-2 font-display text-[19px] leading-snug text-noir">{v}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="Anlässe" className="mt-16">
            <h3 className="text-[10px] uppercase tracking-widest2 text-gold-600">Für Ihren Anlass</h3>
            <ul className="mt-5 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
              {TOPICS.map(([label, href]) => (
                <li key={href} className="bg-linen">
                  <a href={href} className="block px-5 py-5 font-display text-[17px] text-noir transition-colors hover:bg-mist">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-noir/60">
              <a href="/tr/abiye-hamburg" hrefLang="tr" lang="tr" className="hover:text-gold-600">Türkçe: Hamburg&apos;da abiye ve tesettür abiye →</a>
              <a href="/ar/fasatin-sahra-hamburg" hrefLang="ar" lang="ar" dir="rtl" className="hover:text-gold-600">العربية: فساتين سهرة وعبايات في هامبورغ ←</a>
            </p>
          </nav>
        </div>
      </section>
      <Faq faq={HOME_FAQ} t={UI.de} />
    </>
  );
}
