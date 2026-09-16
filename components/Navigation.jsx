"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";

/* Header + mobile menu, 1:1 from the Higgsfield site (glamora-hamburg
 * routes/index.tsx). Labels are unchanged; the anchors point at the sections
 * that exist on THIS page:
 *   Kollektion        → #kollektion  (the former hero, now the 2nd chapter)
 *   Anlässe           → #showroom
 *   Details           → #handwerk
 *   Boutique besuchen → #anprobe     (Atelier / Termin) */
const MENU_LINKS = [
  ["Kollektion", "#kollektion"],
  ["Anlässe", "#showroom"],
  ["Details", "#handwerk"],
  ["Boutique besuchen", "#anprobe"],
];

export default function Navigation() {
  const menu = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function openMenu() {
    menu.current?.showModal();
    setMenuOpen(true);
  }
  function closeMenu() {
    menu.current?.close();
    setMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#kollektion">
        Direkt zur Kollektion
      </a>

      <header className="site-header">
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          <a href="#kollektion">Kollektion</a>
          <a href="#showroom">Anlässe</a>
        </nav>
        <a href="#auftakt" className="brand-wordmark" aria-label="GLAMORA Startseite">
          GLAMORA
        </a>
        <a className="nav-visit" href="#anprobe">
          <span>Boutique besuchen</span>
          <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-trigger"
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
          onClick={openMenu}
        >
          <List size={25} weight="light" />
        </button>
      </header>

      <dialog
        ref={menu}
        className="menu-dialog"
        onClose={() => setMenuOpen(false)}
        aria-label="Navigation"
      >
        <div className="menu-top">
          <span>GLAMORA</span>
          <button onClick={closeMenu} aria-label="Menü schließen">
            <X size={28} weight="light" />
          </button>
        </div>
        <nav>
          {MENU_LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
              <ArrowUpRight size={28} weight="light" />
            </a>
          ))}
        </nav>
        <p>
          Lüneburger Straße 33
          <br />
          21073 Hamburg
        </p>
      </dialog>
    </>
  );
}
