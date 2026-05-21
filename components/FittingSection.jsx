export default function FittingSection() {
  return (
    <section
      id="anprobe"
      className="relative overflow-hidden bg-black py-40 md:py-56"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold" />
          <span className="text-[10.5px] uppercase tracking-widest2 text-gold">
            Die Anprobe
          </span>
          <span className="h-px w-10 bg-gold" />
        </div>

        <h2 className="font-display text-[44px] leading-[1.05] tracking-tight text-bone md:text-[72px]">
          Vereinbaren Sie einen
          <br />
          <span className="italic text-gold">exklusiven</span> Termin.
        </h2>

        <p className="mx-auto mt-8 max-w-lg text-[14px] leading-[1.85] text-bone/55">
          Unser Hamburger Atelier empfängt jeweils eine einzige Kundin. Champagner wird serviert. Die Roben werden privat präsentiert. Das Gespräch bleibt unbeschwert von der Zeit.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">
          <a
            href="mailto:atelier@glamora.hamburg"
            className="group relative inline-flex items-center justify-center gap-4 overflow-hidden bg-gold px-10 py-5 text-[11px] uppercase tracking-widest2 text-black transition-all hover:bg-gold-300"
          >
            <span className="absolute inset-0 -translate-x-full bg-bone transition-transform duration-700 group-hover:translate-x-0" />
            <span className="relative">Exklusiven Termin buchen</span>
            <span aria-hidden className="relative h-px w-6 bg-current transition-all group-hover:w-10" />
          </a>
          <a
            href="tel:+494012345678"
            className="text-[11px] uppercase tracking-widest2 text-bone/60 transition-colors hover:text-gold"
          >
            oder anrufen · +49 40 1234 5678
          </a>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-10 border-t border-gold/15 pt-12 text-left md:grid-cols-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest2 text-gold/80">
              Atelier
            </div>
            <div className="mt-3 font-display text-[18px] text-bone">
              Neuer Wall, Hamburg
            </div>
            <div className="mt-1 text-[12px] text-bone/45">Nur nach Vereinbarung</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest2 text-gold/80">
              Öffnungszeiten
            </div>
            <div className="mt-3 font-display text-[18px] text-bone">
              Di — Sa · 11—19 Uhr
            </div>
            <div className="mt-1 text-[12px] text-bone/45">Private Termine auf Anfrage</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest2 text-gold/80">
              Kontakt
            </div>
            <div className="mt-3 font-display text-[18px] text-bone">
              atelier@glamora.hamburg
            </div>
            <div className="mt-1 text-[12px] text-bone/45">Diskretion versteht sich</div>
          </div>
        </div>
      </div>
    </section>
  );
}
