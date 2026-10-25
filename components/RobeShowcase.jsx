"use client";

import { useMemo } from "react";
import { useScrollFrameSequence } from "@/hooks/useScrollFrameSequence";

/**
 * A scroll-driven robe vitrine — built per Scroll-Animation-Guide.md.
 *
 * The robe is a numbered WebP frame sequence drawn onto a <canvas> (NOT a video
 * element): section-relative scroll progress maps to a frame index, so the gown
 * turns exactly as fast as the user scrolls. The frames are background-free,
 * so the gown floats between two type planes: an oversized occasion word
 * behind it and a hairline-stroke twin in front, drifting at different rates.
 * That parallax — plus a floor shadow and a key light that tracks the turn —
 * is what makes the stage read as a room rather than a flat image.
 *
 * Copy is occasion-led marketing, not a spec sheet: eyebrow, name, one
 * headline, one paragraph, one proof line, one CTA. It assembles line by line
 * in the side margin — alternating left / right per robe (see `textSide`).
 *
 * @param {object} robe
 * @param {string} robe.no          e.g. "Nº 01"
 * @param {string} robe.name        e.g. "Abayas"
 * @param {string} robe.occasion    e.g. "Für die Gala"
 * @param {{word:string,size:string}} robe.backdrop  giant word behind the gown
 * @param {string} robe.headline    marketing headline, first part
 * @param {string} robe.accent      headline close, set italic gold
 * @param {string} robe.body        one supporting paragraph
 * @param {string} robe.proof       one-line credibility marker
 * @param {string} robe.cta         CTA label
 * @param {string} [robe.href="#anprobe"] CTA target
 * @param {string} robe.basePath    e.g. "/showroom/layla"
 * @param {number} robe.frameCount  total frames in the sequence
 * @param {"left"|"right"} [textSide="left"] which margin the copy occupies
 * @param {import("react").RefObject<HTMLElement>} [scrollRef] shared scroll
 *   wrapper — renders only the stage panel (no own 300vh section), driven by
 *   the `range` slice of that wrapper's progress (see CollectionsSlider)
 * @param {[number, number]} [range]
 */
