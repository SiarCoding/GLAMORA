"use client";

import { useScrollFrameSequence } from "@/hooks/useScrollFrameSequence";

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Scroll-driven scene for the keyword landing pages, in the homepage's light
 * language: porcelain stage, dark serif copy, gold accents.
 *
 * Same canvas image-sequence technique as the homepage (Scroll-Animation-Guide.md).
 * Two variants:
 *   cut    — subject shot on a seamless studio background (/seiten/weiss/…) whose
 *            colour is baked to the page porcelain, drawn "contain" and anchored
 *            to the bottom of the stage, like the robes on the homepage.
 *   framed — full scenes without a person (boutique, details) drawn "cover"
 *            inside a framed 16:10 window.
 * The stage starts below the fixed header so nothing is ever hidden behind it.
 * The copy is real DOM text (h2, p, ul) so it stays crawlable and citable.
 *
 * @param {object} props
 * @param {string} props.basePath   frame folder, e.g. "/seiten/weiss/abaya-1"
 * @param {number} props.frameCount number of frames in the folder
 * @param {"cut"|"framed"} props.variant
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} props.body
 * @param {string[]} [props.points]
 * @param {number} [props.focalX]   horizontal focal point for the framed crop
 * @param {boolean} [props.flip]    subject left, copy right
 */
export default function SceneSequence({
  basePath,
  frameCount,
  variant = "cut",
  eyebrow,
  title,
  body,
  points = [],
  focalX = 0.6,
  flip = false,
}) {
  const cut = variant === "cut";
  const { sectionRef, canvasRef, progress, firstFrameReady } =
    useScrollFrameSequence({
      basePath,
      frameCount,
      fit: cut ? "contain" : "cover",
      focalX: cut ? 0.5 : focalX,
      focalY: cut ? 1 : 0.5,
      padding: 0,
      smoothing: 0.12,
      lazy: true,
    });

  const reveal = clamp((progress - 0.04) / 0.2, 0, 1);
  const revealStyle = {
    opacity: reveal,
    transform: `translate3d(0, ${(1 - reveal) * 24}px, 0)`,
  };

  return (
    <section ref={sectionRef} className="relative h-[230vh] bg-porcelain md:h-[280vh]">
      {/* Sticky stage sits below the fixed header (66px mobile / 80px desktop). */}
      <div className="sticky top-[66px] h-[calc(100svh-66px)] w-full overflow-hidden bg-porcelain md:top-20 md:h-[calc(100svh-80px)]">
        {/* Watermark + gold glow only behind framed scenes: the studio frames are
            opaque porcelain and would slice through either with a hard edge. */}
        {cut ? null : (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap font-display text-[24vw] leading-none tracking-tight text-noir/[0.045] md:text-[13vw]"
            >
              {title.replace(/[.,&]/g, "").split(" ")[0]}
            </div>
            <div className="pointer-events-none absolute right-[-12vw] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.14),transparent_62%)] blur-3xl" />
          </>
        )}

        <div
          className={`relative mx-auto flex h-full max-w-[1480px] flex-col px-6 md:items-center md:gap-12 md:px-10 lg:gap-20 ${
            flip ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          {/* ── Visual ───────────────────────────────────────────── */}
          <div
            className={`relative order-1 md:order-2 md:flex-[1.15] ${
              cut
                ? "-mx-6 h-[74%] md:mx-0 md:h-full"
                : "-mx-6 mt-4 h-[50%] md:mx-0 md:mt-0 md:h-auto md:aspect-[16/10]"
            }`}
          >
            <div
              className={`relative h-full w-full ${
                cut ? "" : "overflow-hidden border border-line bg-mist shadow-[0_40px_80px_-40px_rgba(26,22,17,0.35)]"
              }`}
            >
              <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />
              {/* Poster for the framed scenes only: a white-studio poster would
                  sit misaligned over the contain-drawn canvas and ghost. */}
              {cut ? null : (
                <img
                  src={`${basePath}/frame-001.webp`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    firstFrameReady ? "opacity-0" : "opacity-100"
                  }`}
                  style={{ objectPosition: `${focalX * 100}% 50%` }}
                />
              )}
            </div>
            {cut ? (
              // Soft floor so the figure stands on the page instead of being cut off.
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-porcelain to-transparent md:h-16" />
            ) : null}
          </div>

          {/* ── Copy ─────────────────────────────────────────────── */}
          <div
            className="order-2 pb-6 pt-3 md:order-1 md:flex-1 md:pb-0 md:pt-0 will-change-[transform,opacity]"
            style={revealStyle}
          >
            <div className="mb-2 flex items-center gap-3 md:mb-5">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[10.5px] uppercase tracking-widest2 text-gold-600">
                {eyebrow}
              </span>
            </div>
            <h2 className="font-display text-[26px] leading-[1.06] tracking-tight text-noir md:text-[52px] lg:text-[64px]">
              {title}
            </h2>
            <p className="mt-2 line-clamp-2 max-w-md text-[13px] leading-[1.7] text-noir/60 md:mt-6 md:line-clamp-none md:text-[15px] md:leading-[1.8]">
              {body}
            </p>
            {points.length ? (
              <ul className="mt-5 hidden space-y-2 sm:block md:mt-7">
                {points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-noir/55"
                  >
                    <span className="h-1 w-1 rotate-45 bg-gold" />
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-3 h-px w-40 overflow-hidden bg-line md:mt-8">
              <div
                className="h-full bg-gradient-to-r from-gold/40 via-gold to-gold-500"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
