/* Single source of truth for NAP + shop facts. Every page, the JSON-LD,
 * llms.txt and the footer read from here, so Google, Bing, Apple Maps and the
 * LLMs always see the identical spelling.
 *
 * PLATZHALTER — Werte mit "TODO" vor dem Livegang mit echten Daten ersetzen.
 * Felder mit `null` werden auf der Website und im Schema einfach weggelassen. */

export const SITE = {
  name: "GLAMORA",
  // Disambiguation: "GLAMORA" alone is used by several brands — on profiles,
  // in directories and in running text always "GLAMORA Hamburg".
  brandLocal: "GLAMORA Hamburg",
  legalName: "GLAMORA Abendmode Hamburg", // TODO: exakt wie im Impressum / Gewerbeschein
  url: "https://glamora.hamburg",
  email: "atelier@glamora.hamburg",
  phone: null, // TODO: "+49 40 …" — erst eintragen, wenn die Nummer fest ist
  whatsapp: null, // TODO: z. B. "https://wa.me/4940…"
  street: "Lüneburger Straße 33",
  zip: "21073",
  city: "Hamburg",
  district: "Harburg",
  region: "Hamburg",
  country: "DE",
  geo: { lat: 53.4609, lng: 9.9828 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=GLAMORA+L%C3%BCneburger+Stra%C3%9Fe+33+21073+Hamburg",
  // Profiles feed schema `sameAs` — the entity link between site, maps and social.
  social: {
    instagram: null, // TODO
    tiktok: null, // TODO
    facebook: null, // TODO
    pinterest: null, // TODO
    googleProfile: null, // TODO: Link aus dem Google-Unternehmensprofil (maps.app.goo.gl/…)
    yelp: null, // TODO
  },
  // E-E-A-T: real people behind the shop. Shown on /ueber-uns and in the schema.
  founder: null, // TODO: { name: "…", role: "Inhaberin", bio: "…" }
  foundingYear: null, // TODO: z. B. "2026"
  // Consultation languages. Only listed languages are claimed anywhere on the
  // site — the TR/AR pages mention native-language advice only if set here.
  languages: ["de"], // TODO: z. B. ["de", "tr", "ar"], wenn im Team gesprochen
  hours: [
    // TODO: Öffnungszeiten bestätigen
    { days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], label: "Di – Sa", opens: "11:00", closes: "19:00" },
  ],
  hoursLabel: "Di – Sa · 11 – 19 Uhr, Termine auch außerhalb nach Vereinbarung",
  // TODO: Fakten bestätigen — sie werden wortgleich auf allen Seiten zitiert.
  // Numbers first (shared by DE / TR / AR), German strings derived below.
  numbers: {
    models: 300, // "über 300"
    sizeMin: 34,
    sizeMax: 54,
    priceLow: 70,
    priceHigh: 600,
    abayaLow: 70,
    abayaHigh: 150,
    // One value for every "Bestellung aus Dubai" mention — LLMs drop facts
    // that contradict each other across pages.
    orderWeeks: [4, 6],
    appointmentMin: [60, 90],
    companions: 3,
  },
  // German fact strings — the numeric ones are filled from `numbers` below.
  facts: {
    origin: "Dubai",
    newArrivals: "jeden Monat",
    // Market reference from the competitor scan (Oct 2026): Hamburg boutiques
    // list evening dresses at roughly 165 € – 1.080 €, most at 240 € – 350 €.
    marketPrice: "rund 240 € bis über 1.000 €",
  },
  // Positioning sentence quoted on every page and in llms.txt.
  valueProp:
    "Couture-Verarbeitung aus Dubai zu fairen Preisen: Abendkleider ab 70 €, Abayas ab 70 € – vergleichbare Abendkleider kosten in Hamburger Boutiquen meist rund 240 € bis über 1.000 €.",
  transit:
    "S3 / S5 bis Harburg Rathaus (ca. 5 Gehminuten) · ab Hamburg Hbf ca. 15 Minuten · Parkhäuser in der Harburger Innenstadt",
  // TODO vor Ort prüfen: echte Namen der nächsten Parkhäuser / Orientierungspunkte.
  landmarks: ["Harburger Rathaus", "Fußgängerzone Lüneburger Straße"],
  // Content freshness — shown as "Stand" and used as dateModified / lastmod.
  updated: "2026-10-30",
};

// Catchment for areaServed + local copy (Hamburg-Süd, Elbinseln, Landkreis Harburg & Stade).
export const AREA = {
  districts: [
    "Harburg", "Heimfeld", "Eißendorf", "Marmstorf", "Wilstorf", "Rönneburg",
    "Neugraben-Fischbek", "Neuwiedenthal", "Hausbruch", "Wilhelmsburg", "Veddel",
    "Finkenwerder",
  ],
  towns: [
    "Buxtehude", "Stade", "Neu Wulmstorf", "Rosengarten", "Seevetal",
    "Buchholz in der Nordheide", "Winsen (Luhe)", "Lüneburg", "Jesteburg", "Tostedt",
  ],
};

// Derive every German fact string from SITE.numbers so DE / TR / AR never drift.
{
  const N = SITE.numbers;
  Object.assign(SITE.facts, {
    models: `über ${N.models}`,
    sizes: `${N.sizeMin} bis ${N.sizeMax}`,
    sizesShort: `${N.sizeMin}–${N.sizeMax}`,
    priceDress: `${N.priceLow} € bis ${N.priceHigh} €`,
    priceAbaya: `${N.abayaLow} € bis ${N.abayaHigh} €`,
    priceAbiball: `${N.priceLow} € bis ${N.priceHigh} €`,
    priceFrom: `${N.priceLow} €`,
    priceLow: N.priceLow,
    priceHigh: N.priceHigh,
    abayaLow: N.abayaLow,
    abayaHigh: N.abayaHigh,
    orderDubai: `${N.orderWeeks[0]} bis ${N.orderWeeks[1]} Wochen`,
    appointmentLength: `${N.appointmentMin[0]} bis ${N.appointmentMin[1]} Minuten`,
    companions: `bis zu ${N.companions} Begleitpersonen`,
  });
}