export default function RobeShowcase({ robe, textSide = "left", scrollRef, range }) {
  const { sectionRef, canvasRef, progress, firstFrameReady } =
    useScrollFrameSequence({
      basePath: robe.basePath,
      frameCount: robe.frameCount,
      scrollRef,
      range,
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
      headline: reveal(progress, 0.16, 0.36),
      body: reveal(progress, 0.3, 0.5),
      proof: reveal(progress, 0.44, 0.62),
      foot: reveal(progress, 0.56, 0.76),
    }),
    [progress]
  );

  // Rotation readout + light/shadow keyed to the turn. The sequence covers a
  // full 360°, so the shadow is widest side-on (90° / 270°) and the key light
  // drifts across as the gown comes round.
  const deg = Math.round(progress * 360);
  const side = Math.abs(Math.sin(progress * Math.PI * 2)); // 0 front/back, 1 side-on
  const drift = (progress - 0.5) * 2; // -1 .. 1

  // ── Depth planes: word behind, stroke twin in front. ─────────────────────
  const backdrop = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden"
    >
      <span
        className="whitespace-nowrap font-display leading-none text-noir/[0.055]"
        style={{
          fontSize: robe.backdrop.size,
          transform: `translate3d(${drift * -14}vw, 0, 0)`,
          willChange: "transform",
        }}
      >
        {robe.backdrop.word}
      </span>
    </div>
  );

  const foreground = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 hidden select-none items-center justify-center overflow-hidden lg:flex"
    >
      <span
        className="stroke-word whitespace-nowrap font-display leading-none"
        style={{
          fontSize: robe.backdrop.size,
          transform: `translate3d(${drift * 9}vw, 0, 0)`,
          willChange: "transform",
        }}
      >
        {robe.backdrop.word}
      </span>
    </div>
  );

  // ── Light & floor. ───────────────────────────────────────────────────────
  const light = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background: `radial-gradient(ellipse 46% 42% at ${50 + drift * 10}% -4%, rgba(212,175,55,0.16), transparent 70%)`,
      }}
    />
  );

  const floor = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[1.5%] left-1/2 z-0 h-[5vh] w-[44vw] rounded-[100%] bg-noir blur-3xl transition-opacity duration-1000 lg:w-[26vw]"
      style={{
        opacity: firstFrameReady ? 0.12 + side * 0.06 : 0,
        transform: `translate3d(-50%, 0, 0) scaleX(${0.82 + side * 0.34})`,
        willChange: "transform, opacity",
      }}
    />
  );

  // ── The gown stage. Full-bleed from lg up, where the centred gown leaves
  //    wide side margins for the copy. Below lg the copy sits above the gown
  //    instead, so the canvas box starts at 24% and the frame — contain-fit,
  //    always whole — lands in the lower three quarters. ──────────────────────
  const gown = (
    <div className="absolute inset-x-0 bottom-0 top-[24%] z-10 lg:inset-0">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`block h-full w-full transition-opacity duration-1000 ${
          firstFrameReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );

  // ── The copy. A compact caption in the free band above the gown on phones /
  //    tablets (body + proof hidden); a full side column, vertically centred,
  //    from lg up. ───────────────────────────────────────────────────────────
  const copy = (
    <div
      className={`absolute inset-x-0 top-0 z-30 flex px-6 pt-20 sm:px-8 sm:pt-24 lg:inset-y-0 lg:items-center lg:pt-0 ${
        textSide === "left"
          ? "lg:justify-start lg:pl-10 xl:pl-24"
          : "lg:justify-end lg:pr-10 xl:pr-24"
      }`}
    >
      <div className="w-full max-w-[22rem] sm:max-w-sm lg:max-w-md">
        {/* Eyebrow — number + occasion */}
        <div
          className="mb-3 flex items-center gap-3 sm:mb-4 lg:mb-6"
          style={revealStyle(lines.eyebrow)}
        >
          <span className="h-px w-8 bg-gold sm:w-10" />
          <span className="text-[9.5px] uppercase tracking-widest2 text-gold-600 sm:text-[10.5px]">
            {robe.no} · {robe.occasion}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-display text-[28px] leading-[1.05] tracking-tight text-noir sm:text-[36px] lg:text-[42px] xl:text-[52px]"
          style={revealStyle(lines.name)}
        >
          {robe.name}
        </h3>

        {/* Headline — the marketing line, accent set in gold italic */}
        <p
          className="mt-2 font-display text-[17px] leading-[1.25] tracking-tight text-noir/85 sm:mt-4 sm:text-[19px] lg:mt-6 lg:text-[26px] xl:text-[30px]"
          style={revealStyle(lines.headline)}
        >
          {robe.headline}{" "}
          <span className="italic text-gold-500">{robe.accent}</span>
        </p>

        {/* Body — hidden below lg to keep the mobile caption compact. */}
        <p
          className="mt-7 hidden max-w-md text-[14px] leading-[1.85] text-noir/60 lg:block lg:text-[15px]"
          style={revealStyle(lines.body)}
        >
          {robe.body}
        </p>

        {/* Proof — lg and up only. */}
        <p
          className="mt-8 hidden border-t border-line pt-6 text-[10px] uppercase tracking-widest2 text-noir/40 lg:block"
          style={revealStyle(lines.proof)}
        >
          {robe.proof}
        </p>

        {/* CTA */}
        <div
          className="mt-4 flex items-center gap-4 sm:mt-6 lg:mt-8"
          style={revealStyle(lines.foot)}
        >
          <a
            href={robe.href ?? "#anprobe"}
            className="group inline-flex items-center gap-3 text-[10.5px] uppercase tracking-widest2 text-noir transition-colors hover:text-gold-600 sm:text-[11px]"
          >
            {robe.cta}
            <span className="h-px w-8 bg-noir/40 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />
          </a>
        </div>
      </div>
    </div>
  );

  // ── HUD — rotation readout bottom-left, progress hairline bottom-right. ──
  const hud = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-6 bottom-8 z-30 flex items-end justify-between sm:inset-x-8 md:inset-x-10"
      style={{ opacity: firstFrameReady ? 1 : 0, transition: "opacity 1s" }}
    >
      <span className="font-display text-[11px] italic tracking-wide text-noir/40 tabular-nums">
        {robe.no} · {String(deg).padStart(3, "0")}°
      </span>
      <div className="h-px w-24 bg-line sm:w-32">
        <div
          className="h-full origin-left bg-gold"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );

  const stage = (
    <>
      {light}
      {backdrop}
      {floor}
      {gown}
      {foreground}
      {copy}
      {hud}
    </>
  );

  // Embedded: one panel of a shared horizontal stage.
  if (scrollRef) {
    return (
      <div className="grain relative h-full w-screen shrink-0 overflow-hidden bg-porcelain">
        {stage}
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: "300vh" }}>
      <div className="grain sticky top-0 h-screen w-full overflow-hidden bg-porcelain">
        {stage}
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
