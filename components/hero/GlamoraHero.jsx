"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { ScrollScrub } from "@/components/hero/ScrollScrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/components/hero/scenes";

/* The scroll-driven film hero from the Higgsfield site (glamora-hamburg),
 * composed exactly like its `.film-wrap`: the scrub engine plus the two
 * captions that ride over the sticky stage at 137dvh / 234dvh. The GSAP
 * entrance of `.scroll-scrub__copy` is reproduced as a CSS keyframe in
 * glamora-hero.css, so no animation runtime is needed here. */
export default function GlamoraHero() {
  return (
    <div className="film-wrap">
      <ScrollScrub
        scenes={scrollScrubScenes}
        theme={scrollScrubTheme}
        className="glamora-film"
      />
      <article className="film-caption caption-second">
        <h2>
          Ein Gefühl,
          <br />
          das bleibt.
        </h2>
        <p>
          Wenn du nicht nur ein Kleid findest.
          <br />
          Sondern deinen Auftritt.
        </p>
      </article>
      <article className="film-caption caption-third">
        <h2>
          Besondere Momente
          <br />
          beginnen hier.
        </h2>
        <a href="#kollektion" className="film-link">
          Kollektion entdecken <ArrowRight size={24} weight="light" />
        </a>
      </article>
    </div>
  );
}
