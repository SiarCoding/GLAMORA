"use client";

import { useEffect, useMemo, useState } from "react";
import { useScrollFrameSequence } from "@/hooks/useScrollFrameSequence";

const FRAME_COUNT = 97;
const BASE_PATH = "/hero-sequence";

// Chapter 1 starts at 0.06 so the very top of the hero is a silent,
// text-free moment before any copy fades in — Apple-style breath.
const CHAPTERS = [
  {
    eyebrow: "Die Dubai Kollektion",
    title: "Handgefertigte\nVollendung",
    body: "Couture-Abendroben, geboren in den Ateliers von Dubai. Neu erdacht für die Frauen Hamburgs.",
    start: 0.07,
    end: 0.38,
  },
  {
    eyebrow: "Einhundert Hände",
    title: "Bestickt\nin Stille",
    body: "Jede Robe trägt zwischen 400 und 900 Stunden Handarbeit — Seidenfaden, Glaskristall, Perlen von Hand gelegt.",
    start: 0.38,
    end: 0.7,
  },
  {
    eyebrow: "Nur nach Vereinbarung",
    title: "Getragen von\neiner Einzigen",
    body: "Jedes Stück bleibt einer einzigen Kundin vorbehalten. Keine Reproduktion. Kein zweiter Auftritt.",
    start: 0.7,
    end: 1.0,
  },
];

function chapterOpacity(progress, chapter) {
  const { start, end } = chapter;
  const span = end - start;
  const fadeIn = start + span * 0.18;
  const holdOut = end - span * 0.22;
  if (progress < start || progress > end) return 0;
  if (progress < fadeIn) return (progress - start) / (fadeIn - start);
  if (progress > holdOut) return 1 - (progress - holdOut) / (end - holdOut);
  return 1;
}

