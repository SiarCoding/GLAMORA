import RobeShowcase from "@/components/RobeShowcase";

// Section 2 — „Der Showroom".
// The grid of small cards is gone. Each gown now gets a full scroll-driven
// vitrine (see RobeShowcase): the frame sequence turns on a dark plinth on the
// left while the copy assembles on the porcelain right. Only the two robes with
// footage are featured; the edition narrative continues in SechsRobenSection.
const ROBES = [
  {
    no: "Nº 01",
    name: "Khaleeji Noir",
    material: "Seidenkrepp · Onyx-Stickerei",
    body: "Eine Carmen-Schulter aus schwerem Seidenkrepp, die in einen Wasserfall handgesetzter Onyx- und Glasperlen übergeht. Sechshundert Stunden, eine einzige Naht nach der anderen.",
    basePath: "/showroom/khaleeji",
    frameCount: 73,
    focalX: 0.5,
    specs: [
      { k: "Material", v: "Seidenkrepp · Glasperle" },
      { k: "Handarbeit", v: "ca. 600 Stunden" },
      { k: "Edition", v: "Eins von Eins" },
      { k: "Atelier", v: "Dubai · Hamburg" },
    ],
  },
  {
    no: "Nº 02",
    name: "Layla",
    material: "Tüll · 600 Stunden Handarbeit",
    body: "Fließender Seidentüll in warmem Sand, gehalten von einer Goldfaden-Borte, die der Silhouette vom Nacken bis zum Saum folgt. Leicht wie Atem, gebaut für einen einzigen Auftritt.",
    basePath: "/showroom/layla",
    frameCount: 73,
    focalX: 0.5,
    specs: [
      { k: "Material", v: "Seidentüll · Goldfaden" },
      { k: "Handarbeit", v: "ca. 600 Stunden" },
      { k: "Edition", v: "Eins von Eins" },
      { k: "Atelier", v: "Dubai · Hamburg" },
    ],
  },
];

export default function ShowroomSection() {
  return (
    <section id="showroom" className="relative bg-porcelain">
      {/* Intro header */}
      <div className="mx-auto max-w-[1480px] px-6 pb-4 pt-24 sm:px-8 sm:pt-32 md:px-10 md:pt-44">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="h-px w-8 bg-gold sm:w-10" />
              <span className="text-[9.5px] uppercase tracking-widest2 text-gold-600 sm:text-[10.5px]">
                Der Showroom
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-[32px] leading-[1.07] tracking-tight text-noir sm:text-[40px] md:text-[52px] lg:text-[60px]">
              Treten Sie näher.{" "}
              <span className="italic text-gold-500">Im Detail.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[13.5px] leading-[1.7] text-noir/55 sm:text-[14px] sm:leading-[1.75]">
            Jede Robe dreht sich langsam unter dem Licht, während Sie scrollen —
            Naht für Naht, von der Rückseite bis zum ersten Blick.
          </p>
        </div>
      </div>

      {/* One scroll-driven vitrine per robe — gown centred, copy alternating
          left / right for an editorial rhythm. */}
      {ROBES.map((robe, i) => (
        <RobeShowcase
          key={robe.name}
          robe={robe}
          textSide={i % 2 === 0 ? "left" : "right"}
        />
      ))}
    </section>
  );
}
