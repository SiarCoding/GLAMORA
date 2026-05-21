"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-black/55 backdrop-blur-xl border-b border-gold/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <a
          href="#"
          className="font-display text-[22px] tracking-[0.45em] text-bone"
        >
          GLAMORA
        </a>

        <ul className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-widest2 text-bone/70">
          <li><a href="#kollektion" className="hover:text-gold transition-colors">Kollektion</a></li>
          <li><a href="#showroom" className="hover:text-gold transition-colors">Showroom</a></li>
          <li><a href="#handwerk" className="hover:text-gold transition-colors">Handwerk</a></li>
          <li><a href="#anprobe" className="hover:text-gold transition-colors">Atelier</a></li>
        </ul>

        <a
          href="#anprobe"
          className="group relative inline-flex items-center gap-3 border border-gold/40 px-5 py-2.5 text-[10.5px] uppercase tracking-widest2 text-gold transition-all hover:bg-gold hover:text-black"
        >
          <span>Termin</span>
          <span aria-hidden className="h-px w-5 bg-current transition-all group-hover:w-7" />
        </a>
      </nav>
    </header>
  );
}
