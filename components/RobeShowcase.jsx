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
 * @param {boolean} [pair=false] half-width panel of a two-gown stage: the gown
 *   hugs the inner edge (towards its neighbour), the copy takes the outer margin
 */
export default function RobeShowcase({ robe, textSide = "left", scrollRef, range, pair = false }) {
  // In a pair the copy sits on the outer side, so the gown leans inward.
  const inner = textSide === "left" ? 1 : 0;
  const { sectionRef, canvasRef, progress, firstFrameReady } =
    useScrollFrameSequence({
      basePath: robe.basePath,
      frameCount: robe.frameCount,
      scrollRef,
      range,
      fit: "contain",
      // Solo: centred in its own stage column. Pair: pushed to the inner edge
      // so the two gowns stand directly next to each other.
      focalX: pair ? inner : 0.5,
      focalY: pair ? 1 : 0.5,
      // Heavier glide than the hero — a showroom turn should feel weighted.
      smoothing: 0.16,
      // Showroom sits below two scroll chapters — defer until it approaches.
      lazy: true,
      lazyMargin: "200%",
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

  // A half-width panel gets half-size type planes so the word still fits.
  const wordSize = pair ? `calc(${robe.backdrop.size} * 0.5)` : robe.backdrop.size;

  // ── Depth planes: word behind, stroke twin in front. ─────────────────────
  const backdrop = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden"
    >
      <span
        className="whitespace-nowrap font-display leading-none text-noir/[0.055]"
        style={{
          fontSize: wordSize,
          transform: `translate3d(${drift * (pair ? -6 : -14)}vw, 0, 0)`,
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
          fontSize: wordSize,
          transform: `translate3d(${drift * (pair ? 4 : 9)}vw, 0, 0)`,
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
      className={`pointer-events-none absolute bottom-[1.5%] z-0 h-[5vh] rounded-[100%] bg-noir blur-3xl transition-opacity duration-1000 ${
        pair
          ? `w-[24vw] lg:w-[13vw] ${inner ? "left-[62%] lg:left-[74%]" : "left-[38%] lg:left-[26%]"}`
          : "left-1/2 w-[44vw] lg:w-[26vw]"
      }`}
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
  //    Pair: phones keep copy above / gown below; from lg the gown takes the
  //    inner 60% of the half panel and the copy the outer 40%.
  const gownBox = pair
    ? `inset-x-0 bottom-[3%] top-[30%] sm:top-[28%] lg:inset-y-0 lg:bottom-[3%] ${
        inner ? "lg:left-[40%] lg:right-0" : "lg:left-0 lg:right-[40%]"
      }`
    : "inset-x-0 bottom-0 top-[24%] lg:inset-0";
  const gown = (
    <div className={`absolute z-10 ${gownBox}`}>
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
  const right = textSide === "right";
  const copyBox = pair
    ? `inset-x-0 top-0 px-4 pt-20 sm:px-8 sm:pt-24 lg:inset-y-0 lg:w-[40%] lg:items-center lg:pt-0 ${
        right
          ? "justify-end text-right lg:left-auto lg:right-0 lg:pr-8 xl:pr-14"
          : "justify-start lg:right-auto lg:left-0 lg:pl-8 xl:pl-14"
      }`
    : `inset-x-0 top-0 px-6 pt-20 sm:px-8 sm:pt-24 lg:inset-y-0 lg:items-center lg:pt-0 ${
        right ? "lg:justify-end lg:pr-10 xl:pr-24" : "lg:justify-start lg:pl-10 xl:pl-24"
      }`;
  const copy = (
    <div className={`absolute z-30 flex ${copyBox}`}>
      <div className={`w-full ${pair ? "max-w-sm" : "max-w-[22rem] sm:max-w-sm lg:max-w-md"}`}>
        {/* Eyebrow — number + occasion */}
        <div
          className={`mb-3 flex items-center gap-3 sm:mb-4 lg:mb-6 ${pair && right ? "flex-row-reverse" : ""}`}
          style={revealStyle(lines.eyebrow)}
        >
          <span className={`h-px bg-gold sm:w-10 ${pair ? "hidden w-6 sm:block" : "w-8"}`} />
          <span className="text-[9.5px] uppercase tracking-widest2 text-gold-600 sm:text-[10.5px]">
            {robe.no}
            <span className={pair ? "hidden md:inline" : ""}> · {robe.occasion}</span>
          </span>
        </div>

        {/* Name */}
        <h3
          className={`font-display leading-[1.05] tracking-tight text-noir ${
            pair
              ? "text-[22px] sm:text-[32px] lg:text-[30px] xl:text-[40px] 2xl:text-[46px]"
              : "text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[52px]"
          }`}
          style={revealStyle(lines.name)}
        >
          {robe.name}
        </h3>

        {/* Headline — the marketing line, accent set in gold italic */}
        <p
          className={`mt-2 font-display leading-[1.25] tracking-tight text-noir/85 sm:mt-4 lg:mt-5 ${
            pair
              ? "hidden text-[17px] sm:block lg:text-[20px] xl:text-[24px]"
              : "text-[17px] sm:text-[19px] lg:mt-6 lg:text-[26px] xl:text-[30px]"
          }`}
          style={revealStyle(lines.headline)}
        >
          {robe.headline}{" "}
          <span className="italic text-gold-500">{robe.accent}</span>
        </p>

        {/* Body — hidden below lg (pair: below xl) to keep the caption compact. */}
        <p
          className={`mt-6 hidden max-w-md leading-[1.85] text-noir/60 ${
            pair ? "text-[13.5px] xl:block" : "text-[14px] lg:block lg:text-[15px]"
          }`}
          style={revealStyle(lines.body)}
        >
          {robe.body}
        </p>

        {/* Proof — lg and up only (pair: xl). */}
        <p
          className={`mt-7 hidden border-t border-line pt-5 text-[10px] uppercase tracking-widest2 text-noir/40 ${
            pair ? "xl:block" : "lg:block"
          }`}
          style={revealStyle(lines.proof)}
        >
          {robe.proof}
        </p>

        {/* CTA */}
        <div
          className={`mt-3 flex items-center gap-4 sm:mt-6 lg:mt-8 ${pair && right ? "justify-end" : ""}`}
          style={revealStyle(lines.foot)}
        >
          <a
            href={robe.href ?? "#anprobe"}
            className={`group inline-flex items-center gap-3 uppercase tracking-widest2 text-noir transition-colors hover:text-gold-600 sm:text-[11px] ${
              pair ? "text-[9.5px] leading-[1.6]" : "text-[10.5px]"
            } ${pair && right ? "flex-row-reverse" : ""}`}
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
      className={`pointer-events-none absolute inset-x-4 bottom-8 z-30 flex items-end justify-between sm:inset-x-8 md:inset-x-10 ${
        pair && right ? "flex-row-reverse" : ""
      }`}
      style={{ opacity: firstFrameReady ? 1 : 0, transition: "opacity 1s" }}
    >
      <span className="font-display text-[11px] italic tracking-wide text-noir/40 tabular-nums">
        {robe.no} · {String(deg).padStart(3, "0")}°
      </span>
      <div className={`h-px w-24 bg-line sm:w-32 ${pair ? "hidden" : ""}`}>
        <div
          className="h-full origin-left bg-gold"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );

  const stage = (
    <>
      {/* No key light in a pair: in a half-width panel the gold glow was
          clipped at the panel edge and read as a cut-off box. */}
      {pair ? null : light}
      {backdrop}
      {floor}
      {gown}
      {foreground}
      {copy}
      {hud}
    </>
  );

  // Pair: one half of a two-gown stage — transparent, the stage paints the
  // ground (and its grain) once behind both halves.
  if (pair) {
    return <div className="relative h-full w-full">{stage}</div>;
  }

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
