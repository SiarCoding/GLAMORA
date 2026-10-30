"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { GOWNS } from "@/components/garderobe/gowns";
import { useScrollVar } from "@/hooks/useScrollVar";
import { SITE } from "@/lib/site";

// „Die Garderobe" — the boutique rail. Twelve real gowns from the atelier,
// re-shot via Higgsfield as 4K catalogue stills (GPT Image 2.5, reference =
// the in-store / model photo), then a side-profile still and a Seedance 2.0
// turn (side → front) per gown. At rest every gown hangs in profile, like on
// a real rail; hover/focus makes it turn to face you while its neighbours
// make room, and it turns back on leave (the clip is scrubbed in reverse).
//
// All clips and stills were colour-normalised onto one backdrop (BACKDROP).
// The section sits a touch darker (SECTION_BG): under `darken` the clips'
// backdrop then always loses to the page and vanishes — no alpha video needed.

const BACKDROP = "#F4EEE4";
const SECTION_BG = "#F1EBE1";
const FRAME_RATIO = 9 / 16; // clip width / height
// Clips are pre-timed to a ~1.6 s turn (idle frames trimmed, retimed to 48 fps),
// so these only fine-tune the feel.
const PLAY_RATE = 1.6; // forward turn speed → ~1 s turn
const REWIND_RATE = 2; // turn-back speed (s of clip per s) → ~0.8 s

const pad = (n) => String(n).padStart(2, "0");

// Absolute URLs for structured data come from the one NAP source.
const SITE_URL = SITE.url;

// Product list for search engines and LLMs — every gown on the rack.
function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Abendkleider aus dem GLAMORA Sortiment",
    numberOfItems: GOWNS.length,
    itemListElement: GOWNS.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${g.name} – ${g.line}`,
        description: `${g.line}: ${g.details.join(", ")}.`,
        image: `${SITE_URL}/abendkleider/${g.id}-4k.webp`,
        category: "Abendkleid",
        color: g.color,
        material: g.material,
        brand: { "@type": "Brand", name: "GLAMORA" },
        ...(g.productUrl ? { url: g.productUrl } : {}),
        // Offer only with a real price per gown (gowns.js → price) — Google
        // rejects invented prices; without one the item stays a plain Product.
        ...(g.price
          ? {
              offers: {
                "@type": "Offer",
                price: g.price,
                priceCurrency: "EUR",
                availability: "https://schema.org/InStoreOnly",
                seller: { "@id": `${SITE.url}/#store` },
              },
            }
          : {}),
      },
    })),
  };
}

