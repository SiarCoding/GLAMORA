import RobeVideo from "@/components/RobeVideo";

const TILES = [
  {
    tag: "Nº 01",
    name: "Khaleeji Noir",
    note: "Seidenkrepp · Onyx-Stickerei",
    video: "/khaleeji-noir.webm",
    poster: "/khaleeji-noir-poster.png",
  },
  {
    tag: "Nº 02",
    name: "Layla",
    note: "Tüll · 600 Std. Handarbeit",
    video: "/layla.webm",
    poster: "/layla-poster.png",
  },
  { tag: "Nº 03", name: "Mirage", note: "Mikado · Goldfaden" },
  { tag: "Nº 04", name: "Saharan Dusk", note: "Seidensamt · Messing-Paillette" },
  { tag: "Nº 05", name: "Oud", note: "Organza · Perle, von Hand gesetzt" },
  { tag: "Nº 06", name: "Reserviert", note: "Private Anfertigung" },
];

export default function ShowroomSection() {
  return (
    <section id="showroom" className="relative bg-porcelain py-32 md:py-44">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[10.5px] uppercase tracking-widest2 text-gold-600">
                Der Showroom
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-[40px] leading-[1.05] tracking-tight text-noir md:text-[60px]">
              Sechs Roben. <span className="italic text-gold-500">Sechs</span> Abende.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-[1.75] text-noir/55">
            Jede Saison enthüllen wir eine nummerierte Edition — jede Robe einer
            einzigen Frau vorbehalten. Eine nach der anderen erwacht in Bewegung.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {TILES.map((tile, i) => (
            <article
              key={tile.tag}
              className="group relative aspect-[3/5] overflow-hidden border border-line bg-mist shadow-[0_30px_60px_-38px_rgba(26,22,17,0.22)]"
            >
              {/* Light porcelain display gradient backing each robe. */}
              <div className="card-light pointer-events-none absolute inset-0 transition-opacity duration-700 group-hover:opacity-90" />

              {/* Empty stages: a faint numeral placard so the slot reads as
                  "awaiting its film" rather than unfinished. */}
              {!tile.video ? (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[120px] leading-none text-noir/[0.06] md:text-[170px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : null}

              {/* Background-free robe — plays once when its tile scrolls into
                  view (see RobeVideo), spotlit on the dark stage. */}
              {tile.video ? (
                <RobeVideo
                  src={tile.video}
                  poster={tile.poster}
                  speed={1.6}
                  className="absolute inset-0 h-full w-full scale-100 object-contain object-bottom transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              ) : null}

              {/* Foot scrim so the title reads over the robe. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#ebe4d6] via-[#ebe4d6]/55 to-transparent" />

              <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-gold/50" />
              <span className="absolute right-4 top-4 h-3 w-3 border-r border-t border-gold/50" />
              <span className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-gold/50" />
              <span className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-gold/50" />

              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-6">
                <span className="text-[10px] uppercase tracking-widest2 text-gold-600">
                  {tile.tag}
                </span>
                <span className="text-[10px] uppercase tracking-widest2 text-noir/30">
                  HH · {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-6">
                <div className="h-px w-full origin-left scale-x-0 bg-gold/60 transition-transform duration-700 group-hover:scale-x-100" />
                <h3 className="mt-5 font-display text-[28px] leading-tight text-noir md:text-[32px]">
                  {tile.name}
                </h3>
                <p className="mt-2 text-[12px] tracking-wide text-noir/55">
                  {tile.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
