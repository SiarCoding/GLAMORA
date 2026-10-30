import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SceneSequence from "@/components/seiten/SceneSequence";
import { SITE, ADDRESS_LINE, STORE_ID } from "@/lib/site";
import { LOCALES, UI, formatUpdated } from "@/lib/i18n";
import { PAGE_BY_PATH, alternatesOf, absolute } from "@/lib/registry";

/* Server-rendered keyword landing page (DE / TR / AR). Everything an LLM or
 * crawler needs — H1, answer-first lead, facts, tables, FAQ — is plain HTML;
 * only the two scroll scenes hydrate. Arabic renders right-to-left: spacing
 * uses logical utilities (ps-, border-s) so it mirrors on its own. */

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

function Hero({ page, t }) {
  return (
    <header className="relative overflow-hidden bg-porcelain pb-16 pt-32 md:pb-24 md:pt-44">
      <div className="pointer-events-none absolute end-[-10vw] top-10 h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_60%)] blur-3xl" />
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <nav aria-label="Breadcrumb" className="mb-10 text-[11px] uppercase tracking-[0.2em] text-noir/40">
          <a href="/" className="transition-colors hover:text-gold-600">{t.home}</a>
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
        <p className="mt-6 max-w-3xl border-s-2 border-gold ps-5 text-[14px] leading-[1.8] text-noir/80 md:text-[15px]">
          {t.valueProp}
        </p>
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <a
            // /termin is German — TR / AR visitors go straight to the e-mail request.
            href={page.locale === "de" ? "/termin" : `mailto:${SITE.email}?subject=${encodeURIComponent(t.mailSubject)}`}
            className="group relative inline-flex items-center justify-center gap-4 overflow-hidden bg-noir px-9 py-5 text-[11px] uppercase tracking-widest2 text-porcelain"
          >
            <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-700 group-hover:translate-x-0" />
            <span className="relative transition-colors duration-300 group-hover:text-black">{t.cta}</span>
          </a>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener"
            className="text-[11px] uppercase tracking-widest2 text-noir/60 transition-colors hover:text-gold-600"
          >
            <bdi>{ADDRESS_LINE}</bdi> · {t.route}
          </a>
        </div>

        {/* Fact grid — the "Fakten-Box" LLMs quote verbatim. */}
        <dl className="mt-16 grid grid-cols-1 border-s border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {page.facts.map(([k, v]) => (
            <div key={k} className="border-b border-e border-line bg-linen px-6 py-5">
              <dt className="text-[10px] uppercase tracking-widest2 text-gold-600">{k}</dt>
              <dd className="mt-2 font-display text-[19px] leading-snug text-noir">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-noir/40">
          {t.updated}: <time dateTime={SITE.updated}>{formatUpdated(page.locale)}</time>
        </p>
      </div>
    </header>
  );
}

