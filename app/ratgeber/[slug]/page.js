import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Sections, Faq, Visit, Related, faqJsonLd } from "@/components/seiten/LandingPage";
import { SITE, STORE_ID } from "@/lib/site";
import { UI } from "@/lib/i18n";
import { ARTICLES, ARTICLE_BY_SLUG } from "@/lib/ratgeber";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

const image = (a) => `/og/${a.image}.jpg`;

export function generateMetadata({ params }) {
  const a = ARTICLE_BY_SLUG[params.slug];
  if (!a) return {};
  const path = `/ratgeber/${a.slug}`;
  return {
    title: { absolute: a.title },
    description: a.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "de_DE",
      siteName: SITE.brandLocal,
      url: path,
      title: a.title,
      description: a.description,
      publishedTime: a.published,
      modifiedTime: a.modified,
      images: [{ url: image(a), width: 1200, height: 630, alt: a.h1 }],
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.description, images: [image(a)] },
  };
}

function articleJsonLd(a) {
  const url = `${SITE.url}/ratgeber/${a.slug}`;
  const author = SITE.founder
    ? { "@type": "Person", name: SITE.founder.name, jobTitle: SITE.founder.role, worksFor: { "@id": STORE_ID } }
    : { "@id": STORE_ID };
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      mainEntityOfPage: url,
      headline: a.h1,
      description: a.description,
      image: `${SITE.url}${image(a)}`,
      datePublished: a.published,
      dateModified: a.modified,
      inLanguage: "de-DE",
      author,
      publisher: { "@id": STORE_ID },
      isPartOf: { "@id": `${SITE.url}/#website` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "GLAMORA", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Ratgeber", item: `${SITE.url}/ratgeber` },
        { "@type": "ListItem", position: 3, name: a.h1, item: url },
      ],
    },
    faqJsonLd(a.faq, "de-DE"),
  ];
}

export default function ArticlePage({ params }) {
  const a = ARTICLE_BY_SLUG[params.slug];
  if (!a) notFound();
  const t = UI.de;
  const modified = new Date(`${a.modified}T12:00:00Z`).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <main id="inhalt" className="relative bg-porcelain">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(a)) }} />
      <Navigation />
      <article>
        <header className="bg-porcelain pb-10 pt-32 md:pt-44">
          <div className="mx-auto max-w-[920px] px-6 md:px-10">
            <nav aria-label="Brotkrumen" className="mb-10 text-[11px] uppercase tracking-[0.2em] text-noir/40">
              <a href="/" className="hover:text-gold-600">GLAMORA</a>
              <span className="mx-3">/</span>
              <a href="/ratgeber" className="hover:text-gold-600">Ratgeber</a>
            </nav>
            <h1 className="font-display text-[36px] leading-[1.06] tracking-tight text-noir md:text-[56px]">{a.h1}</h1>
            <p className="mt-8 text-[17px] leading-[1.85] text-noir/75 md:text-[19px]">{a.lead}</p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-noir/40">
              {SITE.founder ? `Von ${SITE.founder.name} · ` : "GLAMORA Hamburg · "}
              Stand: <time dateTime={a.modified}>{modified}</time>
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-[1280px] px-6 md:px-10">
            <img
              src={image(a)}
              alt={`${a.h1} – GLAMORA Hamburg`}
              width={1200}
              height={630}
              className="h-auto w-full border border-line"
              fetchPriority="high"
            />
          </div>
        </header>
        <Sections sections={a.sections} />
      </article>
      <Faq faq={a.faq} t={t} />
      <Visit t={t} />
      <Related paths={a.related.map((s) => `/${s}`)} t={t} />
      <Footer />
    </main>
  );
}