export default function HeroSequence() {
  // Source video is landscape 16:9 (model centre-left, the gold GLAMORA logo
  // upper-right). The canvas runs full-bleed. On a narrow phone the cover-crop
  // trims the sides, so we anchor focalX toward the model to keep her in frame.
  const [focalX, setFocalX] = useState(0.5);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      // On phones, bias the cover-crop toward the LEFT of the frame (not the
      // centre) so we show the left side of the video — slightly left.
      if (w < 768) setFocalX(0.2);
      else setFocalX(0.5);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const { sectionRef, canvasRef, progress, firstFrameReady, loadProgress } =
    useScrollFrameSequence({
      basePath: BASE_PATH,
      frameCount: FRAME_COUNT,
      focalX,
      focalY: 0.5,
    });

  const chapterStates = useMemo(
    () => CHAPTERS.map((c) => ({ ...c, opacity: chapterOpacity(progress, c) })),
    [progress]
  );

  // When all chapters are invisible (the silent top of the hero), don't
  // show an "01" label — leave it as a single hairline character.
  const activeReduce = chapterStates.reduce(
    (best, c, i) =>
      c.opacity > best.opacity ? { opacity: c.opacity, i } : best,
    { opacity: 0, i: -1 }
  );
  const activeChapter = activeReduce.opacity > 0.02 ? activeReduce.i + 1 : null;

  return (
    <section
      ref={sectionRef}
      id="kollektion"
      className="relative w-full"
      style={{ height: "350vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Canvas layer — full-bleed landscape on every breakpoint. */}
        <div className="absolute inset-0">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="block h-full w-full"
          />
          {/* Directional scrim — follows the active chapter's side so the copy
              stays legible without darkening the whole frame. */}
          {chapterStates.map((chapter, i) => (
            <div
              key={`scrim-${i}`}
              className={`pointer-events-none absolute inset-0 ${
                i % 2 === 0
                  ? "bg-gradient-to-r from-black/65 via-black/10 to-transparent"
                  : "bg-gradient-to-l from-black/65 via-black/10 to-transparent"
              }`}
              style={{ opacity: chapter.opacity, transition: "opacity 120ms linear" }}
            />
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
        </div>

        {/* Loader veil — light porcelain to match the bright site. */}
        <div
          className={`pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-porcelain transition-opacity duration-700 ${
            firstFrameReady ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="text-center">
            <div className="font-display text-2xl tracking-[0.45em] text-noir">
              GLAMORA
            </div>
            <div className="mt-6 h-px w-40 overflow-hidden bg-noir/10">
              <div
                className="h-full bg-gold transition-[width] duration-500"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <div className="mt-4 text-[10px] uppercase tracking-widest2 text-noir/40">
              Das Atelier öffnet
            </div>
          </div>
        </div>

        {/* Apple-style headline stage — chapters alternate left / right. */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {chapterStates.map((chapter, i) => {
            const right = i % 2 === 1;
            return (
              <div
                key={i}
                className="absolute inset-0 flex items-end pb-24 md:pb-28 will-change-[transform,opacity]"
                style={{
                  opacity: chapter.opacity,
                  transform: `translate3d(0, ${(1 - chapter.opacity) * 24}px, 0)`,
                  transition: "opacity 120ms linear",
                }}
              >
                <div
                  className={`mx-auto flex w-full max-w-[1480px] px-6 md:px-10 ${
                    right ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className={`max-w-[34rem] ${right ? "text-right" : "text-left"}`}>
                    <div
                      className={`mb-5 flex items-center gap-3 ${
                        right ? "justify-end" : "justify-start"
                      }`}
                    >
                      {right ? (
                        <>
                          <span className="text-[10px] uppercase tracking-widest2 text-gold">
                            {chapter.eyebrow}
                          </span>
                          <span className="h-px w-10 bg-gold/80" />
                        </>
                      ) : (
                        <>
                          <span className="h-px w-10 bg-gold/80" />
                          <span className="text-[10px] uppercase tracking-widest2 text-gold">
                            {chapter.eyebrow}
                          </span>
                        </>
                      )}
                    </div>
                    <h2 className="whitespace-pre-line font-sans text-[44px] font-extralight leading-[0.98] tracking-[-0.03em] text-bone md:text-[72px] lg:text-[88px]">
                      {chapter.title}
                    </h2>
                    <p
                      className={`mt-6 text-[13px] font-light leading-[1.75] text-bone/70 md:text-[14px] ${
                        right ? "ml-auto" : ""
                      } max-w-md`}
                    >
                      {chapter.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filigree gold timeline — Apple-style scrub line at the very bottom. */}
        <Timeline
          progress={progress}
          chapters={CHAPTERS}
          activeIndex={activeChapter}
        />
      </div>
    </section>
  );
}

function Timeline({ progress, chapters, activeIndex }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 px-6 md:bottom-8 md:px-10">
      <div className="mx-auto flex max-w-[1480px] items-center gap-6">
        {/* Chapter index — quiet, serif label. Hidden until a chapter is active. */}
        <div className="hidden items-baseline gap-2 md:flex">
          <span
            className="font-display text-[14px] leading-none transition-opacity duration-500"
            style={{
              opacity: activeIndex ? 1 : 0.25,
              color: activeIndex ? "#D4AF37" : "rgba(244,239,230,0.35)",
            }}
          >
            {activeIndex ? String(activeIndex).padStart(2, "0") : "—"}
          </span>
          <span className="text-[9px] uppercase tracking-widest2 text-bone/25">
            /
          </span>
          <span className="text-[9px] uppercase tracking-widest2 text-bone/35">
            {String(chapters.length).padStart(2, "0")}
          </span>
        </div>

        {/* The rail itself */}
        <div className="relative h-[10px] flex-1">
          {/* Resting hairline */}
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-bone/0 via-bone/15 to-bone/0" />

          {/* Filled gold portion */}
          <div
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-gold/0 via-gold to-gold"
            style={{ width: `${progress * 100}%` }}
          />

          {/* Chapter ticks */}
          {chapters.map((c, i) => (
            <span
              key={i}
              className="absolute top-1/2 h-[6px] w-px -translate-y-1/2 bg-gold/40"
              style={{ left: `${c.start * 100}%` }}
            />
          ))}
          <span
            className="absolute top-1/2 h-[6px] w-px -translate-y-1/2 bg-gold/40"
            style={{ left: "100%" }}
          />

          {/* The traveling diamond */}
          <span
            className="absolute top-1/2 block h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-black"
            style={{ left: `${progress * 100}%` }}
          />
          {/* Outer halo */}
          <span
            className="absolute top-1/2 block h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15"
            style={{ left: `${progress * 100}%` }}
          />
        </div>

        {/* Right-side filigree label */}
        <div className="hidden items-center gap-3 md:flex">
          <span className="font-display italic text-[11px] tracking-wide text-bone/45">
            Akt
          </span>
          <span className="h-px w-6 bg-gold/40" />
        </div>
      </div>
    </div>
  );
}
