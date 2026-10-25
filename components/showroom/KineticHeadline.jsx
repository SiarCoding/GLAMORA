"use client";

import { useRef } from "react";
import { useScrollVar } from "@/hooks/useScrollVar";

/**
 * Act I of the showroom — the headline as a pinned, kinetic title card.
 *
 * The stage sticks for ~1.2 viewports while `--p` runs 0 → 1. "Treten Sie
 * näher." travels left → right across the full width, "Im Detail." counters
 * right → left in gold italic, both with a faint rotateY so the lines read as
 * planes swinging past the camera. A stroke-only "Showroom" sits deepest and
 * moves slowest — three layers, three speeds, that's the depth.
 * All motion is CSS `calc()` against `--p` (see globals.css, .kinetic-*).
 */
export default function KineticHeadline() {
  const ref = useRef(null);
  useScrollVar(ref, { mode: "pin", smoothing: 0.14 });

  return (
    <div ref={ref} className="relative h-[220vh]" style={{ "--p": 0 }}>
      <div className="grain sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden bg-porcelain">
        {/* Deepest plane */}
        <span aria-hidden="true" className="kinetic-ghost font-display">
          Showroom
        </span>

        {/* Top meta row */}
        <div className="absolute inset-x-6 top-24 flex items-center justify-between sm:inset-x-8 sm:top-28 md:inset-x-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold sm:w-10" />
            <span className="whitespace-nowrap text-[9.5px] uppercase tracking-widest2 text-gold-600 sm:text-[10.5px]">
              Der Showroom
            </span>
          </div>
          <span className="hidden whitespace-nowrap text-[9.5px] uppercase tracking-widest2 text-noir/40 sm:inline sm:text-[10.5px]">
            Hamburg · Nach Termin
          </span>
        </div>

        {/* The headline — full-bleed, two counter-moving planes */}
        <h2 className="kinetic-h relative z-10 font-display tracking-tight text-noir">
          <span className="kinetic-line kinetic-line--a">Treten Sie näher.</span>
          <span className="kinetic-line kinetic-line--b italic text-gold-500">
            Im Detail.
          </span>
        </h2>

        {/* Bottom HUD: scroll cue + progress hairline + robe count */}
        <div className="absolute inset-x-6 bottom-10 sm:inset-x-8 md:inset-x-10">
          <div className="mb-4 flex items-end justify-between">
            <span className="text-[9.5px] uppercase tracking-widest2 text-noir/40">
              Scrollen
            </span>
            <span className="font-display text-[11px] italic tracking-wide text-noir/40">
              Nº 01 — 02
            </span>
          </div>
          <div className="h-px w-full bg-line">
            <div className="kinetic-rule h-full origin-left bg-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
