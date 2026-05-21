"use client";

import { useEffect, useRef, useState } from "react";
import { buildFramePaths, preloadFrames } from "@/utils/preloadFrames";
import { drawCoverImage, sizeCanvasToBox } from "@/utils/drawCoverImage";

/**
 * Hook that wires a tall scroll container to a sticky canvas. Scroll progress
 * inside the container is mapped 1:1 to a frame in a preloaded image sequence.
 *
 * @param {object} opts
 * @param {string} opts.basePath        e.g. "/hero-sequence"
 * @param {number} opts.frameCount      total number of frames
 * @param {number} [opts.pad=3]         zero-pad width of frame numbers
 * @param {string} [opts.ext="webp"]    frame extension
 * @returns {object} refs + state to wire to your JSX
 */
export function useScrollFrameSequence({
  basePath,
  frameCount,
  pad = 3,
  ext = "webp",
  focalX = 0.5,
  focalY = 0.5,
}) {
  const sectionRef = useRef(null); // tall scroll wrapper
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const tickingRef = useRef(false);

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
          drawCoverImage(ctx, images[0], size.width, size.height, focalX, focalY);
        }
      }
    });
  }, [basePath, frameCount, pad, ext]);

  // -- Scroll → frame mapping ------------------------------------------------
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    let cssSize = sizeCanvasToBox(canvas);

    const render = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Scroll distance available inside the sticky region.
      const scrollable = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const p = scrollable > 0 ? scrolled / scrollable : 0;

      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(p * (frameCount - 1)))
      );

      setProgress(p);

      const img =
        imagesRef.current[frameIndex] || imagesRef.current[0];

      // Walk backward if the exact frame isn't decoded yet, so we never blank.
      let drew = false;
      if (img && img.naturalWidth) {
        drew = drawCoverImage(
          ctx,
          img,
          cssSize.width,
          cssSize.height,
          focalX,
          focalY
        );
        currentFrameRef.current = frameIndex;
      }
      if (!drew) {
        for (let i = frameIndex; i >= 0; i -= 1) {
          const fallback = imagesRef.current[i];
          if (fallback && fallback.naturalWidth) {
            drawCoverImage(
              ctx,
              fallback,
              cssSize.width,
              cssSize.height,
              focalX,
              focalY
            );
            break;
          }
        }
      }
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        render();
        tickingRef.current = false;
      });
    };

    const onResize = () => {
      cssSize = sizeCanvasToBox(canvas);
      render();
    };

    // Initial render in case we mount mid-scroll (refresh, deep link).
    render();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [frameCount, focalX, focalY]);

  return {
    sectionRef,
    canvasRef,
    progress,
    firstFrameReady,
    loadProgress,
  };
}
