"use client";

import { useRef } from "react";
import { useScrollVar } from "@/hooks/useScrollVar";

// Act III — „Für jeden Anlass". One oversized line per occasion, each riding its
// own scroll progress: even rows drift right, odd rows drift left, so the block
// reads like title cards passing on alternating tracks. Rows are full-bleed;
// only the intro and the close sit in the content column.
const OCCASIONS = [
  { word: "Hochzeit", line: "Der eine Tag. Die eine Robe." },
  { word: "Verlobung", line: "Ein Versprechen, das man sieht." },
  { word: "Henna-Abend", line: "Gold, Licht und die Nacht davor." },
  { word: "Gala", line: "Wenn der Saal den Atem anhält." },
  { word: "Abiball", line: "Der erste große Auftritt." },
];

function OccasionRow({ word, line, index }) {
  const ref = useRef(null);
  useScrollVar(ref, { mode: "view", smoothing: 0.16 });
  const right = index % 2 === 1;

  return (
    <li
      ref={ref}
      style={{ "--p": 0.5 }}
      className="group border-t border-line last:border-b"
    >
      <a
        href="#anprobe"
        className={`flex flex-col gap-3 px-6 py-6 sm:px-8 sm:py-8 md:flex-row md:items-baseline md:justify-between md:gap-10 md:px-[5vw] md:py-10 ${
          right ? "items-end text-right md:flex-row-reverse" : ""
        }`}
      >
        <h2
          className={`occasion-word whitespace-nowrap font-display leading-[0.9] tracking-tight text-noir transition-colors duration-500 group-hover:text-gold-500 ${
            right ? "occasion-word--left" : "occasion-word--right"
          }`}
        >
          {word}
        </h2>
        <p
          className={`max-w-xs text-[13px] leading-[1.7] text-noir/50 sm:text-[14px] ${
            right ? "md:text-left" : "md:text-right"
          }`}
        >
          {line}
        </p>
      </a>
    </li>
  );
}

export default function OccasionsBand() {
  return (
    <div className="relative overflow-hidden bg-porcelain pb-28 pt-24 sm:pb-36 sm:pt-32 md:pb-44 md:pt-40">
      <div className="mx-auto mb-10 max-w-[1480px] px-6 sm:mb-14 sm:px-8 md:px-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold sm:w-10" />
          <span className="text-[9.5px] uppercase tracking-widest2 text-gold-600 sm:text-[10.5px]">
            Für jeden Anlass
          </span>
        </div>
      </div>

      <ul>
        {OCCASIONS.map((o, i) => (
          <OccasionRow key={o.word} index={i} {...o} />
        ))}
      </ul>

      {/* Close — one question, one action */}
      <div className="mx-auto mt-20 flex max-w-[1480px] flex-col gap-8 px-6 sm:px-8 md:mt-28 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-display text-[30px] leading-[1.08] tracking-tight text-noir sm:text-[38px] md:text-[48px]">
            Welcher Abend{" "}
            <span className="italic text-gold-500">ist Ihrer?</span>
          </p>
          <p className="mt-4 max-w-sm text-[13.5px] leading-[1.75] text-noir/55">
            Persönliche Beratung im Showroom Hamburg — nach Termin, mit Zeit
            für jede Naht.
          </p>
        </div>
        <a
          href="#anprobe"
          className="group inline-flex items-center gap-3 self-start text-[10.5px] uppercase tracking-widest2 text-noir transition-colors hover:text-gold-600 sm:text-[11px] md:self-auto"
        >
          Anprobe vereinbaren
          <span className="h-px w-8 bg-noir/40 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />
        </a>
      </div>
    </div>
  );
}
