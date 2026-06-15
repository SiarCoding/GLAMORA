import RobeScrollBlock from "@/components/RobeScrollBlock";

// Section 2 — „Der Showroom".
// Two scroll-driven chapters, built on the canvas image-sequence technique from
// Scroll-Animation-Guide.md. As you scroll, each background-free robe is scrubbed
// frame-by-frame on the left while its copy reveals on the right:
//   1. Das Abendkleid — the green evening gown (Khaleeji Noir)
//   2. Die Abaya       — the beige abaya (Layla)
const CHAPTERS = [
  {
    basePath: "/abendkleid-sequence",
    frameCount: 73,
    tag: "Nº 01",
    eyebrow: "Das Abendkleid",
    title: "Khaleeji Noir",
    note: "Seidenkrepp · Onyx-Stickerei",
    body: "Eine schulterfreie Robe aus olivgrünem Seidenkrepp, deren Saum in tausenden von Hand gesetzten Kristallen ausläuft. Drehen Sie sie im Licht.",
  },
  {
    basePath: "/abaya-sequence",
    frameCount: 73,
    tag: "Nº 02",
    eyebrow: "Die Abaya",
    title: "Layla",
    note: "Seidenkrepp · Goldborte, von Hand gesetzt",
    body: "Fließender Seidenkrepp in warmem Sand, gefasst von einer schmalen, handgestickten Goldborte. Zurückhaltung als höchste Form der Eleganz.",
  },
];

export default function ShowroomSection() {
  return (
    <section id="showroom" className="relative bg-porcelain">
      {/* Intro header. */}
      <div className="mx-auto max-w-[1480px] px-6 pt-28 md:px-10 md:pt-44">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[10.5px] uppercase tracking-widest2 text-gold-600">
                Der Showroom
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-[34px] leading-[1.05] tracking-tight text-noir md:text-[60px]">
              Zwei Silhouetten.{" "}
              <span className="italic text-gold-500">Eine</span> Handschrift.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-[1.75] text-noir/55">
            Scrollen Sie — und jede Robe dreht sich langsam ins Licht. Vom
            schulterfreien Abendkleid bis zur fließenden Abaya, Bild für Bild
            enthüllt.
          </p>
        </div>
      </div>

      {/* The two scroll chapters. */}
      <div className="mt-8 md:mt-16">
        {CHAPTERS.map((c) => (
          <RobeScrollBlock key={c.basePath} {...c} />
        ))}
      </div>
    </section>
  );
}
