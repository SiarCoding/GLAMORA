const NUMBERS = [
  { value: "+ 600", label: "Stunden Handarbeit" },
  { value: "12", label: "Atelierhände pro Robe" },
  { value: "1 : 1", label: "Exklusiv für eine Kundin" },
];

export default function CraftSection() {
  return (
    <section
      id="handwerk"
      className="relative overflow-hidden bg-mist py-32 md:py-44"
    >
      <div className="absolute inset-x-0 top-0 h-px rule-gold" />

      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[10.5px] uppercase tracking-widest2 text-gold-600">
              Das Handwerk
            </span>
          </div>
          <h2 className="font-display text-[40px] leading-[1.05] tracking-tight text-noir md:text-[60px]">
            Ein einzelner
            <br />
            <span className="italic text-gold-500">Kristall</span>
            <br />
            nach dem anderen.
          </h2>
          <p className="mt-8 max-w-md text-[14px] leading-[1.8] text-noir/60">
            In unseren Partnerateliers in Dubai komponieren Meister­stickerinnen jede Robe mit der Geduld einer Kalligrafin. Glasperlen aus Böhmen. Seide aus Lyon. Pailletten, gezogen auf Silberdraht.
          </p>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-10">
            {NUMBERS.map((n) => (
              <div key={n.label}>
                <dt className="font-display text-[26px] text-gold-600 md:text-[32px]">
                  {n.value}
                </dt>
                <dd className="mt-2 text-[10.5px] uppercase tracking-widest2 text-noir/45">
                  {n.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Macro-detail video placeholder — drop a <video> here in production */}
        <div className="md:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-linen shadow-[0_30px_80px_-40px_rgba(26,22,17,0.25)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.20),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(212,175,55,0.10),transparent_55%)]" />

            <div className="absolute inset-6 border border-gold/20" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-8 pb-8">
              <div>
                <div className="text-[10px] uppercase tracking-widest2 text-gold-600">
                  Makro · 04:32
                </div>
                <div className="mt-2 font-display text-[22px] text-noir">
                  Das Stickerei-Reel
                </div>
              </div>
              <button
                aria-label="Makro-Film abspielen"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold-600 transition-all hover:bg-gold hover:text-black"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                  <path d="M2 1l11 6-11 6V1z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
