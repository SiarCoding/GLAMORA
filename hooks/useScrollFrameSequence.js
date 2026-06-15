"use client";

import { useEffect, useRef, useState } from "react";
import { buildFramePaths, preloadFrames } from "@/utils/preloadFrames";
import {
  drawCoverImage,
  drawContainImage,
  sizeCanvasToBox,
} from "@/utils/drawCoverImage";

/**
 * Hook that wires a tall scroll container to a sticky canvas. Scroll position
 * sets a *target* progress; a persistent rAF loop eases the *displayed* progress
 * toward that target every frame (Apple-style inertia), so even coarse wheel /
 * trackpad input scrubs the image sequence butter-smooth instead of stepping.
 *
 * @param {object} opts
 * @param {string} opts.basePath        e.g. "/hero-sequence"
 * @param {number} opts.frameCount      total number of frames
 * @param {number} [opts.pad=3]         zero-pad width of frame numbers
 * @param {string} [opts.ext="webp"]    frame extension
 * @param {number} [opts.focalX=0.5]    focal point X (0..1)
 * @param {number} [opts.focalY=0.5]    focal point Y (0..1)
 * @param {"cover"|"contain"} [opts.fit="cover"] how frames fill the canvas box
 * @param {number} [opts.smoothing=0.11] time constant (s) of the easing — higher
 *                                       = smoother & heavier glide, lower = snappier
 * @param {"cover"|"contain"} [opts.fit="cover"] how each frame fills the canvas.
 *                                       Use "contain" for background-free (alpha)
 *                                       subjects that must never be cropped.
 * @returns {object} refs + state to wire to your JSX
 */
export function useScrollFrameSequence({
  basePath,
  frameCount,
  pad = 3,
  ext = "webp",
  focalX = 0.5,
  focalY = 0.5,
  fit = "cover",
  smoothing = 0.11,
  padding = 0,
}) {
  const drawImageFit =
    fit === "contain"
      ? (ctx, img, w, h, fx, fy) =>
          drawContainImage(ctx, img, w, h, fx, fy, padding)
      : drawCoverImage;
  const sectionRef = useRef(null); // tall scroll wrapper
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  const targetRef = useRef(0); // where scroll says we should be (0..1)
  const smoothRef = useRef(0); // where we're actually drawing (eased)

  const [progress, setProgress] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // -- Preload frames --------------------------------------------------------
  useEffect(() => {
    const paths = buildFramePaths({ basePath, frameCount, pad, ext });
    const { images, firstFrameReady: firstReady } = preloadFrames(
      paths,
      setLoadProgress
    );
    imagesRef.current = images;
    firstReady.then(() => {
      setFirstFrameReady(true);
      // Draw the first frame immediately so the section never blanks.
      const canvas = canvasRef.current;
      if (canvas) {
        const size = sizeCanvasToBox(canvas);
        if (size) {
          const ctx = canvas.getContext("2d");
          drawImageFit(ctx, images[0], size.width, size.height, focalX, focalY);
        }
      }
    });
  }, [basePath, frameCount, pad, ext, fit, padding]);

  // -- Scroll → target, rAF loop → eased frame -------------------------------
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    let cssSize = sizeCanvasToBox(canvas);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = null;
    let running = false;
    let lastT = 0;
    let lastDrawnFrame = -1;
    let lastReported = -1;

    // Section-relative scroll → normalized 0..1.
    const computeTarget = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      return scrollable > 0 ? scrolled / scrollable : 0;
    };

    // Draw the frame nearest to progress p. Walks backward to the nearest
    // decoded frame so the canvas never blanks while later frames stream in.
    const drawFrame = (p) => {
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(p * (frameCount - 1)))
      );

      const img = imagesRef.current[frameIndex];
      if (img && img.naturalWidth) {
        if (frameIndex === lastDrawnFrame) return; // nothing changed
        drawImageFit(ctx, img, cssSize.width, cssSize.height, focalX, focalY);
        lastDrawnFrame = frameIndex;
        return;
      }

      // Exact frame not decoded yet — draw the closest earlier frame, but don't
      // record it as "drawn" so we retry once the real frame arrives.
      for (let i = frameIndex - 1; i >= 0; i -= 1) {
        const fallback = imagesRef.current[i];
        if (fallback && fallback.naturalWidth) {
          drawImageFit(
            ctx,
            fallback,
            cssSize.width,
            cssSize.height,
            focalX,
            focalY,
            fit
          );
          lastDrawnFrame = -1;
          break;
        }
      }
    };

    // Frame-rate-independent exponential smoothing toward the target.
    const tick = (now) => {
      if (!lastT) lastT = now;
      const dt = Math.min((now - lastT) / 1000, 0.05); // clamp tab-switch gaps
      lastT = now;

      const target = targetRef.current;
      const cur = smoothRef.current;
      const a = prefersReduced ? 1 : 1 - Math.exp(-dt / smoothing);
      let next = cur + (target - cur) * a;
      if (Math.abs(target - next) < 0.0002) next = target; // settle

      smoothRef.current = next;
      drawFrame(next);

      if (Math.abs(next - lastReported) > 0.0015) {
        lastReported = next;
        setProgress(next);
      }

      if (next !== target) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
        lastT = 0;
        if (lastReported !== next) {
          lastReported = next;
          setProgress(next); // final exact sync for overlays
        }
      }
    };

    const kick = () => {
      if (running) return;
      running = true;
      lastT = 0;
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      targetRef.current = computeTarget();
      kick();
    };

    const onResize = () => {
      const next = sizeCanvasToBox(canvas);
      // Skip no-op resizes so we don't needlessly clear/redraw.
      if (next) cssSize = next;
      targetRef.current = computeTarget();
      lastDrawnFrame = -1; // force a redraw at the new size
      drawFrame(smoothRef.current);
      kick();
    };

    // Start synced to the current scroll position so a refresh / deep link
    // lands on the right frame without an initial slide.
    targetRef.current = computeTarget();
    smoothRef.current = targetRef.current;
    drawFrame(smoothRef.current);
    setProgress(smoothRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // A plain window 'resize' listener misses box changes that happen without
    // the window itself resizing: late web-font layout, the sticky stage
    // activating, `svh`/`dvh` shifts as the mobile URL bar hides, flex reflow.
    // Any of those leave the canvas backing store at a stale size, which
    // stretches the drawn frame. A ResizeObserver re-syncs on every box change.
    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => onResize());
      ro.observe(canvas);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [frameCount, focalX, focalY, smoothing, fit, padding]);

  return {
    sectionRef,
    canvasRef,
    progress,
    firstFrameReady,
    loadProgress,
  };
}
