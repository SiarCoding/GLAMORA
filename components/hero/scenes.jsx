/* Hero scene + theme — 1:1 from glamora-hamburg/app/src/scroll-scrub-scenes.ts.
 * Keep this a module constant: a new array identity on every render would
 * rebuild the scroll-scrub controller. */

export const scrollScrubTheme = {
  accent: "#C9AB70",
  background: "#090909",
  ink: "#F2EEE8",
  muted: "#D4CFC5",
};

export const scrollScrubScenes = [
  {
    id: "auftakt",
    label: "GLAMORA",
    title: "Dein Abend. Dein Auftritt.",
    body: "Abendkleider und Abayas aus Dubai ab 70 € – private Anprobe in der Lüneburger Straße 33, Hamburg-Harburg.",
    // Keyword H1 of the homepage; the slogan above renders as h2.
    kicker: "Abendkleider & Abayas in Hamburg-Harburg",
    kickerLevel: "h1",
    headingLevel: "h2",
    clip: "/assets/world/scene-01.mp4",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    poster: "/assets/world/scene-01-poster.png",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    scroll: 3,
    linger: 0.15,
    objectPosition: "50% 40%",
    mobileObjectPosition: "52% 35%",
    actions: (
      <a href="#kollektion" className="hero-invitation">
        <span>Kollektion entdecken</span>
        <span aria-hidden="true">↗</span>
      </a>
    ),
  },
];
