import { SITE } from "@/lib/site";
import { PAGES } from "@/lib/pages";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-mist pb-12 pt-20">
      <div className="mx-auto grid max-w-[1480px] gap-12 px-6 md:grid-cols-[1.2fr_2fr] md:px-10">
        {/* NAP — spelled exactly like the Google / Bing / Apple listings. */}
        <address className="not-italic">
          <div className="font-brand text-[17px] tracking-[0.45em] text-noir/80">
            {SITE.name}
          </div>
          <p className="mt-6 text-[14px] leading-[1.9] text-noir/60">
            {SITE.street}
            <br />
            {SITE.zip} {SITE.city}
            <br />
            {SITE.hoursLabel}
            <br />
            <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold-600">
              {SITE.email}
            </a>
            {SITE.phone ? (
              <>
                <br />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-gold-600">
                  {SITE.phone}
                </a>
              </>
            ) : null}
          </p>
        </address>

        <nav aria-label="Themen" className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
          {PAGES.map((p) => (
            <a
              key={p.slug}
              href={`/${p.slug}`}
              className="text-[11px] uppercase tracking-[0.2em] text-noir/55 transition-colors hover:text-gold-600"
            >
              {p.nav}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1480px] flex-col items-center justify-between gap-6 border-t border-line px-6 pt-8 md:flex-row md:px-10">
        <div className="text-[10px] uppercase tracking-widest2 text-noir/35">
          Hamburg · Dubai · © {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest2 text-noir/45">
          <a href="#" className="hover:text-gold-600 transition-colors">Impressum</a>
          <a href="#" className="hover:text-gold-600 transition-colors">Datenschutz</a>
          <a href="#" className="hover:text-gold-600 transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