function Table({ table }) {
  return (
    <div className="mt-8 overflow-x-auto border border-line">
      <table className="w-full min-w-[520px] border-collapse text-start text-[14px]">
        {table.head.some(Boolean) ? (
          <thead className="bg-mist">
            <tr>
              {table.head.map((h, i) => (
                <th key={i} scope="col" className="px-5 py-4 text-start text-[10px] font-normal uppercase tracking-widest2 text-gold-600">
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
                  <th key={c} scope="row" className="px-5 py-4 text-start font-display text-[16px] font-normal text-noir">
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

export function Sections({ sections }) {
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

export function Faq({ faq, t }) {
  return (
    <section className="bg-mist py-24 md:py-32" aria-labelledby="faq-title">
      <div className="mx-auto max-w-[920px] px-6 md:px-10">
        <Eyebrow>{t.faqEyebrow}</Eyebrow>
        <h2 id="faq-title" className="font-display text-[34px] leading-[1.08] tracking-tight text-noir md:text-[48px]">
          {t.faqTitle}
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

export function Visit({ t }) {
  return (
    <section className="relative overflow-hidden bg-noir py-24 text-porcelain md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_60%)] blur-3xl" />
      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-6 md:grid-cols-2 md:px-10">
        <div>
          <Eyebrow light>{t.visitEyebrow}</Eyebrow>
          <h2 className="font-display text-[38px] leading-[1.05] tracking-tight md:text-[56px]">
            {t.visitTitle}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-porcelain/70">{t.visitBody}</p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(t.mailSubject)}`}
              className="inline-flex items-center justify-center bg-gold px-9 py-5 text-[11px] uppercase tracking-widest2 text-black transition-colors hover:bg-gold-300"
            >
              {t.mailCta}
            </a>
            {SITE.whatsapp ? (
              <a href={SITE.whatsapp} target="_blank" rel="noopener" className="text-[11px] uppercase tracking-widest2 text-porcelain/70 hover:text-gold">
                {t.whatsapp}
              </a>
            ) : null}
            {SITE.phone ? (
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-[11px] uppercase tracking-widest2 text-porcelain/70 hover:text-gold">
                <bdi>{SITE.phone}</bdi>
              </a>
            ) : null}
          </div>
        </div>
        <address className="grid gap-8 not-italic sm:grid-cols-2">
          <div>
            <div className="text-[10px] uppercase tracking-widest2 text-gold">{t.address}</div>
            <div className="mt-3 font-display text-[20px] leading-snug" dir="ltr">
              {SITE.name}
              <br />
              {SITE.street}
              <br />
              {SITE.zip} {SITE.city}-{SITE.district}
            </div>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener" className="mt-3 inline-block text-[11px] uppercase tracking-widest2 text-porcelain/60 hover:text-gold">
              {t.openMaps}
            </a>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest2 text-gold">{t.hours}</div>
            <div className="mt-3 text-[15px] leading-relaxed text-porcelain/80">{t.hoursLabel}</div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-[10px] uppercase tracking-widest2 text-gold">{t.transit}</div>
            <div className="mt-3 text-[15px] leading-relaxed text-porcelain/80">{t.transitText}</div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-[10px] uppercase tracking-widest2 text-gold">{t.contact}</div>
            <a href={`mailto:${SITE.email}`} className="mt-3 inline-block text-[15px] text-porcelain/80 hover:text-gold">
              {SITE.email}
            </a>
          </div>
        </address>
      </div>
    </section>
  );
}

export function Related({ paths, t }) {
  const pages = paths.map((p) => PAGE_BY_PATH[p]).filter(Boolean);
  if (!pages.length) return null;
  return (
    <nav aria-label={t.related} className="bg-porcelain py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <Eyebrow>{t.related}</Eyebrow>
        <ul className="grid border-s border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {pages.map((p) => (
            <li key={p.path} className="border-b border-e border-line bg-linen">
              <a href={p.path} className="group block h-full px-6 py-7 transition-colors hover:bg-mist">
                <div className="font-display text-[21px] text-noir">{p.nav}</div>
                <div className="mt-2 text-[13px] leading-relaxed text-noir/55">{p.description.split(":")[0]}</div>
                <div className="mt-4 text-[10px] uppercase tracking-widest2 text-gold-600 transition-transform group-hover:translate-x-1">
                  {t.view}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/** 1200×630 JPG (public/og/<dir>.jpg) — WhatsApp / Facebook handle JPG reliably. */
export function ogImage(page) {
  return `/og/${page.sequences[0].dir}.jpg`;
}

export function faqJsonLd(faq, lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faq.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function pageJsonLd(page) {
  const url = absolute(page.path);
  const lang = LOCALES[page.locale].lang;
  const t = UI[page.locale];
  const translations = Object.entries(alternatesOf(page))
    .filter(([loc]) => loc !== page.locale)
    .map(([, path]) => ({ "@id": `${absolute(path)}#webpage` }));
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: lang,
      dateModified: SITE.updated,
      about: { "@id": STORE_ID },
      isPartOf: { "@id": `${SITE.url}/#website` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absolute(ogImage(page)),
        width: 1200,
        height: 630,
        caption: `${page.h1} – GLAMORA Hamburg`,
      },
      ...(translations.length ? { workTranslation: translations } : {}),
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "header p"] },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: SITE.url },
        { "@type": "ListItem", position: 2, name: page.nav, item: url },
      ],
    },
    faqJsonLd(page.faq, lang),
  ];
}

export default function LandingPage({ page }) {
  const t = UI[page.locale];
  const loc = LOCALES[page.locale];
  const prefix = loc.prefix;
  const [first, second] = page.sequences;
  const mid = Math.ceil(page.sections.length / 2);
  const imageAlt = `${page.h1} – GLAMORA Hamburg`;
  return (
    <div lang={loc.lang} dir={loc.dir}>
      <main id="inhalt" className="relative bg-porcelain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd(page)) }}
        />
        <Navigation locale={page.locale} alternates={alternatesOf(page)} />
        <Hero page={page} t={t} />
        <SceneSequence {...first} imageAlt={imageAlt} />
        <Sections sections={page.sections.slice(0, mid)} />
        <SceneSequence {...second} imageAlt={imageAlt} flip />
        {page.sections.length > mid ? <Sections sections={page.sections.slice(mid)} /> : null}
        <Faq faq={page.faq} t={t} />
        <Visit t={t} />
        <Related paths={page.related.map((s) => `${prefix}/${s}`)} t={t} />
        <Footer locale={page.locale} alternates={alternatesOf(page)} />
      </main>
    </div>
  );
}