export default function GarderobeSection() {
  const [active, setActive] = useState(null); // gown facing the viewer
  const [open, setOpen] = useState(null); // gown shown in the detail view
  const [warm, setWarm] = useState(false); // section near viewport → load clips
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const rackRef = useRef(null);
  const returnFocusRef = useRef(null);
  useScrollVar(headRef, { mode: "view", smoothing: 0.14 });
  useScrollVar(rackRef, { mode: "view", smoothing: 0.14 });

  // Start fetching the clips shortly before the section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setWarm(true);
        io.disconnect();
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const openGown = (i) => {
    returnFocusRef.current = document.activeElement;
    setOpen(i);
  };

  const caption = active ?? open;

  return (
    <section
      ref={sectionRef}
      id="garderobe"
      aria-labelledby="garderobe-title"
      className="relative overflow-hidden pb-20 pt-24 md:pb-28 md:pt-32"
      style={{ background: SECTION_BG }}
    >
      <div className="absolute inset-x-0 top-0 h-px rule-gold" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd()) }}
      />

      {/* Header */}
      {/* Header — kinetic type in the showroom idiom: the two lines swing in
          from opposite sides as 3D planes while a stroke-only „Garderobe"
          drifts behind; all driven by --p from useScrollVar (see globals.css). */}
      <header ref={headRef} className="garderobe-head relative" style={{ "--p": 0 }}>
        <span aria-hidden="true" className="garderobe-ghost font-display">
          Garderobe
        </span>
        <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="mb-6 flex items-center gap-3 md:mb-8">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[10.5px] uppercase tracking-widest2 text-gold-600">
              Die Garderobe · Atelier Hamburg
            </span>
          </div>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 id="garderobe-title" className="garderobe-h font-display tracking-tight text-noir">
              <span className="garderobe-line garderobe-line--a">Unsere </span>
              <span className="garderobe-line garderobe-line--b italic text-gold-500">
                Abendkleider.
              </span>
            </h2>
            <p className="garderobe-lede max-w-sm text-[14px] leading-[1.8] text-noir/60 md:mb-4">
              {GOWNS.length} Abendkleider aus der GLAMORA Dubai Kollektion:
              Korsett-Roben mit Perlenstickerei, Plissee-Kleider mit Kristallgürtel,
              Chiffon-Roben mit Schal und Meerjungfrau-Kleider aus Satin. Jedes Modell
              können Sie nach Vereinbarung in unserem Atelier in Hamburg anprobieren.
            </p>
          </div>
        </div>
      </header>

      {/* Rack — one rod on desktop; on phones two rods of six, stacked like a
          boutique double rail, so every gown stays on screen. */}
      {/* The rack tips up out of the floor plane as it scrolls in. It carries
          the section colour itself: the 3D transform isolates the gowns'
          `darken` blend, so the backdrop has to live inside that group. */}
      <div ref={rackRef} className="garderobe-tilt" style={{ "--p": 0, background: SECTION_BG }}>
      <div className="garderobe-rack relative mt-12 md:mt-20">
        <div className="hidden md:block">
          <Rod />
        </div>
        {ROWS.map((row) => (
          <RailRow
            key={row[0]}
            indices={row}
            active={active}
            setActive={setActive}
            warm={warm}
            onOpen={openGown}
          />
        ))}
      </div>
      </div>

      <div
        className="mx-auto flex min-h-[96px] max-w-[1480px] flex-col items-center px-6 text-center"
        aria-live="polite"
      >
        {caption !== null ? (
          <div key={caption} className="garderobe-caption">
            <div className="text-[10.5px] uppercase tracking-widest2 text-gold-600">
              N° {pad(caption + 1)} / {pad(GOWNS.length)}
            </div>
            <div className="mt-2 font-display text-[28px] leading-tight text-noir md:text-[34px]">
              {GOWNS[caption].name}
            </div>
            <div className="mt-1 text-[13px] text-noir/55">{GOWNS[caption].line}</div>
          </div>
        ) : (
          <div className="garderobe-caption text-[11px] uppercase tracking-widest2 text-noir/40">
            <span className="hidden md:inline">Bewegen zum Drehen · Klicken für Details</span>
            <span className="md:hidden">Über die Stange streichen · erneut tippen für Details</span>
          </div>
        )}
      </div>

      {open !== null && (
        <GownDialog
          index={open}
          onIndex={setOpen}
          onClose={() => {
            setOpen(null);
            // Hand focus back to whatever opened the dialog.
            const el = returnFocusRef.current;
            requestAnimationFrame(() => el?.focus?.({ preventScroll: true }));
          }}
        />
      )}
    </section>
  );
}

// Two rows of six on phones; on desktop the rows sit side by side and read
// as one rod.
const HALF = Math.ceil(GOWNS.length / 2);
const ROWS = [
  GOWNS.slice(0, HALF).map((_, i) => i),
  GOWNS.slice(HALF).map((_, i) => i + HALF),
];

// One row of the rack. Mouse: hover turns, click opens. Touch: the gown under
// the finger turns as it slides along the rod; tapping the gown that already
// faces you opens it. Vertical page scrolling stays native (touch-action).
function RailRow({ indices, active, setActive, warm, onOpen }) {
  const touch = useRef(null);
  const gownAt = (e) => {
    const li = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-gown]");
    return li ? Number(li.dataset.index) : null;
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse") return;
    const i = gownAt(e);
    touch.current = { x: e.clientX, y: e.clientY, i, was: i !== null && active === i, moved: false };
    if (i !== null) setActive(i);
  };
  const onPointerMove = (e) => {
    const t = touch.current;
    if (!t || e.pointerType === "mouse") return;
    if (Math.hypot(e.clientX - t.x, e.clientY - t.y) > 8) t.moved = true;
    const i = gownAt(e);
    if (i !== null) setActive(i);
  };
  const onPointerUp = () => {
    const t = touch.current;
    touch.current = null;
    if (t && !t.moved && t.was) onOpen(t.i);
  };

  return (
    <div className="garderobe-row relative">
      <div className="md:hidden">
        <Rod />
      </div>
      <ul
        className="garderobe-rail relative flex items-start justify-center"
        onMouseLeave={() => setActive((a) => (indices.includes(a) ? null : a))}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (touch.current = null)}
      >
        {indices.map((i) => (
          <GownOnRail
            key={GOWNS[i].id}
            gown={GOWNS[i]}
            index={i}
            active={active === i}
            warm={warm}
            onActivate={() => setActive(i)}
            onDeactivate={() => setActive((a) => (a === i ? null : a))}
            onOpen={() => onOpen(i)}
          />
        ))}
      </ul>
    </div>
  );
}

