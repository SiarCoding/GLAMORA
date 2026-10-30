"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { SITE } from "@/lib/site";
import { LANGUAGE_LABEL } from "@/lib/i18n";

/* Header + mobile menu, 1:1 from the Higgsfield site (glamora-hamburg
 * routes/index.tsx), now in three languages. The language row links to the
 * translation of the current page when one exists (hreflang group), else to
 * that language's entry page. */
const NAV = {
  de: {
    skip: "Direkt zum Inhalt",
    main: [
      ["Kollektion", "/#kollektion"],
      ["Abendkleider", "/abendkleider-hamburg"],
      ["Abayas", "/abaya-hamburg"],
      ["Boutique besuchen", "/termin"],
    ],
    desktop: [["Abendkleider", "/abendkleider-hamburg"], ["Abayas", "/abaya-hamburg"]],
    visit: ["Boutique besuchen", "/termin"],
    topics: [
      ["Abiballkleider", "/abiballkleider-hamburg"],
      ["Hochzeitsgast", "/kleid-hochzeitsgast-hamburg"],
      ["Verlobung", "/verlobungskleid-hamburg"],
      ["Nikah & Henna", "/nikah-henna-kleid-hamburg"],
      ["Hijab-Abendkleider", "/hijab-abendkleider-hamburg"],
      ["Große Größen", "/abendkleider-grosse-groessen-hamburg"],
      ["Brautjungfern", "/brautjungfernkleider-hamburg"],
      ["Eid & Bayram", "/eid-kleid-hamburg"],
      ["Harburg", "/abendkleider-harburg"],
      ["Ratgeber", "/ratgeber"],
      ["Über uns", "/ueber-uns"],
    ],
    open: "Menü öffnen",
    close: "Menü schließen",
    navLabel: "Hauptnavigation",
    topicsLabel: "Themen",
    langLabel: "Sprache",
    homeLabel: "GLAMORA Startseite",
  },
  tr: {
    skip: "İçeriğe geç",
    main: [
      ["Koleksiyon", "/#kollektion"],
      ["Abiye", "/tr/abiye-hamburg"],
      ["Abaya", "/tr/abaya-hamburg"],
      ["Tesettür Abiye", "/tr/tesettur-abiye-hamburg"],
    ],
    desktop: [["Abiye", "/tr/abiye-hamburg"], ["Abaya", "/tr/abaya-hamburg"]],
    visit: ["Randevu", `mailto:${SITE.email}?subject=Prova%20randevusu`],
    topics: [
      ["Nişan & Kına", "/tr/nisan-kina-elbisesi-hamburg"],
      ["Tesettür Abiye", "/tr/tesettur-abiye-hamburg"],
    ],
    open: "Menüyü aç",
    close: "Menüyü kapat",
    navLabel: "Ana menü",
    topicsLabel: "Konular",
    langLabel: "Dil",
    homeLabel: "GLAMORA ana sayfa",
  },
  ar: {
    skip: "انتقل إلى المحتوى",
    main: [
      ["المجموعة", "/#kollektion"],
      ["فساتين سهرة", "/ar/fasatin-sahra-hamburg"],
      ["عبايات", "/ar/abaya-hamburg"],
      ["فساتين محتشمة", "/ar/fasatin-mohtashima-hamburg"],
    ],
    desktop: [["فساتين سهرة", "/ar/fasatin-sahra-hamburg"], ["عبايات", "/ar/abaya-hamburg"]],
    visit: ["احجزي موعدًا", `mailto:${SITE.email}?subject=%D9%85%D9%88%D8%B9%D8%AF`],
    topics: [
      ["الخطوبة والحناء", "/ar/fasatin-khutuba-henna-hamburg"],
      ["فساتين محتشمة", "/ar/fasatin-mohtashima-hamburg"],
    ],
    open: "فتح القائمة",
    close: "إغلاق القائمة",
    navLabel: "القائمة الرئيسية",
    topicsLabel: "مواضيع",
    langLabel: "اللغة",
    homeLabel: "الصفحة الرئيسية GLAMORA",
  },
};

export const LANGUAGE_HOME = {
  de: "/",
  tr: "/tr/abiye-hamburg",
  ar: "/ar/fasatin-sahra-hamburg",
};

export function LanguageLinks({ locale, alternates = {}, className = "" }) {
  return (
    <>
      {Object.keys(LANGUAGE_LABEL).map((loc) => (
        <a
          key={loc}
          href={alternates[loc] ?? LANGUAGE_HOME[loc]}
          hrefLang={loc}
          lang={loc}
          aria-current={loc === locale ? "true" : undefined}
          className={className}
        >
          {LANGUAGE_LABEL[loc]}
        </a>
      ))}
    </>
  );
}

export default function Navigation({ locale = "de", alternates }) {
  const t = NAV[locale];
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
        {t.skip}
      </a>

      <header className="site-header" dir="ltr">
        <nav className="desktop-nav" aria-label={t.navLabel}>
          {t.desktop.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a href="/" className="brand-wordmark" aria-label={t.homeLabel}>
          GLAMORA
        </a>
        <a className="nav-visit" href={t.visit[1]}>
          <span>{t.visit[0]}</span>
          <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-trigger"
          aria-label={t.open}
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
        aria-label={t.navLabel}
      >
        <div className="menu-top">
          <span>GLAMORA</span>
          <button onClick={closeMenu} aria-label={t.close}>
            <X size={28} weight="light" />
          </button>
        </div>
        <nav>
          {t.main.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
              <ArrowUpRight size={28} weight="light" />
            </a>
          ))}
        </nav>
        <nav className="menu-topics" aria-label={t.topicsLabel}>
          {t.topics.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
        <nav className="menu-topics" aria-label={t.langLabel}>
          <LanguageLinks locale={locale} alternates={alternates} />
        </nav>
        <p dir="ltr">
          {SITE.street}
          <br />
          {SITE.zip} {SITE.city}-{SITE.district}
        </p>
      </dialog>
    </>
  );
}
