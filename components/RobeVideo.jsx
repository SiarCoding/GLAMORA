"use client";

import { useEffect, useRef } from "react";

/**
 * A background-free robe clip that plays once, like a normal video, the moment
 * its tile scrolls into view — not on page load. It pauses when it leaves the
 * viewport and restarts from the top the next time it comes back. No looping.
 * The transparent poster (first frame) shows before it has played.
 */
export default function RobeVideo({ src, poster, className, speed = 1 }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.playbackRate = speed; // faster reveal, still smooth (real video playback)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.ended) v.currentTime = 0; // replay from the start on re-entry
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.4 }
    );

    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className={className}
    />
  );
}
