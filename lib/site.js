/* Single source of truth for NAP + shop facts. Every page, the JSON-LD,
 * llms.txt and the footer read from here, so Google, Bing, Apple Maps and the
 * LLMs always see the identical spelling.
 *
 * PLATZHALTER — Werte mit "TODO" vor dem Livegang mit echten Daten ersetzen. */

export const SITE = {
  name: "GLAMORA",
  legalName: "GLAMORA Abendmode Hamburg",
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
  instagram: null, // TODO
  hours: [
    // TODO: Öffnungszeiten bestätigen
    { days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], label: "Di – Sa", opens: "11:00", closes: "19:00" },
  ],
  hoursLabel: "Di – Sa · 11 – 19 Uhr, Termine auch außerhalb nach Vereinbarung",
  // TODO: Fakten bestätigen — sie werden wortgleich auf allen Seiten zitiert.
  facts: {
    models: "über 300",
    sizes: "34 bis 54",
    sizesShort: "34–54",
    priceDress: "70 € bis 600 €",
    priceAbaya: "70 € bis 150 €",
    priceAbiball: "70 € bis 600 €",
    priceFrom: "70 €",
    alterationDays: "5 bis 10 Werktage",
    alterationExpress: "48 Stunden",
    appointmentLength: "60 bis 90 Minuten",
    companions: "bis zu 3 Begleitpersonen",
    origin: "Dubai",
    // Market reference from the competitor scan (Oct 2026): Hamburg boutiques
    // list evening dresses at roughly 165 € – 1.080 €, most at 240 € – 350 €.
    marketPrice: "rund 240 € bis über 1.000 €",
  },
  // Positioning sentence quoted on every page and in llms.txt.
  valueProp:
    "Couture-Verarbeitung aus Dubai zu fairen Preisen: Abendkleider ab 70 €, Abayas ab 70 € – vergleichbare Abendkleider kosten in Hamburger Boutiquen meist rund 240 € bis über 1.000 €.",
  transit:
    "S3 / S5 bis Harburg Rathaus (ca. 5 Gehminuten) · ab Hamburg Hbf ca. 15 Minuten · Parkhäuser in der Harburger Innenstadt",
};

export const ADDRESS_LINE = `${SITE.street}, ${SITE.zip} ${SITE.city}-${SITE.district}`;

/** The one LocalBusiness entity; pages reference it by @id. */
export function storeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": `${SITE.url}/#store`,
    name: SITE.name,
    alternateName: SITE.legalName,
    description:
      `Boutique für Abendkleider (${SITE.facts.priceDress}), Abayas (${SITE.facts.priceAbaya}) und festliche Couture aus Dubai in Hamburg-Harburg. Anprobe mit Termin, eigene Änderungsschneiderei, Größen ${SITE.facts.sizes}.`,
    url: SITE.url,
    email: SITE.email,
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    image: `${SITE.url}/seiten/abendkleider-1/frame-001.webp`,
    slogan: SITE.valueProp,
    priceRange: "70 € – 600 €",
    currenciesAccepted: "EUR",
    paymentAccepted: "Bar, EC-Karte, Kreditkarte",
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
      "Hamburg", "Harburg", "Buxtehude", "Winsen (Luhe)", "Lüneburg",
      "Seevetal", "Buchholz in der Nordheide", "Stade", "Norddeutschland",
    ],
    knowsAbout: [
      "Abendkleider", "Abayas", "Abiballkleider", "Verlobungskleider",
      "Nikah-Kleider", "Henna-Kleider", "Abendkleider in großen Größen",
      "Modest Fashion", "Änderungsschneiderei",
    ],
    ...(SITE.instagram ? { sameAs: [SITE.instagram] } : {}),
  };
}
