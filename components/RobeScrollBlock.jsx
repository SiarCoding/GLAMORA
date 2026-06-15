"use client";

import { useScrollFrameSequence } from "@/hooks/useScrollFrameSequence";

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/**
 * One scroll-driven robe chapter — centred composition.
 *
 * A tall scroll container pins a viewport-high stage. The background-free robe
 * is scrubbed frame-by-frame on a canvas dead-centre, big, while the copy sits
 * to its left and right (stacked below on mobile). Built on the same
 * image-sequence-on-canvas technique as the hero — see Scroll-Animation-Guide.md
 * — drawn with a "contain" fit so the cut-out robe never loses a sleeve or hem.
 *
 * @param {object} props
 * @param {string} props.basePath     frame folder, e.g. "/abaya-sequence"
 * @param {number} props.frameCount   number of frames in the folder
 * @param {string} props.tag          small caps tag, e.g. "Nº 01"
 * @param {string} props.eyebrow      small caps category, e.g. "Das Abendkleid"
 * @param {string} props.title        display name
 * @param {string} props.note         materials line
 * @param {string} props.body         supporting paragraph
 */
export default function RobeScrollBlock({
  basePath,
  frameCount,
  tag,
  eyebrow,
  title,
  note,
  body,
}) {
  const { sectionRef, canvasRef, progress, firstFrameReady } =
    useScrollFrameSequence({
      basePath,
      frameCount,
      fit: "contain",
      focalY: 0.5,
      // The frames carry baked-in breathing room; a touch more keeps the head
      // clear of the fixed nav and the hem clear of the lower edge.
      padding: 0.05,
      smoothing: 0.13,
    });

  // Copy eases in over the first third of the chapter, then holds.
  const reveal = clamp((progress - 0.06) / 0.22, 0, 1);
  const revealStyle = {
    opacity: reveal,
    transform: `translate3d(0, ${(1 - reveal) * 22}px, 0)`,
  };

  return (
    <div ref={sectionRef} className="relative h-[230vh] md:h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        {/* Oversized title watermark, dead-centre behind the robe. */}
        <h3
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center text-center font-display leading-[0.9] tracking-tight text-noir/[0.06] text-[22vw] md:text-[15vw]"
          style={{ opacity: 0.5 + reveal * 0.5 }}
        >
          {title}
        </h3>

        {/* ── Centre: the robe ──────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="block h-[62svh] w-[78vw] sm:w-[58vw] md:h-full md:w-[38vw] lg:w-[32vw]"
          />
        </div>

        {/* Loader veil. */}
        <div
          className={`pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-porcelain transition-opacity duration-700 ${
            firstFrameReady ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-[10px] uppercase tracking-widest2 text-noir/30">
            {tag}
          </span>
        </div>

        {/* ── Flanking copy (desktop): left rail + right rail ───────── */}
        <div className="absolute inset-0 z-20 hidden md:block">
          {/* Left rail — category + tag, right-aligned toward the robe. */}
          <div
            className="absolute left-0 top-1/2 w-[31%] -translate-y-1/2 px-8 text-right lg:px-14 will-change-[transform,opacity]"
            style={revealStyle}
          >
            <div className="mb-4 flex items-center justify-end gap-3">
              <span className="text-[10.5px] uppercase tracking-widest2 text-gold-600">
                {eyebrow}
              </span>
              <span className="h-px w-10 bg-gold" />
            </div>
            <div className="font-display text-[64px] leading-none text-noir/10 lg:text-[88px]">
              {tag.replace(/^Nº\s*/, "")}
            </div>
            <div className="mt-3 text-[11px] uppercase tracking-widest2 text-noir/35">
              {tag}
            </div>
          </div>

          {/* Right rail — name, materials, description. */}
          <div
            className="absolute right-0 top-1/2 w-[31%] -translate-y-1/2 px-8 text-left lg:px-14 will-change-[transform,opacity]"
            style={revealStyle}
          >
            <h4 className="font-display text-[40px] leading-[1.02] tracking-tight text-noir lg:text-[56px]">
              {title}
            </h4>
            <p className="mt-4 text-[12px] uppercase tracking-widest2 text-gold-600">
              {note}
            </p>
            {body ? (
              <p className="mt-5 max-w-xs text-[14px] leading-[1.8] text-noir/55">
                {body}
              </p>
            ) : null}
            <div className="mt-8 h-px w-40 overflow-hidden bg-line">
              <div
                className="h-full bg-gradient-to-r from-gold/40 via-gold to-gold-500"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Stacked copy (mobile): below the robe, centred ────────── */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-6 pb-10 text-center md:hidden will-change-[transform,opacity]"
          style={revealStyle}
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-[10px] uppercase tracking-widest2 text-gold-600">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h4 className="font-display text-[34px] leading-[1.04] tracking-tight text-noir">
            {title}
          </h4>
          <p className="mt-2 text-[10.5px] uppercase tracking-widest2 text-gold-600">
            {note}
          </p>
          <div className="mt-5 h-px w-28 overflow-hidden bg-line">
            <div
              className="h-full bg-gradient-to-r from-gold/40 via-gold to-gold-500"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