export const ADDRESS_LINE =`${SITE.street}, ${SITE.zip} ${SITE.city}-${SITE.district}`;

export const SAME_AS = Object.values(SITE.social).filter(Boolean);

export const STORE_ID = `${SITE.url}/#store`;

const LANGUAGE_NAMES = { de: "Deutsch", tr: "Türkisch", ar: "Arabisch" };
export const speaks = (code) => SITE.languages.includes(code);

/* Offer catalogue: categories with price ranges, each linked to its landing
 * page. Gives Google + LLMs a structured "what do they sell, for how much". */
function offerCatalog() {
  const F = SITE.facts;
  const cat = (name, path, low, high) => ({
    "@type": "OfferCatalog",
    name,
    url: `${SITE.url}${path}`,
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name, category: name },
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: low,
          maxPrice: high,
          priceCurrency: "EUR",
        },
        availability: "https://schema.org/InStoreOnly",
        seller: { "@id": STORE_ID },
      },
    ],
  });
  return {
    "@type": "OfferCatalog",
    name: "Sortiment GLAMORA Hamburg",
    itemListElement: [
      cat("Abendkleider", "/abendkleider-hamburg", F.priceLow, F.priceHigh),
      cat("Abayas", "/abaya-hamburg", F.abayaLow, F.abayaHigh),
      cat("Hijab-Abendkleider", "/hijab-abendkleider-hamburg", F.priceLow, F.priceHigh),
      cat("Abiballkleider", "/abiballkleider-hamburg", F.priceLow, F.priceHigh),
      cat("Verlobungskleider", "/verlobungskleid-hamburg", F.priceLow, F.priceHigh),
      cat("Nikah- und Henna-Kleider", "/nikah-henna-kleid-hamburg", F.priceLow, F.priceHigh),
      cat("Kleider für Hochzeitsgäste", "/kleid-hochzeitsgast-hamburg", F.priceLow, F.priceHigh),
      cat("Brautjungfernkleider", "/brautjungfernkleider-hamburg", F.priceLow, F.priceHigh),
      cat("Abendkleider in großen Größen", "/abendkleider-grosse-groessen-hamburg", F.priceLow, F.priceHigh),
    ],
  };
}

/** The one LocalBusiness entity; pages reference it by @id. */
export function storeJsonLd() {
  const F = SITE.facts;
  const place = (name, type = "City") => ({ "@type": type, name });
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": STORE_ID,
    name: SITE.name,
    alternateName: [SITE.brandLocal, SITE.legalName],
    legalName: SITE.legalName,
    description:
      `Boutique für Abendkleider (${F.priceDress}), Abayas (${F.priceAbaya}) und festliche Couture aus ${F.origin} in Hamburg-Harburg, ${SITE.street}. Anprobe mit Termin im privaten Salon, Größen ${F.sizes}, ${F.models} Modelle vor Ort.`,
    url: SITE.url,
    email: SITE.email,
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png`, width: 1200, height: 400 },
    image: [
      `${SITE.url}/og/boutique-1.jpg`,
      `${SITE.url}/og/boutique-2.jpg`,
      `${SITE.url}/og/harburg-1.jpg`,
    ],
    slogan: SITE.valueProp,
    priceRange: `${F.priceLow} € – ${F.priceHigh} €`,
    currenciesAccepted: "EUR",
    paymentAccepted: "Bar, EC-Karte, Kreditkarte", // TODO bestätigen
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      postalCode: SITE.zip,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.mapsUrl,
    openingHoursSpecification: SITE.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: [
      place("Hamburg"),
      ...AREA.districts.map((d) => place(`Hamburg-${d}`, "Place")),
      ...AREA.towns.map((t) => place(t)),
      place("Landkreis Harburg", "AdministrativeArea"),
      place("Landkreis Stade", "AdministrativeArea"),
      place("Norddeutschland", "AdministrativeArea"),
    ],
    knowsAbout: [
      "Abendkleider", "Abayas", "Dubai-Abayas", "Abiballkleider", "Ballkleider",
      "Verlobungskleider", "Nikah-Kleider", "Henna-Kleider", "Kına-Kleider",
      "Hijab-Abendkleider", "Modest Fashion", "Tesettür-Abiye",
      "Kleider für Hochzeitsgäste", "Brautjungfernkleider",
      "Abendkleider in großen Größen", "Dresscodes Black Tie und Gala",
    ],
    knowsLanguage: SITE.languages.map((l) => LANGUAGE_NAMES[l]),
    hasOfferCatalog: offerCatalog(),
    potentialAction: {
      "@type": "ReserveAction",
      name: "Anprobe-Termin vereinbaren",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/termin`,
        actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
      },
      result: { "@type": "Reservation", name: "Anprobe im privaten Salon" },
    },
    ...(SITE.founder
      ? { founder: { "@type": "Person", name: SITE.founder.name, jobTitle: SITE.founder.role } }
      : {}),
    ...(SITE.foundingYear ? { foundingDate: SITE.foundingYear } : {}),
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
    // aggregateRating erst eintragen, wenn echte Google-Bewertungen vorliegen — nie vorher.
  };
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  alternateName: SITE.brandLocal,
  inLanguage: ["de-DE", "tr", "ar"],
  publisher: { "@id": STORE_ID },
};
