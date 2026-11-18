"use client";

import { useRef } from "react";
import RobeShowcase from "@/components/RobeShowcase";
import { useScrollVar } from "@/hooks/useScrollVar";

// Scroll budget of the shared stage (fractions of its pinned scroll):
// the Abendkleid turns alone, centred; then the Abaya rises in to its right
// (0.42 → 0.58, see .collections-stage in globals.css) and turns in turn.
const TURN_A = [0, 0.45];
const TURN_B = [0.55, 1];

/**
 * Act II of the showroom — both collections side by side on one pinned stage.
 *
 * The stage is split into two halves. At first the Abendkleid panel is
 * shifted to the centre and turns on its own. Once it has turned, it eases
 * back into the left half while the Abaya fades and rises in on the right —
 * no sideways swipe, both stay visible — and the Abaya turns. On phones the
 * same: two columns, the Abaya appears to the right of the Abendkleid.
 * Both canvases read the same wrapper's scroll (`scrollRef` + `range`); the
 * entrance is pure CSS against `--p` (useScrollVar).
 */
export default function CollectionsSlider({ collections }) {
  const ref = useRef(null);
  useScrollVar(ref, { mode: "pin", smoothing: 0.12 });
  const [a, b] = collections;

  return (
    <section ref={ref} className="relative w-full" style={{ height: "420vh", "--p": 0 }}>
      <div className="collections-stage grain sticky top-0 h-screen w-full overflow-hidden bg-porcelain">
        <div className="flex h-full w-full">
          <div className="collections-panel collections-panel--a h-full w-1/2">
            <RobeShowcase robe={a} textSide="left" scrollRef={ref} range={TURN_A} pair />
          </div>
          <div className="collections-panel collections-panel--b h-full w-1/2">
            <RobeShowcase robe={b} textSide="right" scrollRef={ref} range={TURN_B} pair />
          </div>
        </div>

        {/* Collection index — which of the two is turning. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-3 z-40 flex justify-center gap-2"
        >
          <span className="collections-dot collections-dot--a h-[3px] w-6 rounded-full bg-gold" />
          <span className="collections-dot collections-dot--b h-[3px] w-6 rounded-full bg-gold" />
        </div>
      </div>
    </section>
  );
}
