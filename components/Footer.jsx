import { SITE } from "@/lib/site";
import { UI } from "@/lib/i18n";
import { pagesFor } from "@/lib/registry";
import { LanguageLinks } from "@/components/Navigation";

const LEGAL = {
  de: { imprint: "Impressum", privacy: "Datenschutz", guides: "Ratgeber", topics: "Themen", region: "Region", lang: "Sprache" },
  tr: { imprint: "Künye (Impressum)", privacy: "Gizlilik (Datenschutz)", guides: "Rehber", topics: "Sayfalar", region: "Bölge", lang: "Dil" },
  ar: { imprint: "بيانات الناشر (Impressum)", privacy: "الخصوصية (Datenschutz)", guides: "أدلة", topics: "الصفحات", region: "المنطقة", lang: "اللغة" },
};

const SOCIAL_LABEL = {
  instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook",
  pinterest: "Pinterest", googleProfile: "Google", yelp: "Yelp",
};

// Town pages are listed in their own column so the footer reads as a local map.
const REGION = new Set([
  "abendkleider-harburg", "abendkleider-wilhelmsburg", "abendkleider-buxtehude",
  "abendkleider-stade", "abendkleider-lueneburg", "abendkleider-winsen",
  "abendkleider-buchholz-seevetal",
]);

const linkCls = "text-[11px] uppercase tracking-[0.2em] text-noir/55 transition-colors hover:text-gold-600";

export default function Footer({ locale = "de", alternates }) {
  const t = UI[locale];
  const l = LEGAL[locale];
  const pages = pagesFor(locale);
  const topics = pages.filter((p) => !REGION.has(p.slug));
  const region = pages.filter((p) => REGION.has(p.slug));
  const social = Object.entries(SITE.social).filter(([, v]) => v);

  return (
    <footer className="relative border-t border-line bg-mist pb-12 pt-20">
      <div className="mx-auto grid max-w-[1480px] gap-12 px-6 md:grid-cols-[1.2fr_2fr_1fr] md:px-10">
        {/* NAP — spelled exactly like the Google / Bing / Apple listings. */}
        <address className="not-italic">
          <div className="font-brand text-[17px] tracking-[0.45em] text-noir/80" dir="ltr">
            {SITE.name}
          </div>
          <p className="mt-6 text-[14px] leading-[1.9] text-noir/60">
            <span dir="ltr">
              {SITE.street}
              <br />
              {SITE.zip} {SITE.city}-{SITE.district}
            </span>
            <br />
            {t.hoursLabel}
            <br />
            <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold-600">
              {SITE.email}
            </a>
            {SITE.phone ? (
              <>
                <br />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-gold-600">
                  <bdi>{SITE.phone}</bdi>
                </a>
              </>
            ) : null}
          </p>
        </address>

        <nav aria-label={l.topics} className="grid grid-cols-2 content-start gap-x-8 gap-y-3 sm:grid-cols-3">
          {topics.map((p) => (
            <a key={p.path} href={p.path} className={linkCls}>
              {p.nav}
            </a>
          ))}
          {locale === "de" ? (
            <a href="/ratgeber" className={linkCls}>
              {l.guides}
            </a>
          ) : null}
        </nav>

        <div className="grid content-start gap-8">
          {region.length ? (
            <nav aria-label={l.region} className="grid content-start gap-3">
              <div className="text-[10px] uppercase tracking-widest2 text-gold-600">{l.region}</div>
              {region.map((p) => (
                <a key={p.path} href={p.path} className={linkCls}>
                  {p.nav}
                </a>
              ))}
            </nav>
          ) : null}
          <nav aria-label={l.lang} className="grid content-start gap-3">
            <div className="text-[10px] uppercase tracking-widest2 text-gold-600">{l.lang}</div>
            <LanguageLinks locale={locale} alternates={alternates} className={linkCls} />
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1480px] flex-col items-center justify-between gap-6 border-t border-line px-6 pt-8 md:flex-row md:px-10">
        <div className="text-[10px] uppercase tracking-widest2 text-noir/35" dir="ltr">
          GLAMORA Hamburg · Dubai · © {new Date().getFullYear()}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] uppercase tracking-widest2 text-noir/45">
          <a href="/impressum" className="transition-colors hover:text-gold-600">{l.imprint}</a>
          <a href="/datenschutz" className="transition-colors hover:text-gold-600">{l.privacy}</a>
          {social.map(([key, href]) => (
            <a key={key} href={href} target="_blank" rel="noopener me" className="transition-colors hover:text-gold-600">
              {SOCIAL_LABEL[key]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