// One gown on the rail. Every gown gets the same slot (like hangers spaced
// along a real rod); the full clip is painted centred over it and may overlap
// its neighbours. Clips blend with `darken`: their colour-matched backdrops
// cancel out, so only the gowns read. The active slot widens to the front
// silhouette, which pushes the neighbours apart while the gown turns.
//
// Anything between the clip and the section that creates a stacking context
// (z-index, transform, mask, opacity < 1) isolates the blend — the only one,
// .garderobe-tilt, therefore paints the section colour itself.
function GownOnRail({ gown: g, index, active, warm, onActivate, onDeactivate, onOpen }) {
  const videoRef = useRef(null);
  const pointer = useRef("mouse");
  useTurn(videoRef, active);

  const frameW = `var(--gown-h) * ${FRAME_RATIO}`;
  // Shift the clip so the silhouette stays centred over its slot.
  const shift = active ? 0.5 - g.frontCx : 0.5 - g.sideCx;

  return (
    <li
      data-gown
      data-index={index}
      data-active={active || undefined}
      className="garderobe-item relative shrink-0 "
      style={{
        "--w-front": `calc(${frameW} * ${(g.front + 0.06).toFixed(4)})`,
        marginTop: `calc(3px - var(--gown-h) * ${g.hook})`,
      }}
    >
      <button
        type="button"
        onPointerDown={(e) => (pointer.current = e.pointerType)}
        onPointerEnter={(e) => e.pointerType === "mouse" && onActivate()}
        onFocus={onActivate}
        onBlur={onDeactivate}
        // Touch taps are handled by the row (turn first, open on second tap).
        onClick={() => {
          const touchTap = pointer.current !== "mouse";
          pointer.current = "mouse";
          if (!touchTap) onOpen();
        }}
        aria-label={`${g.name} – ${g.line}. Details öffnen`}
        className="garderobe-slot block cursor-pointer outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold/70"
      />
      <video
        ref={videoRef}
        className="garderobe-clip pointer-events-none absolute left-1/2 top-0 h-full max-w-none select-none"
        style={{
          width: `calc(${frameW})`,
          marginLeft: `calc((${frameW}) * ${(shift - 0.5).toFixed(4)})`,
        }}
        src={warm ? `/abendkleider/turn/${g.id}.mp4` : undefined}
        poster={`/abendkleider/turn/${g.id}-side.webp`}
        preload={warm ? "auto" : "none"}
        muted
        playsInline
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />
    </li>
  );
}

// Plays the turn forward while active; scrubs it back to the side profile
// when released. Reduced motion jumps straight to the end state.
function useTurn(videoRef, active) {
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    if (active) {
      if (reduce) {
        if (v.duration) v.currentTime = v.duration - 0.05;
        return;
      }
      v.playbackRate = PLAY_RATE;
      v.play().catch(() => {});
      return () => v.pause();
    }

    v.pause();
    if (reduce || v.currentTime === 0) {
      v.currentTime = 0;
      return;
    }
    let last = performance.now();
    const rewind = (now) => {
      const t = Math.max(0, v.currentTime - ((now - last) / 1000) * REWIND_RATE);
      last = now;
      v.currentTime = t;
      if (t > 0) raf = requestAnimationFrame(rewind);
    };
    raf = requestAnimationFrame(rewind);
    return () => cancelAnimationFrame(raf);
  }, [active, videoRef]);
}

