"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  // Header stays transparent. Only the text colour flips: light while the dark
  // hero video sits behind it, ink once the light sections scroll up.
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setOnLight(window.scrollY > window.innerHeight * 2.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const logo = onLight ? "text-noir" : "text-bone";
  const links = onLight ? "text-noir/60" : "text-bone/70";
  const cta = onLight
    ? "border-noir/20 text-noir hover:bg-noir hover:text-porcelain"
    : "border-gold/40 text-gold hover:bg-gold hover:text-black";

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <nav className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <a
          href="#"
          className={`font-display text-[22px] tracking-[0.45em] transition-colors duration-500 ${logo}`}
        >
          GLAMORA
        </a>

        <ul
          className={`hidden md:flex items-center gap-10 text-[11px] uppercase tracking-widest2 transition-colors duration-500 ${links}`}
        >
          <li><a href="#kollektion" className="hover:text-gold transition-colors">Kollektion</a></li>
          <li><a href="#showroom" className="hover:text-gold transition-colors">Showroom</a></li>
          <li><a href="#handwerk" className="hover:text-gold transition-colors">Handwerk</a></li>
          <li><a href="#anprobe" className="hover:text-gold transition-colors">Atelier</a></li>
        </ul>

        <a
          href="#anprobe"
          className={`group relative inline-flex items-center gap-3 border px-5 py-2.5 text-[10.5px] uppercase tracking-widest2 transition-all duration-500 ${cta}`}
        >
          <span>Termin</span>
          <span aria-hidden className="h-px w-5 bg-current transition-all group-hover:w-7" />
        </a>
      </nav>
    </header>
  );
}
