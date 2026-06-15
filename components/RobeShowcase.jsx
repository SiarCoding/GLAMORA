"use client";

import { useMemo } from "react";
import { useScrollFrameSequence } from "@/hooks/useScrollFrameSequence";

/**
 * A scroll-driven robe vitrine — built per Scroll-Animation-Guide.md.
 *
 * The robe is a numbered WebP frame sequence drawn onto a <canvas> (NOT a video
 * element): section-relative scroll progress maps to a frame index, so the gown
 * turns exactly as fast as the user scrolls. The frames are background-free,
 * drawn on a transparent canvas, so the gown floats on the porcelain page with
 * nothing behind it. The gown sits centred in the viewport; the copy assembles
 * line by line in the side margin — alternating left / right per robe for an
 * editorial rhythm (see `textSide`).
 *
 * @param {object} robe
 * @param {string} robe.no         e.g. "Nº 01"
 * @param {string} robe.name       e.g. "Layla"
 * @param {string} robe.material   e.g. "Tüll · 600 Stunden Handarbeit"
 * @param {string} robe.body       supporting paragraph
 * @param {{k:string,v:string}[]} robe.specs  small spec rows
 * @param {string} robe.basePath   e.g. "/showroom/layla"
 * @param {number} robe.frameCount total frames in the sequence
 * @param {"left"|"right"} [textSide="left"] which margin the copy occupies
 */
export default function RobeShowcase({ robe, textSide = "left" }) {
  const { sectionRef, canvasRef, progress, firstFrameReady } =
    useScrollFrameSequence({
      basePath: robe.basePath,
      frameCount: robe.frameCount,
      fit: "contain",
      focalX: 0.5, // centred — the gown has its own centred stage column
      focalY: 0.5,
      // Heavier glide than the hero — a showroom turn should feel weighted.
      smoothing: 0.16,
    });

  // Copy assembles as the gown turns: each line reveals across its own window
  // of scroll progress and then holds, so the full composition is complete by
  // the time the robe finishes its rotation.
  const lines = useMemo(
    () => ({
      eyebrow: reveal(progress, 0.0, 0.12),
      name: reveal(progress, 0.05, 0.2),
      material: reveal(progress, 0.16, 0.32),
      body: reveal(progress, 0.26, 0.46),
      specs: reveal(progress, 0.42, 0.64),
      foot: reveal(progress, 0.62, 0.82),
    }),
    [progress]
  );

  // ── The gown stage. Full-bleed at every size so the frame is as large as
  //    possible — it fills the viewport height on tablet/desktop and the width
  //    on phones, always centred (focalX/Y 0.5) with the whole gown visible. ─
  const gown = (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`block h-full w-full transition-opacity duration-1000 ${
          firstFrameReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );

  // ── The copy. A compact caption floated top-right over the gown on phones /
  //    tablets (body + specs hidden, no scrim — the full image stays visible);
  //    a full side column, vertically centred, from lg up where the centred
  //    gown leaves wide margins. ────────────────────────────────────────────
  const copy = (
    <div
      className={`absolute inset-x-0 top-0 z-10 flex justify-end px-6 pt-20 sm:px-8 sm:pt-24 lg:inset-y-0 lg:items-center lg:pt-0 ${
        textSide === "left"
          ? "lg:justify-start lg:pl-10 xl:pl-24"
          : "lg:justify-end lg:pr-10 xl:pr-24"
      }`}
    >
      <div className="w-full max-w-[15rem] text-right sm:max-w-xs lg:max-w-md lg:text-left">
        {/* Eyebrow */}
        <div
          className="mb-3 flex flex-row-reverse items-center justify-end gap-3 sm:mb-5 lg:flex-row lg:justify-start lg:mb-6"
          style={revealStyle(lines.eyebrow)}
        >
          <span className="h-px w-8 bg-gold sm:w-10" />
          <span className="text-[9.5px] uppercase tracking-widest2 text-gold-600 sm:text-[10.5px]">
            Aus dem Showroom · Edition
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-display text-[30px] leading-[1.05] tracking-tight text-noir sm:text-[36px] lg:text-[42px] xl:text-[52px]"
          style={revealStyle(lines.name)}
        >
          {robe.name}
        </h3>

        {/* Material */}
        <p
          className="mt-2.5 font-display text-[13.5px] italic leading-snug text-gold-500 sm:mt-4 sm:text-[15px] lg:mt-5 lg:text-[18px]"
          style={revealStyle(lines.material)}
        >
          {robe.material}
        </p>

        {/* Body — hidden below lg to keep the mobile caption compact. */}
        <p
          className="mt-7 hidden max-w-md text-[14px] leading-[1.85] text-noir/60 lg:block lg:text-[15px]"
          style={revealStyle(lines.body)}
        >
          {robe.body}
        </p>

        {/* Specs — lg and up only. */}
        <div
          className="mt-10 hidden max-w-md grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-8 lg:grid"
          style={revealStyle(lines.specs)}
        >
          {robe.specs.map((s) => (
            <div key={s.k}>
              <dt className="text-[9.5px] uppercase tracking-widest2 text-noir/35">
                {s.k}
              </dt>
              <dd className="mt-1.5 text-[13px] text-noir/75">{s.v}</dd>
            </div>
          ))}
        </div>

        {/* Footer line / CTA */}
        <div
          className="mt-4 flex items-center justify-end gap-4 sm:mt-6 lg:mt-10 lg:justify-start"
          style={revealStyle(lines.foot)}
        >
          <a
            href="#anprobe"
            className="group inline-flex items-center gap-3 text-[10.5px] uppercase tracking-widest2 text-noir transition-colors hover:text-gold-600 sm:text-[11px]"
          >
            Diese Robe anfragen
            <span className="h-px w-8 bg-noir/40 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-porcelain">
        {gown}
        {copy}
      </div>
    </section>
  );
}

/**
 * Smoothstep reveal: returns 0..1 as `progress` crosses [start, end].
 * Holds at 1 afterwards — lines assemble and stay.
 */
function reveal(progress, start, end) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  const t = (progress - start) / (end - start);
  return t * t * (3 - 2 * t);
}

function revealStyle(t) {
  return {
    opacity: t,
    transform: `translate3d(0, ${(1 - t) * 18}px, 0)`,
    transition: "opacity 160ms linear, transform 160ms linear",
    willChange: "opacity, transform",
  };
}