// Brass rod spanning the full width, with wall brackets and finials.
function Rod() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-[6px] z-30 md:inset-x-6">
      <div className="relative h-[5px] rounded-full bg-[linear-gradient(180deg,#F3E3A8_0%,#D4AF37_35%,#8E7421_100%)] shadow-[0_6px_14px_-6px_rgba(26,22,17,0.45)]" />
      {["left-[3%]", "right-[3%]"].map((pos) => (
        <span
          key={pos}
          className={`absolute -top-[26px] ${pos} h-[30px] w-[3px] bg-[linear-gradient(90deg,#8E7421,#E0BD51,#8E7421)]`}
        />
      ))}
      <span className="absolute -left-1 -top-[3px] h-[11px] w-[11px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#F6EAB6,#B8962B_60%,#8E7421)]" />
      <span className="absolute -right-1 -top-[3px] h-[11px] w-[11px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#F6EAB6,#B8962B_60%,#8E7421)]" />
    </div>
  );
}

function GownDialog({ index, onIndex, onClose }) {
  const g = GOWNS[index];
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const step = useCallback(
    (dir) => {
      setLoaded(false);
      onIndex((index + dir + GOWNS.length) % GOWNS.length);
    },
    [index, onIndex]
  );

  // Scroll lock + initial focus.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Escape, arrow keys, and a simple focus trap.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll("button, a[href]");
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  const href = g.productUrl ?? "#anprobe";

  return (
    <div
      className="garderobe-dialog fixed inset-0 z-[100] flex items-center justify-center bg-porcelain/80 p-0 backdrop-blur-xl md:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gown-dialog-title"
        className="garderobe-panel relative grid h-full w-full max-w-[1280px] grid-rows-[1fr_auto] overflow-hidden shadow-[0_40px_120px_-40px_rgba(26,22,17,0.45)] md:h-[min(92vh,980px)] md:grid-cols-[1.15fr_1fr] md:grid-rows-1"
        style={{ background: BACKDROP }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-noir/15 bg-linen/70 text-noir backdrop-blur transition-colors hover:border-gold hover:text-gold-600 focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold"
          aria-label="Schließen"
        >
          <X size={18} weight="light" />
        </button>

        {/* Image — the clip's front frame paints instantly, the 4K still fades in over it. */}
        <div className="relative min-h-0 overflow-hidden">
          <img
            key={`${g.id}-low`}
            src={`/abendkleider/turn/${g.id}-front.webp`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
          />
          <img
            key={g.id}
            src={`/abendkleider/${g.id}-4k.webp`}
            alt={`${g.name} – ${g.line}`}
            onLoad={() => setLoaded(true)}
            className="garderobe-detail-img absolute inset-0 h-full w-full object-contain"
            style={{ opacity: loaded ? 1 : 0 }}
          />
        </div>

        {/* Copy */}
        <div className="relative flex flex-col justify-between gap-8 border-t border-line bg-linen/40 px-6 py-7 md:border-l md:border-t-0 md:px-14 md:py-16">
          <div key={g.id} className="garderobe-caption">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[10.5px] uppercase tracking-widest2 text-gold-600">
                N° {pad(index + 1)} / {pad(GOWNS.length)}
              </span>
            </div>
            <h3
              id="gown-dialog-title"
              className="mt-5 font-display text-[40px] leading-[1.02] tracking-tight text-noir md:text-[64px]"
            >
              {g.name}
            </h3>
            <p className="mt-3 text-[15px] text-noir/60">{g.line}</p>
            <ul className="mt-8 hidden space-y-3 border-t border-line pt-8 md:block">
              {g.details.map((d) => (
                <li key={d} className="flex gap-3 text-[13.5px] leading-relaxed text-noir/70">
                  <span className="mt-[9px] h-px w-4 shrink-0 bg-gold" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between gap-3">
            <a
              href={href}
              onClick={g.productUrl ? undefined : onClose}
              className="inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-noir px-5 py-4 text-[10.5px] uppercase tracking-[0.22em] text-bone transition-colors hover:bg-gold hover:text-noir md:px-7 md:text-[11px] md:tracking-widest2"
            >
              {g.productUrl ? "Kleid entdecken" : "Anprobe vereinbaren"}
              <ArrowRight size={14} weight="light" />
            </a>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Vorherige Robe"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-noir/15 text-noir transition-colors hover:border-gold hover:text-gold-600 md:h-11 md:w-11"
              >
                <ArrowLeft size={16} weight="light" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Nächste Robe"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-noir/15 text-noir transition-colors hover:border-gold hover:text-gold-600 md:h-11 md:w-11"
              >
                <ArrowRight size={16} weight="light" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
