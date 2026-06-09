"use client";

import { useMemo } from "react";
import { useScrollFrameSequence } from "@/hooks/useScrollFrameSequence";

const FRAME_COUNT = 119;
const BASE_PATH = "/atelier-sequence";

// Section 3 — „Sechs Roben. Sechs Abende."
// Shares the atelier image sequence but tells a different story: the edition is
// deliberately tiny — six gowns a season, each promised to a single evening.
// A faint Roman „VI" sits behind the copy to mark the counting motif, so the
// section reads distinctly even though the footage is the same.
const ACTS = [
  {
    eyebrow: "Die Edition in Bewegung",
    title: "Und jetzt\nin Bewegung",
    body: "Was als nummerierte Kachel begann, erwacht im Licht — Seide, Kristall und Schatten in voller Größe.",
    start: 0.06,
    end: 0.36,
    align: "left",
  },
  {
    eyebrow: "Eine pro Abend",
    title: "Für einen\neinzigen Auftritt",
    body: "Jede Robe ist einem Abend versprochen. Getragen, gesehen, erinnert — und nie wiederholt.",
    start: 0.4,
    end: 0.68,
    align: "left",
  },
  {
    eyebrow: "Die Wahl liegt bei Ihnen",
    title: "Welche der Sechs\nwird Ihr Abend?",
    start: 0.76,
    end: 1.0,
    align: "center",
  },
];

function actOpacity(progress, act) {
  const { start, end } = act;
  const span = end - start;
  const fadeIn = start + span * 0.2;
  const holdOut = end - span * 0.18;
  if (progress < start || progress > end) return 0;
  if (progress < fadeIn) return (progress - start) / (fadeIn - start);
  if (progress > holdOut) return 1 - (progress - holdOut) / (end - holdOut);
  return 1;
}

export default function SechsRobenSection() {
  const { sectionRef, canvasRef, progress, firstFrameReady, loadProgress } =
    useScrollFrameSequence({
      basePath: BASE_PATH,
      frameCount: FRAME_COUNT,
      focalX: 0.5,
      focalY: 0.5,
      // A touch heavier than the hero — this is a slow, deliberate chapter.
      smoothing: 0.14,
    });

  const actStates = useMemo(
    () => ACTS.map((a) => ({ ...a, opacity: actOpacity(progress, a) })),
    [progress]
  );

  // The big „VI" watermark holds while the first two (left) acts are on screen,
  // then recedes for the centred closing line.
  const numeralOpacity = Math.max(actStates[0].opacity, actStates[1].opacity);

  return (
    <section
      ref={sectionRef}
      id="roben"
      className="relative w-full"
      style={{ height: "340vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Canvas layer — full-bleed scene. */}
        <div className="absolute inset-0">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="block h-full w-full"
          />

          {/* Right scrim — copy sits left here, so darken the right edge.
              Fades with the side acts. */}
          {actStates.map((act, i) =>
            act.align === "left" ? (
              <div
                key={`scrim-${i}`}
                className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/70 via-black/15 to-transparent"
                style={{ opacity: act.opacity, transition: "opacity 120ms linear" }}
              />
            ) : null
          )}
          {/* Vignette for the closing question. */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]"
            style={{
              opacity: actStates[2].opacity * 0.9,
              transition: "opacity 160ms linear",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
        </div>

        {/* Faint Roman numeral watermark — the counting motif behind the copy. */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-end pr-[4vw]"
          style={{ opacity: numeralOpacity * 0.12, transition: "opacity 160ms linear" }}
        >
          <span className="font-display font-light leading-none text-bone text-[44vw] md:text-[34vw] lg:text-[28vw]">
            VI
          </span>
        </div>

        {/* Loader veil. */}
        <div
          className={`pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black transition-opacity duration-700 ${
            firstFrameReady ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="text-center">
            <div className="font-display text-2xl tracking-[0.45em] text-bone">
              GLAMORA
            </div>
            <div className="mt-6 h-px w-40 overflow-hidden bg-bone/10">
              <div
                className="h-full bg-gold transition-[width] duration-500"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <div className="mt-4 text-[10px] uppercase tracking-widest2 text-bone/30">
              Die Auswahl
            </div>
          </div>
        </div>

        {/* Copy stage. */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {actStates.map((act, i) => {
            if (act.align === "center") {
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center px-6 will-change-[transform,opacity]"
                  style={{
                    opacity: act.opacity,
                    transform: `translate3d(0, ${(1 - act.opacity) * 18}px, 0)`,
                    transition: "opacity 140ms linear",
                  }}
                >
                  <div className="max-w-[44rem] text-center">
                    <div className="mb-7 flex items-center justify-center gap-3">
                      <span className="h-px w-10 bg-gold/70" />
                      <span className="text-[10px] uppercase tracking-widest2 text-gold">
                        {act.eyebrow}
                      </span>
                      <span className="h-px w-10 bg-gold/70" />
                    </div>
                    <p className="whitespace-pre-line font-display text-[30px] font-light italic leading-[1.32] tracking-tight text-bone md:text-[46px] lg:text-[54px]">
                      {act.title}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={i}
                className="absolute inset-0 flex items-end pb-24 md:pb-28 will-change-[transform,opacity]"
                style={{
                  opacity: act.opacity,
                  transform: `translate3d(0, ${(1 - act.opacity) * 24}px, 0)`,
                  transition: "opacity 120ms linear",
                }}
              >
                <div className="mx-auto flex w-full max-w-[1480px] justify-start px-6 md:px-10">
                  <div className="max-w-[34rem] text-left">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="h-px w-10 bg-gold/80" />
                      <span className="text-[10px] uppercase tracking-widest2 text-gold">
                        {act.eyebrow}
                      </span>
                    </div>
                    <h2 className="whitespace-pre-line font-sans text-[40px] font-extralight leading-[1.0] tracking-[-0.03em] text-bone md:text-[64px] lg:text-[76px]">
                      {act.title}
                    </h2>
                    {act.body ? (
                      <p className="mt-6 max-w-md text-[13px] font-light leading-[1.75] text-bone/70 md:text-[14px]">
                        {act.body}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress hairline. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-bone/5">
          <div
            className="h-full bg-gradient-to-r from-gold/0 via-gold to-gold/80"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
