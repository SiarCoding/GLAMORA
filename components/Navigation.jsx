"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";

/* Header + mobile menu, 1:1 from the Higgsfield site (glamora-hamburg
 * routes/index.tsx). Labels are unchanged; the anchors point at the sections
 * that exist on THIS page:
 *   Kollektion        → /#kollektion (homepage chapter, works from subpages)
 *   Abendkleider / Abayas → keyword landing pages
 *   Boutique besuchen → /termin */
const MENU_LINKS = [
  ["Kollektion", "/#kollektion"],
  ["Abendkleider", "/abendkleider-hamburg"],
  ["Abayas", "/abaya-hamburg"],
  ["Boutique besuchen", "/termin"],
];

// Secondary list in the menu dialog — keyword landing pages.
const TOPIC_LINKS = [
  ["Abiballkleider", "/abiballkleider-hamburg"],
  ["Verlobung & Nikah", "/verlobungskleid-hamburg"],
  ["Hijab-Abendkleider", "/hijab-abendkleider-hamburg"],
  ["Große Größen", "/abendkleider-grosse-groessen-hamburg"],
  ["Das Geschäft", "/abendmode-geschaeft-hamburg"],
  ["Harburg", "/abendkleider-harburg"],
  ["Über uns", "/ueber-uns"],
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
      <a className="skip-link" href="#inhalt">
        Direkt zum Inhalt
      </a>

      <header className="site-header">
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          <a href="/abendkleider-hamburg">Abendkleider</a>
          <a href="/abaya-hamburg">Abayas</a>
        </nav>
        <a href="/" className="brand-wordmark" aria-label="GLAMORA Startseite">
          GLAMORA
        </a>
        <a className="nav-visit" href="/termin">
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
        <nav className="menu-topics" aria-label="Themen">
          {TOPIC_LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
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
