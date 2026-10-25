"use client";

import { useRef } from "react";
import RobeShowcase from "@/components/RobeShowcase";
import { useScrollVar } from "@/hooks/useScrollVar";

// Scroll budget of the shared stage (fractions of its pinned scroll):
// the first collection turns, the stage glides sideways, the second turns.
const TURN_A = [0, 0.43];
// The glide runs 0.43 → 0.57 — see .collections-stage in globals.css.
const TURN_B = [0.57, 1];

/**
 * Act II of the showroom — both collections on one pinned stage, side by side.
 *
 * One tall wrapper (560vh) pins a viewport-sized stage holding a 200vw track.
 * The first gown turns through its sequence; once it is done, the track glides
 * one viewport to the left — the second collection is standing right next to
 * it — and the second gown turns. Both canvases read the same wrapper's scroll
 * (`scrollRef` + `range`), the glide is pure CSS against `--p` (useScrollVar).
 */
export default function CollectionsSlider({ collections }) {
  const ref = useRef(null);
  useScrollVar(ref, { mode: "pin", smoothing: 0.16 });
  const [a, b] = collections;

  return (
    <section ref={ref} className="relative w-full" style={{ height: "560vh", "--p": 0 }}>
      <div className="collections-stage sticky top-0 h-screen w-full overflow-hidden bg-porcelain">
        <div className="collections-track flex h-full w-[200vw]">
          <div className="collections-panel collections-panel--a h-full">
            <RobeShowcase robe={a} textSide="left" scrollRef={ref} range={TURN_A} />
          </div>
          <div className="collections-panel collections-panel--b h-full">
            <RobeShowcase robe={b} textSide="right" scrollRef={ref} range={TURN_B} />
          </div>
        </div>

        {/* Collection index — which of the two is on stage. */}
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
