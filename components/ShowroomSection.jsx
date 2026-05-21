const TILES = [
  { tag: "Nº 01", name: "Khaleeji Noir", note: "Seidenkrepp · Onyx-Stickerei" },
  { tag: "Nº 02", name: "Layla", note: "Tüll · 600 Std. Handarbeit" },
  { tag: "Nº 03", name: "Mirage", note: "Mikado · Goldfaden" },
  { tag: "Nº 04", name: "Saharan Dusk", note: "Seidensamt · Messing-Paillette" },
  { tag: "Nº 05", name: "Oud", note: "Organza · Perle, von Hand gesetzt" },
  { tag: "Nº 06", name: "Reserviert", note: "Private Anfertigung" },
];

export default function ShowroomSection() {
  return (
    <section id="showroom" className="relative bg-black py-32 md:py-44">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[10.5px] uppercase tracking-widest2 text-gold">
                Der Showroom
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-[40px] leading-[1.05] tracking-tight text-bone md:text-[60px]">
              Sechs Roben. <span className="italic text-gold/90">Sechs</span> Abende.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-[1.75] text-bone/55">
            Jede Saison enthüllen wir eine nummerierte Edition. In der finalen Version animieren sich die Kacheln zu scroll-gesteuerten Robenszenen.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-gold/15 md:grid-cols-3">
          {TILES.map((tile, i) => (
            <article
              key={tile.tag}
              className="group relative aspect-[3/4] overflow-hidden bg-ink-700"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(212,175,55,0.10),transparent_55%)] transition-opacity duration-700 group-hover:opacity-70" />

              <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-gold/40" />
              <span className="absolute right-4 top-4 h-3 w-3 border-r border-t border-gold/40" />
              <span className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-gold/40" />
              <span className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-gold/40" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6">
                <span className="text-[10px] uppercase tracking-widest2 text-gold/80">
                  {tile.tag}
                </span>
                <span className="text-[10px] uppercase tracking-widest2 text-bone/40">
                  HH · {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 px-6 pb-6">
                <div className="h-px w-full origin-left scale-x-0 bg-gold/40 transition-transform duration-700 group-hover:scale-x-100" />
                <h3 className="mt-5 font-display text-[28px] leading-tight text-bone md:text-[32px]">
                  {tile.name}
                </h3>
                <p className="mt-2 text-[12px] tracking-wide text-bone/45">
                  {tile.note}
                </p>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/0 to-black/0 transition-opacity duration-700 group-hover:from-black/90" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
