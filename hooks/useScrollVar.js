"use client";

import { useEffect } from "react";

/**
 * Drives a CSS custom property (default `--p`, 0..1) on `ref.current` straight
 * from scroll position — no React re-render per frame. Children animate with
 * `calc()` against the variable, which keeps kinetic type on the compositor.
 *
 * Uses the same frame-rate-independent easing as useScrollFrameSequence, so
 * headlines glide with the gowns instead of stepping on coarse wheel input.
 *
 * @param {import("react").RefObject<HTMLElement>} ref
 * @param {object} [opts]
 * @param {"pin"|"view"} [opts.mode="view"]
 *   "pin"  — section-relative: 0 when the (taller-than-viewport) element's top
 *            hits the viewport top, 1 when its bottom hits the viewport bottom.
 *            For sticky stages.
 *   "view" — traversal: 0 when the element's top enters at the bottom edge,
 *            1 when its bottom leaves at the top edge. For rows that pass by.
 * @param {number} [opts.smoothing=0.12] easing time constant in seconds
 * @param {string} [opts.name="--p"]     the custom property to write
 */
export function useScrollVar(
  ref,
  { mode = "view", smoothing = 0.12, name = "--p" } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let target = 0;
    let current = 0;
    let rafId = null;
    let running = false;
    let lastT = 0;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (mode === "pin") {
        const scrollable = rect.height - vh;
        if (scrollable <= 0) return 0;
        return Math.min(Math.max(-rect.top / scrollable, 0), 1);
      }
      const total = vh + rect.height;
      return Math.min(Math.max((vh - rect.top) / total, 0), 1);
    };

    const apply = (v) => el.style.setProperty(name, v.toFixed(4));

    const tick = (now) => {
      if (!lastT) lastT = now;
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      const a = prefersReduced ? 1 : 1 - Math.exp(-dt / smoothing);
      let next = current + (target - current) * a;
      if (Math.abs(target - next) < 0.0005) next = target;
      current = next;
      apply(next);

      if (next !== target) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
        lastT = 0;
      }
    };

    const kick = () => {
      if (running) return;
      running = true;
      lastT = 0;
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = compute();
      kick();
    };

    // Land on the right value for refreshes / deep links, no initial slide.
    target = compute();
    current = target;
    apply(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, mode, smoothing, name]);
}
