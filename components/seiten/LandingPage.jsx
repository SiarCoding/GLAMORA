import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SceneSequence from "@/components/seiten/SceneSequence";
import { SITE, ADDRESS_LINE } from "@/lib/site";
import { PAGE_BY_SLUG } from "@/lib/pages";

/* Server-rendered keyword landing page. Everything an LLM or crawler needs —
 * H1, answer-first lead, facts, tables, FAQ — is plain HTML; only the two
 * scroll scenes hydrate. */

function Eyebrow({ children, light = false }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-10 bg-gold" />
      <span
        className={`text-[10.5px] uppercase tracking-widest2 ${
          light ? "text-gold-200" : "text-gold-600"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function Hero({ page }) {
  return (
    <header className="relative overflow-hidden bg-porcelain pb-16 pt-32 md:pb-24 md:pt-44">
      <div className="pointer-events-none absolute right-[-10vw] top-10 h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_60%)] blur-3xl" />
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <nav aria-label="Brotkrumen" className="mb-10 text-[11px] uppercase tracking-[0.2em] text-noir/40">
          <a href="/" className="transition-colors hover:text-gold-600">GLAMORA</a>
          <span className="mx-3">/</span>
          <span className="text-noir/70">{page.nav}</span>
        </nav>
        <Eyebrow>{page.eyebrow}</Eyebrow>
        <h1 className="max-w-4xl font-display text-[40px] leading-[1.04] tracking-tight text-noir md:text-[64px] lg:text-[76px]">
          {page.h1}
        </h1>
        <p className="mt-8 max-w-3xl text-[16px] leading-[1.85] text-noir/70 md:text-[18px]">
          {page.lead}
        </p>
        <p className="mt-6 max-w-3xl border-l-2 border-gold pl-5 text-[14px] leading-[1.8] text-noir/80 md:text-[15px]">
          {SITE.valueProp}
        </p>
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <a
            href="/termin"
            className="group relative inline-flex items-center justify-center gap-4 overflow-hidden bg-noir px-9 py-5 text-[11px] uppercase tracking-widest2 text-porcelain"
          >
            <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-700 group-hover:translate-x-0" />
            <span className="relative transition-colors duration-300 group-hover:text-black">Anprobe-Termin vereinbaren</span>
          </a>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener"
            className="text-[11px] uppercase tracking-widest2 text-noir/60 transition-colors hover:text-gold-600"
          >
            {ADDRESS_LINE} · Route planen
          </a>
        </div>

        {/* Fact grid — the "Fakten-Box" LLMs quote verbatim. */}
        <dl className="mt-16 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {page.facts.map(([k, v]) => (
            <div key={k} className="border-b border-r border-line bg-linen px-6 py-5">
              <dt className="text-[10px] uppercase tracking-widest2 text-gold-600">{k}</dt>
              <dd className="mt-2 font-display text-[19px] leading-snug text-noir">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

function Table({ table }) {
  return (
    <div className="mt-8 overflow-x-auto border border-line">
      <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
        {table.head.some(Boolean) ? (
          <thead className="bg-mist">
            <tr>
              {table.head.map((h, i) => (
                <th key={i} scope="col" className="px-5 py-4 text-[10px] font-normal uppercase tracking-widest2 text-gold-600">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r} className="border-t border-line bg-linen">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="px-5 py-4 font-display text-[16px] font-normal text-noir">
                    {cell}
                  </th>
                ) : (
                  <td key={c} className="px-5 py-4 leading-relaxed text-noir/70">
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Sections({ sections }) {
  return (
    <div className="bg-porcelain py-24 md:py-32">
      <div className="mx-auto max-w-[920px] space-y-20 px-6 md:px-10">
        {sections.map((s) => (
          <section key={s.h2}>
            <h2 className="font-display text-[32px] leading-[1.1] tracking-tight text-noir md:text-[44px]">
              {s.h2}
            </h2>
            {(s.body || []).map((para, i) => (
              <p key={i} className="mt-6 text-[16px] leading-[1.9] text-noir/70">
                {para}
              </p>
            ))}
            {s.table ? <Table table={s.table} /> : null}
          </section>
        ))}
      </div>
    </div>
  );
}

function Faq({ faq }) {
  return (
    <section className="bg-mist py-24 md:py-32" aria-labelledby="faq-title">
      <div className="mx-auto max-w-[920px] px-6 md:px-10">
        <Eyebrow>Häufige Fragen</Eyebrow>
        <h2 id="faq-title" className="font-display text-[34px] leading-[1.08] tracking-tight text-noir md:text-[48px]">
          Fragen &amp; Antworten
        </h2>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {faq.map(([q, a]) => (
            <details key={q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[19px] leading-snug text-noir md:text-[22px]">
                <h3 className="font-normal">{q}</h3>
                <span className="mt-1 text-gold-600 transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.85] text-noir/70">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="relative overflow-hidden bg-noir py-24 text-porcelain md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_60%)] blur-3xl" />
      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-6 md:grid-cols-2 md:px-10">
        <div>
          <Eyebrow light>Besuchen Sie uns</Eyebrow>
          <h2 className="font-display text-[38px] leading-[1.05] tracking-tight md:text-[56px]">
            Anprobe in Hamburg-Harburg
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-porcelain/70">
            Schreiben Sie uns Anlass, Datum, Größe und Budget – Ihre Vorauswahl hängt beim Termin bereit.
          </p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href={`mailto:${SITE.email}?subject=Anprobe-Termin`}
              className="inline-flex items-center justify-center bg-gold px-9 py-5 text-[11px] uppercase tracking-widest2 text-black transition-colors hover:bg-gold-300"
            >
              Termin per E-Mail anfragen
            </a>
            {SITE.phone ? (
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-[11px] uppercase tracking-widest2 text-porcelain/70 hover:text-gold">
                {SITE.phone}
              </a>
            ) : null}
          </div>
        </div>
        <address className="grid gap-8 not-italic sm:grid-cols-2">
          <div>
            <div className="text-[10px] uppercase tracking-widest2 text-gold">Adresse</div>
            <div className="mt-3 font-display text-[20px] leading-snug">
              {SITE.name}
              <br />
              {SITE.street}
              <br />
              {SITE.zip} {SITE.city}
            </div>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener" className="mt-3 inline-block text-[11px] uppercase tracking-widest2 text-porcelain/60 hover:text-gold">
              In Google Maps öffnen
            </a>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest2 text-gold">Öffnungszeiten</div>
            <div className="mt-3 text-[15px] leading-relaxed text-porcelain/80">{SITE.hoursLabel}</div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-[10px] uppercase tracking-widest2 text-gold">Anfahrt</div>
            <div className="mt-3 text-[15px] leading-relaxed text-porcelain/80">{SITE.transit}</div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-[10px] uppercase tracking-widest2 text-gold">Kontakt</div>
            <a href={`mailto:${SITE.email}`} className="mt-3 inline-block text-[15px] text-porcelain/80 hover:text-gold">
              {SITE.email}
            </a>
          </div>
        </address>
      </div>
    </section>
  );
}

function Related({ slugs }) {
  const pages = slugs.map((s) => PAGE_BY_SLUG[s]).filter(Boolean);
  return (
    <nav aria-label="Weitere Themen" className="bg-porcelain py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <Eyebrow>Weiterlesen</Eyebrow>
        <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {pages.map((p) => (
            <li key={p.slug} className="border-b border-r border-line bg-linen">
              <a href={`/${p.slug}`} className="group block h-full px-6 py-7 transition-colors hover:bg-mist">
                <div className="font-display text-[21px] text-noir">{p.nav}</div>
                <div className="mt-2 text-[13px] leading-relaxed text-noir/55">{p.description.split(":")[0]}</div>
                <div className="mt-4 text-[10px] uppercase tracking-widest2 text-gold-600 transition-transform group-hover:translate-x-1">
                  Ansehen →
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/** Full scene frame for OG / schema — the white studio frames look empty as previews. */
export function ogImage(page) {
  return `${page.sequences[0].basePath.replace("/seiten/weiss/", "/seiten/")}/frame-060.webp`;
}

export function pageJsonLd(page) {
  const url = `${SITE.url}/${page.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: "de-DE",
      about: { "@id": `${SITE.url}/#store` },
      isPartOf: { "@id": `${SITE.url}/#website` },
      primaryImageOfPage: `${SITE.url}${ogImage(page)}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "GLAMORA", item: SITE.url },
        { "@type": "ListItem", position: 2, name: page.nav, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}

export default function LandingPage({ page }) {
  const [first, second] = page.sequences;
  const mid = Math.ceil(page.sections.length / 2);
  return (
    <main id="inhalt" className="relative bg-porcelain">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd(page)) }}
      />
      <Navigation />
      <Hero page={page} />
      <SceneSequence {...first} />
      <Sections sections={page.sections.slice(0, mid)} />
      <SceneSequence {...second} flip />
      {page.sections.length > mid ? <Sections sections={page.sections.slice(mid)} /> : null}
      <Faq faq={page.faq} />
      <Visit />
      <Related slugs={page.related} />
      <Footer />
    </main>
  );
}
