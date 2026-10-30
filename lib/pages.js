import { SITE, ADDRESS_LINE } from "@/lib/site";

/* Content model for every German keyword landing page. Each page follows the
 * same answer-first template: H1 → 2–3 sentence answer with hard facts → fact
 * grid → scroll sequence → H2 sections (question-style headings, tables) →
 * scroll sequence → FAQ (FAQPage schema) → visit CTA → related pages.
 *
 * `group` links a page to its Turkish / Arabic counterpart (hreflang), see
 * lib/registry.js. Sequence frames live in /public/seiten/<dir>/frame-001.webp …
 *
 * GLAMORA hat KEINE eigene Schneiderei — nirgends Änderungen im Haus versprechen. */

const F = SITE.facts;
// "70 € bis 600 €" → "70 € und 600 €" after "zwischen".
export const between = (range) => range.replace(" bis ", " und ");
// Scenes with a person (or dress form) were re-shot by Kling on a seamless white
// studio background (/seiten/weiss/<dir>, 9:16, background baked to the page
// porcelain); the rest play as framed full scenes.
const CUT = new Set([
  "abendkleider-1", "abendkleider-2", "abaya-1", "abaya-2", "boutique-2",
  "abiball-1", "abiball-2", "verlobung-1", "verlobung-2", "curvy-1", "curvy-2",
  "hijab-1", "hijab-2", "harburg-2",
]);

export const seq = (dir, copy) =>
  CUT.has(dir)
    ? { dir, basePath: `/seiten/weiss/${dir}`, frameCount: 120, variant: "cut", ...copy }
    : { dir, basePath: `/seiten/${dir}`, frameCount: 120, variant: "framed", ...copy };

const visitFacts = [
  ["Adresse", ADDRESS_LINE],
  ["Anprobe", `mit Termin, ${F.appointmentLength}`],
  ["Größen", F.sizes],
  ["Beratung", "kostenlos & unverbindlich"],
];

const howToGetHere = ["Wie komme ich zu GLAMORA?", `${SITE.transit}.`];

/* Shared block for the Umland pages: a real, town-specific journey table. */
const townPage = ({ slug, town, nav, keywords, journey, distance, why, extraFaq = [], seqs, related }) => ({
  slug,
  nav,
  title: `Abendkleider ${town} – Boutique in Hamburg-Harburg, ${distance} | GLAMORA`,
  description: `Abendkleider & Abayas für Kundinnen aus ${town}: GLAMORA in Hamburg-Harburg, ${SITE.street} – ${distance}. ${F.models} Modelle aus Dubai, ${F.priceDress}, Größen ${F.sizes}, Anprobe mit Termin.`,
  keywords,
  eyebrow: `Für Kundinnen aus ${town}`,
  h1: `Abendkleider für ${town} – Anprobe in Hamburg-Harburg`,
  lead: `Aus ${town} ist GLAMORA in Hamburg-Harburg ${distance} entfernt. In unserer Boutique in der ${SITE.street} hängen ${F.models} Abendkleider, Abiballkleider und Abayas aus Dubai in Größen ${F.sizes}, preislich zwischen ${between(F.priceDress)}. Mit Termin haben Sie den Salon für sich – ideal, wenn Sie extra anreisen.`,
  facts: [
    ["Anfahrt", distance],
    ["Adresse", ADDRESS_LINE],
    ["Preise", F.priceDress],
    ["Größen", F.sizes],
    ["Öffnungszeiten", SITE.hoursLabel],
  ],
  sequences: seqs,
  sections: [
    {
      h2: `Wie komme ich von ${town} zu GLAMORA?`,
      body: [why],
      table: { head: ["Verkehrsmittel", "Verbindung", "Dauer ca."], rows: journey },
    },
    {
      h2: `Warum aus ${town} nach Harburg statt in die Hamburger Innenstadt?`,
      body: [
        `Harburg liegt für den Hamburger Süden und das niedersächsische Umland vor der Elbe – ohne Elbbrücken-Stau, ohne Parkplatzsuche am Jungfernstieg. Bei GLAMORA kommt dazu: ${F.models} Modelle an einem Ort, eine Vorauswahl nach Ihrem Anlass, Couture aus Dubai ab ${F.priceFrom}.`,
      ],
      table: {
        head: ["", "GLAMORA Harburg", "Boutique Innenstadt"],
        rows: [
          ["Preis Abendkleid", F.priceDress, `meist ${F.marketPrice}`],
          ["Anprobe", "Privater Salon mit Termin", "oft ohne Termin, Laufkundschaft"],
          ["Größen", F.sizes, "oft nur bis 42/44"],
          ["Abayas & Hijab-Abendkleider", "ja, Schwerpunkt", "selten"],
        ],
      },
    },
  ],
  faq: [
    [`Wo finde ich Abendkleider in der Nähe von ${town}?`, `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE} – ${distance} von ${town}. ${F.models} Modelle aus Dubai, ${F.priceDress}.`],
    [`Wie lange fahre ich von ${town} zu GLAMORA?`, `${distance}. Die genaue Verbindung finden Sie in der Tabelle oben.`],
    ["Brauche ich einen Termin?", "Wir empfehlen ihn, gerade bei längerer Anreise: Dann hängt Ihre Vorauswahl bereit und der Salon gehört Ihnen."],
    ...extraFaq,
    ["Welche Öffnungszeiten hat GLAMORA?", `${SITE.hoursLabel}.`],
  ],
  related,
});

export const PAGES = [
  /* ───────────────────────────── Abendkleider Hamburg ───────────────────── */
  {
    slug: "abendkleider-hamburg",
    group: "main",
    nav: "Abendkleider Hamburg",
    title: "Abendkleider Hamburg – Couture aus Dubai ab 70 €, Anprobe mit Termin | GLAMORA",
    description: `Abendkleider in Hamburg kaufen: ${F.models} Modelle aus Dubai, Größen ${F.sizes}, ${F.priceDress}. Private Anprobe mit Termin in Hamburg-Harburg, Lüneburger Straße 33.`,
    keywords: ["Abendkleider Hamburg", "Abendkleid kaufen Hamburg", "lange Abendkleider Hamburg", "exklusive Abendkleider Hamburg", "Ballkleid Hamburg"],
    eyebrow: "Abendkleider · Hamburg",
    h1: "Abendkleider in Hamburg – Couture aus Dubai, privat anprobiert",
    lead: `GLAMORA ist eine Boutique für Abendkleider in Hamburg-Harburg (${SITE.street}). Wir führen ${F.models} Abendkleider, Ballkleider und Abayas aus Dubai in den Größen ${F.sizes}, preislich zwischen ${between(F.priceDress)}. Die Anprobe findet mit Termin im privaten Salon statt und dauert ${F.appointmentLength}.`,
    facts: [
      ["Modelle", F.models],
      ["Preise", F.priceDress],
      ...visitFacts,
    ],
    sequences: [
      seq("abendkleider-1", {
        eyebrow: "Die Kollektion",
        title: "Satin, Seide, Kristall.",
        body: "Jedes Kleid wird in Dubai gefertigt – mit handgesetzten Kristallen, Korsagen mit Stäbchen und Stoffen, die man in Hamburger Kaufhäusern selten findet.",
        points: ["Lange Abendkleider & Ballkleider", "Meerjungfrau, A-Linie, Empire", "Smaragd, Champagner, Noir, Bordeaux"],
        focalX: 0.66,
      }),
      seq("abendkleider-2", {
        eyebrow: "Für jeden Anlass",
        title: "Gala, Hochzeit, Ball.",
        body: "Ob Hochzeitsgast, Gala, Opernabend oder Abiball – wir stellen Ihnen vorab eine Auswahl passend zu Anlass, Größe und Budget zusammen.",
        points: ["Vorauswahl nach Ihren Angaben", "Private Kabine & Spiegelsalon", "Accessoires passend zum Kleid"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Wo kaufe ich in Hamburg ein exklusives Abendkleid?",
        body: [
          `Wer in Hamburg ein Abendkleid sucht, das nicht von der Stange kommt, findet bei GLAMORA in Harburg Couture aus Dubai: aufwendige Stickereien, Pailletten, Perlen und Korsagen in Größen ${F.sizes}. Anders als in großen Häusern beraten wir immer nur eine Kundin gleichzeitig – mit Zeit, Ruhe und einer Vorauswahl, die zu Ihrem Anlass passt.`,
          `Die Boutique liegt in der ${SITE.street}, wenige Gehminuten von der S-Bahn Harburg Rathaus. Aus der Hamburger Innenstadt sind Sie in rund 15 Minuten da, aus Wilhelmsburg in unter 10 Minuten, aus Buxtehude, Winsen, Seevetal und Lüneburg meist schneller als in die City.`,
        ],
      },
      {
        h2: "Was kostet ein Abendkleid bei GLAMORA?",
        body: [
          `Unsere Abendkleider kosten zwischen ${between(F.priceDress)}, Abayas zwischen ${between(F.priceAbaya)}, Abiballkleider liegen ebenfalls zwischen ${between(F.priceAbiball)}.`,
          `Zum Vergleich: In Hamburger Boutiquen kosten vergleichbare Abendkleider meist ${F.marketPrice}. Bei GLAMORA bekommen Sie Couture-Verarbeitung aus Dubai – handgesetzte Kristalle, Korsagen mit Stäbchen, Goldstickerei – für einen Bruchteil davon, inklusive persönlicher Beratung.`,
        ],
        table: {
          head: ["Kategorie", "Preisrahmen", "Typische Anlässe"],
          rows: [
            ["Abendkleider", F.priceDress, "Gala, Hochzeitsgast, Ball, Oper"],
            ["Abayas (festlich)", F.priceAbaya, "Hochzeit, Nikah, Eid, Verlobung"],
            ["Abiballkleider", F.priceAbiball, "Abiball, Abschlussball, Abtanzball"],
            ["Verlobungs- & Henna-Kleider", F.priceDress, "Verlobung, Nişan, Henna-Nacht, Standesamt"],
          ],
        },
      },
      {
        h2: "Welcher Schnitt passt zu welchem Anlass?",
        body: ["Als Faustregel: Je formeller der Dresscode, desto länger und ruhiger der Schnitt. Die Tabelle hilft bei der ersten Orientierung, in der Anprobe beraten wir individuell."],
        table: {
          head: ["Dresscode / Anlass", "Passende Schnitte", "Farben", "Eher vermeiden"],
          rows: [
            ["Black Tie / Gala", "Bodenlang, Meerjungfrau, A-Linie", "Noir, Smaragd, Saphir, Champagner", "Kurze Kleider, Jersey"],
            ["Hochzeitsgast", "Midi bis bodenlang, Chiffon, Satin", "Salbei, Flieder, Rosé, Bordeaux", "Weiß, Ivory, Creme"],
            ["Abiball", "Ballkleid, Pailletten-Column, Corsage", "Puderblau, Rosé-Gold, Silber", "Sehr schwere Schleppen"],
            ["Verlobung / Nişan", "Corsage, Cape-Ärmel, Kristallgürtel", "Flieder, Smaragd, Rosé, Gold", "Brautweiß (je nach Tradition)"],
          ],
        },
      },
      {
        h2: "Wie läuft die Anprobe mit Termin ab?",
        body: [
          `Ein Termin dauert ${F.appointmentLength}. Sie können ${F.companions} mitbringen. Vorab fragen wir Anlass, Größe, Lieblingsfarben und Budget ab, damit die passende Auswahl schon bereithängt.`,
          `Ist Ihr Wunschmodell nicht in Ihrer Größe oder Farbe da, bestellen wir es aus Dubai – das dauert in der Regel ${F.orderDubai}.`,
        ],
      },
    ],
    faq: [
      ["Wo finde ich in Hamburg exklusive Abendkleider?", `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE}. Wir führen ${F.models} Abendkleider und Abayas aus Dubai in Größen ${F.sizes} mit privater Anprobe nach Termin.`],
      ["Was kostet ein Abendkleid bei GLAMORA?", `Abendkleider kosten ${F.priceDress}, Abiballkleider ${F.priceAbiball}, festliche Abayas ${F.priceAbaya}.`],
      ["Ist GLAMORA günstiger als andere Abendkleider-Geschäfte in Hamburg?", `In der Regel deutlich. Unsere Abendkleider kosten ${F.priceDress}, vergleichbare Kleider liegen in Hamburger Boutiquen meist bei ${F.marketPrice}. Die Qualität entspricht Couture aus Dubai: handgesetzte Kristalle, Korsagen mit Stäbchen, hochwertiger Satin und Chiffon.`],
      ["Brauche ich einen Termin?", "Wir empfehlen einen Termin, damit Sie den Salon für sich haben und Ihre Vorauswahl bereithängt. Spontane Besuche sind möglich, wenn gerade kein Termin läuft."],
      ["Welche Größen gibt es?", `Unsere Kollektion reicht von Größe ${F.sizes}. Ist ein Modell nicht in Ihrer Größe vorrätig, bestellen wir es aus Dubai (${F.orderDubai}).`],
      ["Bietet GLAMORA Änderungen an?", "Nein, eine eigene Schneiderei haben wir nicht. Wir helfen Ihnen in der Anprobe, das Modell und die Größe zu finden, die ohne große Änderungen sitzen."],
      ["Wie lange vor dem Anlass sollte ich kaufen?", `Ideal sind 6 bis 8 Wochen vorher. So bleibt Zeit für eine Bestellung aus Dubai (${F.orderDubai}). Kurzfristig helfen wir mit Lagerware zum direkten Mitnehmen.`],
      howToGetHere,
    ],
    related: ["abendmode-geschaeft-hamburg", "abaya-hamburg", "kleid-hochzeitsgast-hamburg", "abendkleider-grosse-groessen-hamburg"],
  },

  /* ───────────────────────────── Abaya Hamburg ──────────────────────────── */
  {
    slug: "abaya-hamburg",
    group: "abaya",
    nav: "Abaya Hamburg",
    title: "Abaya Hamburg – Abaya-Laden in Harburg, Dubai-Abayas anprobieren | GLAMORA",
    description: `Abaya kaufen in Hamburg: festliche Dubai-Abayas für Hochzeit, Nikah & Eid im Laden anprobieren. ${F.priceAbaya}, Längen 52 bis 60 Zoll. Lüneburger Straße 33, Hamburg-Harburg.`,
    keywords: ["Abaya Hamburg", "Abaya Laden Hamburg", "Abaya kaufen Hamburg", "Dubai Abaya", "festliche Abaya", "Abaya Geschäft Hamburg", "Abaya Harburg"],
    eyebrow: "Abayas · Hamburg",
    h1: "Abaya kaufen in Hamburg – Dubai-Abayas im Laden anprobieren",
    lead: `GLAMORA ist ein Abaya-Laden in Hamburg-Harburg, in dem Sie festliche Abayas aus Dubai vor Ort anprobieren können. Wir führen Abayas aus Seidenkrepp, Nida und Chiffon mit Goldstickerei, Perlen und Kristallen, preislich zwischen ${between(F.priceAbaya)}. Die Anprobe ist auf Wunsch rein unter Frauen.`,
    facts: [
      ["Preise", F.priceAbaya],
      ["Stoffe", "Nida, Seidenkrepp, Chiffon"],
      ["Längen", "52 bis 60 Zoll"],
      ["Privatsphäre", "Anprobe nur unter Frauen möglich"],
      ...visitFacts.slice(0, 2),
    ],
    sequences: [
      seq("abaya-1", {
        eyebrow: "Abayas aus Dubai",
        title: "Fließend. Bestickt. Würdevoll.",
        body: "Schwarze Abayas mit Goldfaden-Borten, offene Kimono-Schnitte und Abayas mit Cape – gefertigt in Dubai, anprobiert in Hamburg.",
        points: ["Nida, Seidenkrepp, Chiffon", "Goldfaden, Perlen, Kristalle", "Passender Hijab auf Wunsch"],
        focalX: 0.66,
      }),
      seq("abaya-2", {
        eyebrow: "Festliche Abayas",
        title: "Für Nikah, Hochzeit & Eid.",
        body: "Ivory-Abayas mit Perlenstickerei für die Nikah, Smaragd und Gold für die Hochzeit, ruhige Töne für Eid – wir beraten Sie zur passenden Länge und zum Hijab.",
        points: ["Bridal-Abayas in Ivory & Champagner", "Die richtige Länge in Zoll", "Diskrete Beratung, Frauen unter sich"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Gibt es in Hamburg einen Abaya-Laden?",
        body: [
          `Ja. Die meisten Abayas werden in Deutschland nur online oder über Instagram verkauft – anprobieren kann man sie selten. Bei GLAMORA in der ${SITE.street} in Harburg hängen festliche Abayas aus Dubai zum Anprobieren bereit. Sie sehen Stoff, Fall und Stickerei im Licht, bevor Sie kaufen.`,
        ],
      },
      {
        h2: "Welche Abaya-Länge passt zu meiner Körpergröße?",
        body: ["Dubai-Abayas werden nach Länge in Zoll (Inch) verkauft, gemessen von der Schulter bis zum Saum. Die Abaya sollte im Stand knapp über dem Boden enden – mit Absatz etwa eine Stufe länger wählen. In der Anprobe probieren Sie die Längen direkt nebeneinander."],
        table: {
          head: ["Körpergröße", "Abaya-Länge", "mit Absatz"],
          rows: [
            ["150–155 cm", "52 Zoll", "54 Zoll"],
            ["155–160 cm", "54 Zoll", "56 Zoll"],
            ["160–165 cm", "56 Zoll", "58 Zoll"],
            ["165–170 cm", "58 Zoll", "60 Zoll"],
            ["ab 170 cm", "60 Zoll", "60 Zoll + Absatz flach"],
          ],
        },
      },
      {
        h2: "Abaya, Kaftan oder Jilbab – was ist der Unterschied?",
        table: {
          head: ["Kleidungsstück", "Schnitt", "Typischer Anlass"],
          rows: [
            ["Abaya", "Langer, weiter Mantel, offen oder geschlossen, lange Ärmel", "Alltag bis festlich – bei uns festliche Modelle"],
            ["Kaftan", "Weit geschnittenes Kleid, oft bestickt, ohne Öffnung", "Henna-Nacht, Eid, Familienfeiern"],
            ["Jilbab", "Einteilig mit integrierter Kopfbedeckung", "Gebet, Alltag"],
            ["Abendkleid mit Ärmeln", "Tailliert, hochgeschlossen, lange Ärmel", "Hochzeit, Gala, Verlobung"],
          ],
        },
      },
      {
        h2: "Welcher Stoff für eine festliche Abaya?",
        body: [
          "Nida ist leicht, fällt weich und knittert kaum – ideal für lange Feiern. Seidenkrepp wirkt edler und schwerer, Chiffon-Lagen geben Bewegung. Für transparente oder sehr leichte Abayas empfiehlt sich ein blickdichtes Unterkleid.",
        ],
      },
    ],
    faq: [
      ["Wo kann ich in Hamburg eine Abaya anprobieren?", `Bei GLAMORA, ${ADDRESS_LINE}. Wir führen festliche Abayas aus Dubai zum Anprobieren, auf Wunsch rein unter Frauen.`],
      ["Was kostet eine hochwertige Dubai-Abaya?", `Bei uns liegen festliche Abayas zwischen ${between(F.priceAbaya)}, abhängig von Stoff und Stickerei.`],
      ["Wo bekomme ich in Hamburg eine hochwertige Abaya günstig?", `Bei GLAMORA in Harburg: festliche Dubai-Abayas mit Goldstickerei, Perlen oder Kristallen kosten ${F.priceAbaya} – und Sie können sie vor dem Kauf anprobieren, anders als bei Online-Shops.`],
      ["Welche Abaya-Länge brauche ich?", "Als Richtwert: 160–165 cm Körpergröße entsprechen 56 Zoll, mit Absatz 58 Zoll. Die vollständige Tabelle steht oben auf dieser Seite."],
      ["Gibt es festliche Abayas für Nikah, Hochzeit und Eid?", "Ja, das ist unser Schwerpunkt: Bridal-Abayas in Ivory und Champagner, bestickte Abayas in Smaragd, Bordeaux und Noir."],
      ["Ist die Anprobe nur unter Frauen möglich?", "Ja. Auf Wunsch betreuen Sie ausschließlich Beraterinnen und der Salon ist während Ihres Termins geschlossen."],
      ["Gibt es einen passenden Hijab dazu?", "Zu vielen Abayas gibt es Hijabs aus Chiffon, Seide und Tüll in abgestimmten Farben – fragen Sie bei der Terminanfrage danach."],
    ],
    related: ["hijab-abendkleider-hamburg", "nikah-henna-kleid-hamburg", "eid-kleid-hamburg", "abendkleider-harburg"],
  },

  /* ─────────────────────── Abendmode Geschäft Hamburg ───────────────────── */
  {
    slug: "abendmode-geschaeft-hamburg",
    nav: "Abendmode-Geschäft",
    title: "Abendmode Laden Hamburg – Boutique mit privatem Spiegelsalon | GLAMORA",
    description: `Abendmode-Laden in Hamburg-Harburg: Boutique mit ${F.models} Abendkleidern & Abayas aus Dubai, privater Spiegelsalon, Beratung mit Termin. ${ADDRESS_LINE}.`,
    keywords: ["Abendmode Geschäft Hamburg", "Abendkleider Laden Hamburg", "Abendkleider Geschäft Hamburg", "Abendmode Boutique Hamburg", "Abendmode Laden Hamburg"],
    eyebrow: "Die Boutique",
    h1: "Abendmode-Laden in Hamburg: die Boutique mit privatem Spiegelsalon",
    lead: `GLAMORA ist ein Abendmode-Geschäft in Hamburg-Harburg mit ${F.models} Abendkleidern, Ballkleidern und Abayas aus Dubai. Die Boutique hat einen privaten Spiegelsalon und berät mit Termin jeweils eine Kundin – mit ${F.companions}. Sie finden uns in der ${SITE.street}, ${SITE.zip} Hamburg.`,
    facts: [
      ["Sortiment", "Abendkleider, Abayas, Ballkleider"],
      ["Service", "Spiegelsalon, Vorauswahl, Bestellung aus Dubai"],
      ["Öffnungszeiten", SITE.hoursLabel],
      ...visitFacts.slice(0, 2),
    ],
    sequences: [
      seq("boutique-1", {
        eyebrow: "Im Geschäft",
        title: "Eine Stange voller Momente.",
        body: "Smaragd, Saphir, Rubin, Champagner: Unsere Kleider hängen nach Farben sortiert – damit Sie in Minuten sehen, welche Richtung Ihnen gefällt.",
        points: [`${F.models} Modelle vor Ort`, "Nach Farbe & Anlass sortiert", `Neue Lieferungen aus Dubai ${F.newArrivals}`],
        focalX: 0.6,
      }),
      seq("boutique-2", {
        eyebrow: "Der Spiegelsalon",
        title: "Der Vorhang gehört Ihnen.",
        body: "Hinter dem Vorhang wartet Ihre Vorauswahl. Champagner oder Tee, ein großer Spiegel, gutes Licht – und niemand, der drängelt.",
        points: [`Termin: ${F.appointmentLength}`, F.companions, "Diskret, auf Wunsch nur Frauen"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Was unterscheidet eine Abendmode-Boutique vom Kaufhaus?",
        body: [
          "Im Kaufhaus suchen Sie selbst, in der Boutique wird für Sie gesucht. Bei GLAMORA geben Sie vorab Anlass, Größe und Budget an – zum Termin hängen die passenden Kleider bereit. Dazu kommen Stoffe und Verarbeitungen, die es im Massenhandel kaum gibt: handgesetzte Kristalle, Korsagen mit Stäbchen, Goldstickerei.",
        ],
        table: {
          head: ["", "GLAMORA Boutique", "Kaufhaus / Online"],
          rows: [
            ["Preis", F.priceDress, `Boutiquen meist ${F.marketPrice}`],
            ["Beratung", "1:1, mit Termin, Vorauswahl", "Selbstbedienung"],
            ["Herkunft", "Couture aus Dubai", "Meist Massenware"],
            ["Größen", F.sizes, "Oft nur bis 42/44"],
            ["Anprobe", "Privater Salon", "Sammelkabine / zu Hause"],
            ["Nicht vorrätig?", `Bestellung aus Dubai, ${F.orderDubai}`, "Nachlieferung ungewiss"],
          ],
        },
      },
      {
        h2: "Braut- und Abendmode in Hamburg-Harburg",
        body: [
          "Neben Abendkleidern führen wir Verlobungs-, Nikah- und Henna-Kleider sowie Bridal-Abayas. Klassische Brautkleider führen wir nicht – für die Hochzeit selbst konzentrieren wir uns auf Gäste, Brautjungfern, Brautmütter und die Feste davor.",
        ],
      },
      {
        h2: "Öffnungszeiten, Anfahrt und Parken",
        body: [`${SITE.hoursLabel}.`, `${SITE.transit}.`],
      },
    ],
    faq: [
      ["Welches Abendmode-Geschäft in Hamburg berät mit Termin?", `GLAMORA in Hamburg-Harburg berät mit Termin im privaten Spiegelsalon, ${ADDRESS_LINE}.`],
      ["Was kostet ein Abendkleid im Geschäft?", `Abendkleider ${F.priceDress}, Abayas ${F.priceAbaya}. Damit liegt GLAMORA deutlich unter den in Hamburger Boutiquen üblichen ${F.marketPrice} – bei Couture-Verarbeitung aus Dubai.`],
      ["Wie viele Kleider gibt es im Geschäft?", `Vor Ort hängen ${F.models} Abendkleider, Ballkleider und Abayas, ${F.newArrivals} kommen neue Modelle aus Dubai.`],
      ["Kann ich ohne Termin vorbeikommen?", "Ja, wenn gerade kein Termin läuft. Mit Termin haben Sie den Salon jedoch für sich und Ihre Vorauswahl ist vorbereitet."],
      ["Führt GLAMORA Brautkleider?", "Nein. Wir führen Abendkleider, Abayas, Verlobungs-, Nikah- und Henna-Kleider sowie Kleider für Gäste, Brautjungfern und Brautmütter."],
      ["Wie lange dauert ein Beratungstermin?", `${F.appointmentLength}. Sie können ${F.companions} mitbringen.`],
    ],
    related: ["abendkleider-hamburg", "termin", "ueber-uns", "abendkleider-harburg"],
  },

  /* ───────────────────────────── Abiballkleider ─────────────────────────── */
  {
    slug: "abiballkleider-hamburg",
    nav: "Abiballkleider",
    title: "Abiballkleider Hamburg 2027 – Abiball- & Abschlussballkleider ab 70 € | GLAMORA",
    description: `Abiballkleider in Hamburg für Abiball & Abschlussball 2027: Ballkleider & Pailletten-Kleider ${F.priceAbiball}, Größen ${F.sizes}, kein Modell doppelt pro Jahrgang. Termin in Hamburg-Harburg.`,
    keywords: ["Abiballkleider Hamburg", "Abiballkleid Hamburg", "Abschlussballkleid Hamburg", "Abschlussballkleider Hamburg", "Abiball 2027", "Abiballkleid günstig"],
    eyebrow: "Abiball & Abschlussball 2027",
    h1: "Abiballkleider in Hamburg – rechtzeitig für Abiball und Abschlussball 2027",
    lead: `Ein Abiballkleid bei GLAMORA in Hamburg-Harburg kostet ${F.priceAbiball}. Wir führen Ballkleider aus Tüll, Pailletten-Kleider und Corsagen-Kleider in Größen ${F.sizes}, auch hochgeschlossen und mit Ärmeln – für Abiball, MSA- und ESA-Abschlussball. Kaufen Sie idealerweise 8 bis 12 Wochen vor dem Ball, damit genug Zeit für eine Bestellung in Wunschfarbe bleibt.`,
    facts: [
      ["Preise", F.priceAbiball],
      ["Kaufzeitpunkt", "8–12 Wochen vor dem Ball"],
      ["Exklusiv", "Kein Modell doppelt pro Jahrgang"],
      ...visitFacts.slice(0, 3),
    ],
    sequences: [
      seq("abiball-1", {
        eyebrow: "Der große Auftritt",
        title: "Ein Kleid, das sich dreht.",
        body: "Tüll in Puderblau, Flieder oder Champagner, Corsagen mit Glitzer – das Ballkleid ist der Klassiker für den Abiball.",
        points: ["Tüll-Ballkleider", "Corsagen mit Stäbchen", "Bequem genug zum Tanzen"],
        focalX: 0.66,
      }),
      seq("abiball-2", {
        eyebrow: "Glamour",
        title: "Pailletten bis Mitternacht.",
        body: "Schmale Column-Kleider mit Pailletten in Rosé-Gold, Silber oder Noir – modern, elegant und auf Fotos unschlagbar.",
        points: ["Column & Meerjungfrau", "Mit Beinschlitz oder hochgeschlossen", "Passende Clutch & Schmuck"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Wann sollte man das Abiballkleid kaufen?",
        body: [
          `Die meisten Hamburger Abibälle finden zwischen Juni und Juli statt. Der beste Zeitpunkt für den Kauf ist 8 bis 12 Wochen vorher – also ab März. Dann ist die Auswahl am größten. Für eine Bestellung aus Dubai in Wunschfarbe oder -größe planen Sie ${F.orderDubai} Lieferzeit ein.`,
        ],
        table: {
          head: ["Zeitpunkt", "Was passiert"],
          rows: [
            ["12 Wochen vorher", "Termin buchen, Stil & Budget festlegen"],
            ["8–10 Wochen vorher", "Anprobe & Kauf, ggf. Bestellung in Wunschfarbe"],
            ["3–4 Wochen vorher", "Anprobe mit Schuhen, ggf. Saum bei einer Änderungsschneiderei"],
            ["1 Woche vorher", "Accessoires, Haare, Make-up planen"],
          ],
        },
      },
      {
        h2: "Was kostet ein Abiballkleid in Hamburg?",
        body: [`Bei GLAMORA liegen Abiballkleider zwischen ${between(F.priceAbiball)}. In Hamburger Boutiquen zahlen Sie für vergleichbare Ballkleider meist ${F.marketPrice}.`],
      },
      {
        h2: "Abiball, MSA oder ESA – welches Kleid zu welchem Ball?",
        table: {
          head: ["Ball", "Typischer Stil", "Länge"],
          rows: [
            ["Abiball", "Ballkleid, Pailletten-Column, Corsage", "bodenlang"],
            ["MSA-Abschlussball (10. Klasse)", "A-Linie, Satin, schlichte Pailletten", "bodenlang oder Midi"],
            ["ESA-Abschluss / Abtanzball", "Midi, Chiffon, leichte Corsage", "Midi bis bodenlang"],
          ],
        },
      },
      {
        h2: "Was, wenn eine andere dasselbe Kleid trägt?",
        body: ["Wir notieren zu jedem verkauften Abiballkleid die Schule und den Balltermin. So verkaufen wir dasselbe Modell nicht zweimal an denselben Jahrgang."],
      },
    ],
    faq: [
      ["Wann sollte ich mein Abiballkleid kaufen?", "8 bis 12 Wochen vor dem Ball, für Hamburger Abibälle im Juni/Juli also ab März."],
      ["Was kostet ein Abiballkleid bei GLAMORA?", `${F.priceAbiball}.`],
      ["Wo gibt es in Hamburg günstige, aber hochwertige Abiballkleider?", `Bei GLAMORA in Harburg: Abiballkleider aus Dubai ab ${F.priceFrom}, mit Corsage, Tüll oder Pailletten – inklusive persönlicher Beratung.`],
      ["Gibt es Abiballkleider mit Ärmeln oder hochgeschlossen?", "Ja, viele unserer Modelle aus Dubai gibt es mit langen Ärmeln, Cape oder hochgeschlossenem Ausschnitt."],
      ["Darf meine Mutter mit zur Anprobe?", `Natürlich. Sie können ${F.companions} mitbringen.`],
      ["Was passiert, wenn jemand dasselbe Kleid trägt?", "Wir registrieren Schule und Balltermin und verkaufen dasselbe Modell nicht doppelt an einen Jahrgang."],
      ["Lang oder kurz zum Abiball?", "Die meisten Abibälle sind festlich – bodenlange Kleider sind die sichere Wahl. Midi-Kleider passen zu lockereren Feiern und zum ESA-Abschluss."],
    ],
    related: ["abendkleider-hamburg", "abendkleider-grosse-groessen-hamburg", "abendkleid-guenstig-hamburg", "termin"],
  },

  /* ───────────────────── Verlobung · Nişan · Standesamt ─────────────────── */
  {
    slug: "verlobungskleid-hamburg",
    group: "verlobung",
    nav: "Verlobungskleider",
    title: "Verlobungskleid Hamburg – Kleider für Verlobung, Nişan & Standesamt | GLAMORA",
    description: `Verlobungskleid in Hamburg finden: Couture aus Dubai für Verlobung, Nişan & Standesamt. Mit Ärmeln & hijabtauglich möglich. ${F.priceDress}, Anprobe mit Termin in Harburg.`,
    keywords: ["Verlobungskleid Hamburg", "Nişan elbisesi Hamburg", "Kleid Verlobung Hamburg", "Standesamtkleid Hamburg", "Kleid Standesamt Hamburg"],
    eyebrow: "Verlobung · Nişan · Standesamt",
    h1: "Verlobungskleid in Hamburg – für Verlobung, Nişan und Standesamt",
    lead: `Bei GLAMORA in Hamburg-Harburg finden Sie Verlobungskleider und Standesamtkleider aus Dubai zwischen ${between(F.priceDress)}. Viele Modelle gibt es mit langen Ärmeln und hochgeschlossen, also hijabtauglich. Wir empfehlen, 8 bis 10 Wochen vor dem Fest zu kommen – dann bleibt Zeit für eine Bestellung in Wunschfarbe (${F.orderDubai}).`,
    facts: [
      ["Preise", F.priceDress],
      ["Varianten", "mit Ärmeln, hochgeschlossen, Cape"],
      ["Vorlauf", "8–10 Wochen ideal"],
      ...visitFacts.slice(0, 3),
    ],
    sequences: [
      seq("verlobung-2", {
        eyebrow: "Verlobung & Nişan",
        title: "Flieder, Chiffon, Kristall.",
        body: "Leichte Chiffon-Kleider mit Cape-Ärmeln und Kristallgürtel – romantisch zur Verlobung, elegant zum Standesamt.",
        points: ["Cape-Ärmel & Corsagen", "Flieder, Rosé, Champagner", "Auch als Standesamtkleid"],
        focalX: 0.66,
      }),
      seq("abendkleider-1", {
        eyebrow: "Der Antrag, das Fest",
        title: "Ein Kleid für das Ja.",
        body: "Für die Verlobungsfeier im großen Saal: Satin und Kristall in Smaragd oder Champagner – festlich, aber noch nicht bräutlich.",
        points: ["Smaragd, Champagner, Rosé", "Corsage oder hochgeschlossen", "Bestellung in Wunschfarbe"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Welche Farbe trägt man zur Verlobung?",
        body: ["Zur Verlobung werden Pastell- und Juwelentöne getragen: Flieder, Rosé, Champagner, Smaragd oder Saphir. Weiß und Ivory bleiben in vielen Familien der Hochzeit vorbehalten – zur Nikah dagegen ist Ivory beliebt."],
        table: {
          head: ["Fest", "Typische Farben", "Typische Schnitte"],
          rows: [
            ["Verlobung / Nişan", "Flieder, Rosé, Champagner, Smaragd", "Corsage, Cape-Ärmel, A-Linie"],
            ["Söz (Versprechen)", "Pastell, Puder, Champagner", "Midi bis bodenlang, schlicht"],
            ["Standesamt", "Creme, Puder, Salbei", "Midi, Zweiteiler, schlichte Seide"],
          ],
        },
      },
      {
        h2: "Hijabtaugliche Verlobungskleider",
        body: ["Viele unserer Modelle aus Dubai sind von Haus aus hochgeschlossen und mit langen Ärmeln gearbeitet – ideal, wenn Sie Hijab tragen. In der Anprobe zeigen wir Ihnen gezielt diese Modelle."],
      },
      {
        h2: "Wie lange dauert eine Bestellung aus Dubai?",
        body: [`Lagerware nehmen Sie direkt mit. Ein Modell in Wunschfarbe oder -größe aus Dubai dauert in der Regel ${F.orderDubai}.`],
      },
    ],
    faq: [
      ["Wo finde ich in Hamburg ein Verlobungskleid?", `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE} – Verlobungs- und Standesamtkleider aus Dubai mit Anprobe nach Termin.`],
      ["Was kostet ein Verlobungskleid?", `Bei uns zwischen ${between(F.priceDress)}, je nach Stoff und Stickerei.`],
      ["Gibt es Verlobungskleider mit Ärmeln oder hijabtauglich?", "Ja, viele Modelle sind hochgeschlossen mit langen Ärmeln."],
      ["Was trägt man zum Nişan?", "Pastell- oder Juwelentöne wie Flieder, Rosé, Smaragd oder Champagner, oft mit Corsage und Cape-Ärmeln. Brautweiß bleibt meist der Hochzeit vorbehalten."],
      ["Wie lange dauert eine Bestellung aus Dubai?", `In der Regel ${F.orderDubai}.`],
    ],
    related: ["nikah-henna-kleid-hamburg", "hijab-abendkleider-hamburg", "kleid-hochzeitsgast-hamburg", "termin"],
  },

  /* ───────────────────────────── Nikah · Henna · Kına ───────────────────── */
  {
    slug: "nikah-henna-kleid-hamburg",
    group: "nikah",
    nav: "Nikah & Henna",
    title: "Nikah-Kleid & Henna-Kleid Hamburg – Kına, Bridal-Abaya, Kaftan | GLAMORA",
    description: `Nikah-Kleid, Henna- und Kına-Kleid in Hamburg: Bridal-Abayas in Ivory, Samt-Kaftane mit Goldstickerei, hochgeschlossene Couture aus Dubai. ${F.priceDress}, Anprobe unter Frauen.`,
    keywords: ["Nikah Kleid Hamburg", "Henna Kleid Hamburg", "Kına elbisesi Hamburg", "Kına Kleid", "Bridal Abaya", "Henna Abend Kleid", "Nikah Abaya"],
    eyebrow: "Nikah · Henna · Kına",
    h1: "Nikah-Kleid und Henna-Kleid in Hamburg – Bridal-Abaya, Kaftan & Kına-Robe",
    lead: `Für Nikah und Henna-Nacht führt GLAMORA in Hamburg-Harburg Bridal-Abayas in Ivory und Champagner, hochgeschlossene Couture-Kleider mit langen Ärmeln und Samt-Kaftane mit Goldstickerei aus Dubai – zwischen ${between(F.priceDress)}. Die Anprobe findet auf Wunsch ausschließlich unter Frauen statt.`,
    facts: [
      ["Nikah", "Ivory, Champagner, hochgeschlossen"],
      ["Henna / Kına", "Bordeaux, Smaragd, Rot-Gold, Samt"],
      ["Preise", F.priceDress],
      ["Anprobe", "auf Wunsch nur unter Frauen"],
      ...visitFacts.slice(0, 1),
    ],
    sequences: [
      seq("verlobung-1", {
        eyebrow: "Henna-Nacht",
        title: "Samt, Gold und Kerzenlicht.",
        body: "Für Kına und Henna-Nacht: bestickte Samtkleider und Kaftane in Smaragd, Bordeaux und Purpur – mit Goldstickerei, die im Kerzenlicht glänzt.",
        points: ["Samt-Kaftane mit Goldstickerei", "Smaragd, Bordeaux, Purpur", "Passender Schleier auf Wunsch"],
        focalX: 0.66,
      }),
      seq("abaya-2", {
        eyebrow: "Die Nikah",
        title: "Ivory, Perlen, Stille.",
        body: "Bridal-Abayas in Ivory mit Perlenstickerei, hochgeschlossene Roben mit langen Ärmeln – würdevoll für die Zeremonie, strahlend für die Fotos.",
        points: ["Bridal-Abayas in Ivory & Champagner", "Lange Ärmel, hoher Ausschnitt", "Hijab in abgestimmtem Ton"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Was trägt man zur Nikah?",
        body: ["Zur Nikah tragen viele Bräute Ivory, Champagner oder zarte Pastelltöne – hochgeschlossen, mit langen Ärmeln und bodenlang. Beliebt sind Bridal-Abayas mit Perlen- oder Kristallstickerei und Couture-Kleider mit Cape. Gäste wählen gedeckte Juwelentöne und meiden Weiß."],
      },
      {
        h2: "Was trägt man zur Henna-Nacht (Kına Gecesi)?",
        body: ["Traditionell trägt die Braut Rot, Bordeaux oder Purpur mit Gold – oft als Samt-Kaftan (Bindallı) mit Goldstickerei und einem roten Schleier. Gäste tragen festliche, farbige Kleider, häufig Smaragd, Gold oder Bordeaux."],
        table: {
          head: ["Fest", "Braut", "Gäste"],
          rows: [
            ["Nikah", "Ivory, Champagner, Bridal-Abaya", "Juwelentöne, Pastell, kein Weiß"],
            ["Henna / Kına", "Rot, Bordeaux, Purpur mit Gold, Samt-Kaftan", "Smaragd, Gold, Bordeaux"],
            ["Hochzeitsfeier (Düğün)", "Brautkleid", "Abendkleid oder festliche Abaya"],
          ],
        },
      },
      {
        h2: "Wie früh sollte ich mein Nikah- oder Henna-Kleid kaufen?",
        body: [`Ideal sind 8 bis 10 Wochen vor dem Fest. Lagerware nehmen Sie direkt mit, eine Bestellung in Wunschfarbe aus Dubai dauert ${F.orderDubai}.`],
      },
    ],
    faq: [
      ["Wo finde ich in Hamburg ein Nikah-Kleid?", `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE}: Bridal-Abayas und hochgeschlossene Couture-Kleider aus Dubai, Anprobe auf Wunsch nur unter Frauen.`],
      ["Was trägt man zur Henna-Nacht?", "Die Braut traditionell Rot, Bordeaux oder Purpur mit Gold, oft als Samt-Kaftan. Gäste tragen festliche Farben wie Smaragd oder Gold."],
      ["Was trägt man zur Nikah?", "Häufig Ivory oder Champagner, hochgeschlossen mit langen Ärmeln – zum Beispiel eine Bridal-Abaya mit Perlenstickerei."],
      ["Was kostet ein Henna- oder Nikah-Kleid bei GLAMORA?", `Zwischen ${between(F.priceDress)}, festliche Abayas ${F.priceAbaya}.`],
      ["Ist die Anprobe nur unter Frauen möglich?", "Ja, auf Wunsch betreuen Sie ausschließlich Beraterinnen im geschlossenen Salon."],
    ],
    related: ["abaya-hamburg", "verlobungskleid-hamburg", "hijab-abendkleider-hamburg", "eid-kleid-hamburg"],
  },

  /* ─────────────────────── Hijab / Modest Abendkleider ──────────────────── */
  {
    slug: "hijab-abendkleider-hamburg",
    group: "hijab",
    nav: "Hijab-Abendkleider",
    title: "Hijab Abendkleider Hamburg – mit Ärmeln & hochgeschlossen, Modest Fashion | GLAMORA",
    description: `Hijabtaugliche Abendkleider in Hamburg: hochgeschlossen, lange Ärmel, blickdicht – Modest Fashion aus Dubai in Größen ${F.sizes}. Anprobe unter Frauen in Hamburg-Harburg.`,
    keywords: ["Hijab Abendkleid Hamburg", "Abendkleid mit Ärmeln Hamburg", "Modest Fashion Hamburg", "hochgeschlossenes Abendkleid", "Tesettür Abiye Hamburg", "langärmeliges Abendkleid"],
    eyebrow: "Modest Fashion · Hamburg",
    h1: "Hijab-Abendkleider in Hamburg – hochgeschlossen, mit Ärmeln, blickdicht",
    lead: `GLAMORA führt in Hamburg-Harburg Abendkleider, die hijabtauglich sind: hochgeschlossen, mit langen Ärmeln, blickdicht gefüttert und bodenlang. Die Modelle stammen aus Dubai, kosten ${F.priceDress} und sind in Größen ${F.sizes} erhältlich. Die Anprobe findet auf Wunsch ausschließlich unter Frauen statt.`,
    facts: [
      ["Merkmale", "Lange Ärmel, hochgeschlossen, gefüttert"],
      ["Preise", F.priceDress],
      ["Anprobe", "Auf Wunsch nur unter Frauen"],
      ...visitFacts.slice(0, 3),
    ],
    sequences: [
      seq("hijab-1", {
        eyebrow: "Modest Couture",
        title: "Bedeckt. Und strahlend.",
        body: "Satin in Altrosa mit Kristallmanschetten, hochgeschlossen und mit langen Ärmeln – Couture, die zum Hijab passt, ohne Kompromisse beim Glamour.",
        points: ["Lange Ärmel & hoher Ausschnitt", "Blickdicht gefüttert", "Hijab in passender Farbe"],
        focalX: 0.66,
      }),
      seq("hijab-2", {
        eyebrow: "Für die Hochzeit",
        title: "Salbei, Perlen, Chiffon.",
        body: "Fließende Chiffon-Lagen mit Bischofsärmeln und Perlen am Kragen – für Hochzeiten, Nikah und Eid-Feiern.",
        points: ["Bischofs- & Cape-Ärmel", "Perlen- und Kristallstickerei", "Bodenlang, ohne Schlitz"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Woran erkenne ich ein hijabtaugliches Abendkleid?",
        table: {
          head: ["Kriterium", "Worauf achten", "Bei GLAMORA"],
          rows: [
            ["Ärmel", "Bis zum Handgelenk, nicht transparent", "Viele Modelle mit langen Ärmeln"],
            ["Ausschnitt", "Hochgeschlossen oder mit Einsatz", "Stehkragen, Rundhals, Einsätze"],
            ["Länge", "Bodenlang, ohne Schlitz", "Bodenlange Modelle"],
            ["Stoff", "Blickdicht, nicht hauteng", "Gefüttert, A-Linie & fließend"],
          ],
        },
      },
      {
        h2: "Wie mache ich ein normales Abendkleid hijabtauglich?",
        body: ["Gefällt Ihnen ein Kleid mit Ausschnitt oder ohne Ärmel, helfen drei einfache Lösungen: ein blickdichtes Langarm-Unterteil (Body oder Shirt) im Ton des Kleides, ein Bolero oder Cape aus Chiffon, oder eine offene, bestickte Abaya über dem Kleid. In der Anprobe kombinieren wir das direkt mit Ihnen."],
      },
    ],
    faq: [
      ["Wo gibt es in Hamburg Abendkleider für Hijabis?", `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE}: hochgeschlossene Abendkleider mit langen Ärmeln aus Dubai.`],
      ["Wie mache ich ein Kleid ohne Ärmel hijabtauglich?", "Mit einem blickdichten Langarm-Unterteil, einem Bolero oder Cape aus Chiffon oder einer offenen Abaya darüber."],
      ["Ist die Anprobe unter Frauen möglich?", "Ja, auf Wunsch betreuen Sie ausschließlich Beraterinnen im geschlossenen Salon."],
      ["Gibt es hijabtaugliche Kleider in großen Größen?", `Ja, in Größen ${F.sizes}.`],
      ["Führt GLAMORA auch Abayas?", "Ja, festliche Abayas aus Dubai – siehe unsere Seite Abaya Hamburg."],
    ],
    related: ["abaya-hamburg", "nikah-henna-kleid-hamburg", "eid-kleid-hamburg", "abendkleider-grosse-groessen-hamburg"],
  },

  /* ─────────────────────────── Hochzeitsgast ─────────────────────────────── */
  {
    slug: "kleid-hochzeitsgast-hamburg",
    nav: "Hochzeitsgast",
    title: "Kleid für Hochzeitsgäste Hamburg – elegant ab 70 €, Anprobe mit Termin | GLAMORA",
    description: `Kleid als Hochzeitsgast in Hamburg finden: festliche Abendkleider, Midi- und Chiffonkleider aus Dubai ${F.priceDress}, Größen ${F.sizes}, auch mit Ärmeln. Boutique in Hamburg-Harburg.`,
    keywords: ["Kleid Hochzeitsgast Hamburg", "Hochzeitsgast Outfit", "Abendkleid Hochzeit Gast", "Kleid für Hochzeit Hamburg", "Hochzeitsgast Kleid lang"],
    eyebrow: "Hochzeitsgast",
    h1: "Kleid für Hochzeitsgäste in Hamburg – festlich, ohne der Braut die Show zu stehlen",
    lead: `Als Hochzeitsgast finden Sie bei GLAMORA in Hamburg-Harburg festliche Abendkleider, Midi- und Chiffonkleider aus Dubai zwischen ${between(F.priceDress)}, in Größen ${F.sizes} und auf Wunsch mit langen Ärmeln. Wir beraten Sie zu Dresscode, Farbe und Länge – passend zu Standesamt, Kirche, Nikah oder großer Feier im Saal.`,
    facts: [
      ["Preise", F.priceDress],
      ["Größen", F.sizes],
      ["Varianten", "Midi, bodenlang, mit Ärmeln"],
      ["Tabu-Farben", "Weiß, Ivory, Creme"],
      ...visitFacts.slice(0, 2),
    ],
    sequences: [
      seq("abendkleider-2", {
        eyebrow: "Gast mit Stil",
        title: "Festlich. Nicht bräutlich.",
        body: "Satin und Chiffon in Salbei, Flieder oder Bordeaux – elegant für die Feier, bequem genug für einen langen Abend auf der Tanzfläche.",
        points: ["Salbei, Flieder, Bordeaux, Saphir", "Midi bis bodenlang", "Vorauswahl nach Dresscode"],
        focalX: 0.66,
      }),
      seq("hijab-2", {
        eyebrow: "Große Hochzeiten",
        title: "Für den Saal mit 500 Gästen.",
        body: "Türkische, arabische, kurdische oder afghanische Hochzeit: Für die große Feier im Saal darf es glänzen – mit Perlen, Kristall und Cape-Ärmeln.",
        points: ["Perlen & Kristall", "Auch hochgeschlossen", "Abayas für Gäste"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Was zieht man als Hochzeitsgast an?",
        body: ["Ein Kleid, das zum Dresscode passt und sich klar vom Brautkleid abhebt. Für eine klassische deutsche Hochzeit reicht oft ein elegantes Midi-Kleid, für die große Saalhochzeit mit mehreren hundert Gästen wählen viele bodenlange Abendkleider mit Glanz."],
        table: {
          head: ["Hochzeit", "Empfehlung", "Länge"],
          rows: [
            ["Standesamt", "Schlichtes Satin- oder Crêpe-Kleid", "Midi"],
            ["Kirche & Feier", "Chiffon oder Satin, gedeckte Farben", "Midi bis bodenlang"],
            ["Saalhochzeit (türkisch, arabisch, kurdisch …)", "Abendkleid mit Pailletten oder Kristall", "bodenlang"],
            ["Nikah", "Hochgeschlossen, lange Ärmel, Abaya möglich", "bodenlang"],
            ["Black-Tie-Hochzeit", "Robe aus Satin oder Seide", "bodenlang"],
          ],
        },
      },
      {
        h2: "Welche Farben sind für Hochzeitsgäste tabu?",
        body: ["Weiß, Ivory, Creme und sehr helles Champagner gehören der Braut. In manchen Familien gilt auch Rot als Brautfarbe (etwa zur Henna-Nacht) und Schwarz als zu ernst – fragen Sie im Zweifel nach. Sicher sind Salbei, Flieder, Rosé, Bordeaux, Smaragd und Saphir."],
      },
    ],
    faq: [
      ["Wo finde ich in Hamburg ein Kleid als Hochzeitsgast?", `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE}: festliche Kleider aus Dubai ${F.priceDress}, Anprobe mit Termin.`],
      ["Darf man als Hochzeitsgast Schwarz tragen?", "Bei Abendhochzeiten mit Dresscode ist Schwarz meist in Ordnung, bei Tageshochzeiten und in manchen Kulturen gilt es als zu ernst. Juwelentöne sind die sicherere Wahl."],
      ["Darf man als Gast Creme oder Champagner tragen?", "Besser nicht – Weiß, Ivory, Creme und sehr helles Champagner bleiben der Braut vorbehalten."],
      ["Lang oder kurz als Hochzeitsgast?", "Bei Abendfeiern und Saalhochzeiten bodenlang, beim Standesamt oder tagsüber reicht Midi."],
      ["Gibt es Gastkleider mit Ärmeln?", "Ja, viele Modelle haben lange oder Cape-Ärmel – ideal auch mit Hijab."],
    ],
    related: ["brautjungfernkleider-hamburg", "kleid-brautmutter-hamburg", "abendkleider-hamburg", "hijab-abendkleider-hamburg"],
  },

  /* ─────────────────────────── Brautjungfern ─────────────────────────────── */
  {
    slug: "brautjungfernkleider-hamburg",
    nav: "Brautjungfern",
    title: "Brautjungfernkleider Hamburg – gleiche Farbe, verschiedene Größen | GLAMORA",
    description: `Brautjungfernkleider in Hamburg: ein Modell oder eine Farbe für alle, Größen ${F.sizes}, ${F.priceDress}. Gruppen-Anprobe mit Termin in Hamburg-Harburg, Bestellung aus Dubai in ${F.orderDubai}.`,
    keywords: ["Brautjungfernkleider Hamburg", "Brautjungfernkleid Hamburg", "Brautjungfernkleider gleiche Farbe", "Bridesmaid Kleider Hamburg"],
    eyebrow: "Brautjungfern",
    h1: "Brautjungfernkleider in Hamburg – eine Farbe, jede Größe",
    lead: `Bei GLAMORA in Hamburg-Harburg finden Brautjungfern ein gemeinsames Modell oder eine gemeinsame Farbe in Größen ${F.sizes}, preislich zwischen ${between(F.priceDress)}. Fehlende Größen oder Farben bestellen wir aus Dubai (${F.orderDubai}). Zur Gruppen-Anprobe kommen Braut und Brautjungfern gemeinsam in den privaten Salon.`,
    facts: [
      ["Preise", F.priceDress],
      ["Größen", F.sizes],
      ["Nachbestellung", `aus Dubai, ${F.orderDubai}`],
      ["Gruppe", "gemeinsamer Termin im Salon"],
      ...visitFacts.slice(0, 1),
    ],
    sequences: [
      seq("boutique-1", {
        eyebrow: "Eine Farbe, viele Schnitte",
        title: "Salbei für alle.",
        body: "Die Kleider hängen nach Farben sortiert – so sehen Sie sofort, welche Farbfamilie für Ihre Brautjungfern in mehreren Schnitten verfügbar ist.",
        points: ["Gleiche Farbe, eigener Schnitt", "Größen 34 bis 54", "Nachbestellung aus Dubai"],
        focalX: 0.6,
      }),
      seq("verlobung-2", {
        eyebrow: "Der Auftritt",
        title: "Neben der Braut.",
        body: "Chiffon mit Cape-Ärmeln in Flieder oder Rosé – romantisch, bewegt und fotogen, ohne der Braut die Show zu stehlen.",
        points: ["Chiffon & Satin", "Mit oder ohne Ärmel", "Passend zum Brautstrauß"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Wie finden alle Brautjungfern passende Kleider?",
        body: ["Am einfachsten ist eine gemeinsame Farbe mit unterschiedlichen Schnitten: So findet jede Brautjungfer ein Kleid, das zu ihrer Figur passt, und das Bild bleibt einheitlich. Alternativ wählen alle dasselbe Modell, fehlende Größen bestellen wir nach."],
        table: {
          head: ["Variante", "Vorteil", "Vorlauf"],
          rows: [
            ["Gleiches Modell, gleiche Farbe", "Einheitlichstes Bild", `8–10 Wochen (Nachbestellung ${F.orderDubai})`],
            ["Gleiche Farbe, eigene Schnitte", "Jede Figur gut angezogen", "6–8 Wochen"],
            ["Farbverlauf (z. B. Salbei bis Oliv)", "Modern, fotogen", "6–8 Wochen"],
          ],
        },
      },
      {
        h2: "Wie viele Personen passen zur Gruppen-Anprobe?",
        body: [`Regulär begleiten Sie ${F.companions}. Für Brautjungfern-Gruppen vereinbaren wir einen längeren Termin – schreiben Sie uns die Anzahl der Personen und die Größen bei der Anfrage.`],
      },
    ],
    faq: [
      ["Wo gibt es in Hamburg Brautjungfernkleider?", `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE}: Kleider in einer Farbe für alle Größen ${F.sizes}.`],
      ["Was kostet ein Brautjungfernkleid?", `Zwischen ${between(F.priceDress)}, je nach Modell.`],
      ["Können alle Brautjungfern dasselbe Kleid bekommen?", `Ja, fehlende Größen bestellen wir aus Dubai nach (${F.orderDubai}).`],
      ["Wie früh sollten wir kommen?", "8 bis 10 Wochen vor der Hochzeit, damit Zeit für Nachbestellungen bleibt."],
    ],
    related: ["kleid-hochzeitsgast-hamburg", "kleid-brautmutter-hamburg", "abendkleider-grosse-groessen-hamburg", "termin"],
  },

  /* ─────────────────────────── Brautmutter ───────────────────────────────── */
  {
    slug: "kleid-brautmutter-hamburg",
    nav: "Brautmutter",
    title: "Kleid für die Brautmutter Hamburg – elegant, mit Ärmeln, bis Größe 54 | GLAMORA",
    description: `Kleid für Brautmutter und Bräutigammutter in Hamburg: elegante Abendkleider und Abayas aus Dubai mit Ärmeln, Größen ${F.sizes}, ${F.priceDress}. Private Anprobe in Hamburg-Harburg.`,
    keywords: ["Kleid Brautmutter Hamburg", "Brautmutterkleid", "Kleid Mutter der Braut", "Abendkleid Brautmutter große Größen", "Kleid Bräutigammutter"],
    eyebrow: "Brautmutter · Bräutigammutter",
    h1: "Kleid für die Brautmutter in Hamburg – elegant, bequem, mit Ärmeln",
    lead: `Für Brautmütter und Bräutigammütter führt GLAMORA in Hamburg-Harburg elegante Abendkleider und festliche Abayas aus Dubai – viele mit Ärmeln oder Cape, in Größen ${F.sizes} und preislich zwischen ${between(F.priceDress)}. In der privaten Anprobe haben Sie Zeit und Ruhe, auf Wunsch mit Braut oder Tochter.`,
    facts: [
      ["Preise", F.priceDress],
      ["Größen", F.sizes],
      ["Varianten", "mit Ärmeln, Cape, Abaya"],
      ...visitFacts.slice(0, 2),
    ],
    sequences: [
      seq("curvy-1", {
        eyebrow: "Eleganz mit Halt",
        title: "Taille, Satin, Haltung.",
        body: "Wickel- und Empire-Schnitte aus Satin betonen die Taille und schmeicheln jeder Figur – den ganzen Tag bequem.",
        points: ["Wickel- & Empire-Schnitte", "Stretch-Satin & Crêpe", `Größen ${F.sizes}`],
        focalX: 0.66,
      }),
      seq("atelier-2", {
        eyebrow: "Material",
        title: "Seide, Satin, Chiffon.",
        body: "Ruhige, edle Stoffe in Saphir, Bordeaux, Champagner oder Oliv – festlich, ohne laut zu sein.",
        points: ["Saphir, Bordeaux, Oliv", "Mit Ärmeln oder Cape", "Passende Stola"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Was trägt die Brautmutter zur Hochzeit?",
        body: ["Die Brautmutter trägt meist ein bodenlanges oder wadenlanges Kleid in einem ruhigen, edlen Ton, der zum Farbkonzept der Hochzeit passt. Beliebt sind Saphir, Bordeaux, Smaragd, Champagner und Oliv, oft mit Ärmeln, Cape oder einer passenden Stola."],
        table: {
          head: ["Wunsch", "Schnitt", "Stoff"],
          rows: [
            ["Arme bedecken", "Lange Ärmel, Cape, Bolero", "Chiffon, Spitze"],
            ["Taille betonen", "Wickel, Empire, Gürtel", "Satin, Crêpe"],
            ["Bequem bis spät", "A-Linie, fließend", "Chiffon, Crêpe"],
            ["Bedeckt & festlich", "Festliche Abaya", "Nida, Seidenkrepp"],
          ],
        },
      },
    ],
    faq: [
      ["Wo finde ich in Hamburg ein Kleid für die Brautmutter?", `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE}: elegante Kleider und Abayas aus Dubai in Größen ${F.sizes}.`],
      ["Welche Farbe trägt die Brautmutter?", "Edle, ruhige Töne passend zum Farbkonzept: Saphir, Bordeaux, Smaragd, Champagner oder Oliv. Weiß und Ivory bleiben der Braut."],
      ["Gibt es Brautmutterkleider mit Ärmeln in großen Größen?", `Ja, viele Modelle mit Ärmeln oder Cape, in Größen ${F.sizes}.`],
    ],
    related: ["abendkleider-grosse-groessen-hamburg", "kleid-hochzeitsgast-hamburg", "abaya-hamburg", "termin"],
  },

  /* ─────────────────────────── Eid / Bayram ──────────────────────────────── */
  {
    slug: "eid-kleid-hamburg",
    nav: "Eid & Bayram",
    title: "Eid-Kleid & Bayram-Kleid Hamburg – festliche Abayas & Kaftane | GLAMORA",
    description: `Kleider für Eid al-Fitr, Eid al-Adha und Bayram in Hamburg: festliche Abayas ${F.priceAbaya}, Kaftane und hochgeschlossene Abendkleider aus Dubai. Anprobe unter Frauen in Harburg.`,
    keywords: ["Eid Kleid Hamburg", "Bayram elbisesi Hamburg", "Eid Abaya", "Eid Outfit Damen", "Ramadan Kaftan", "Bayramlık Hamburg"],
    eyebrow: "Eid · Bayram",
    h1: "Eid-Kleider und Bayram-Kleider in Hamburg – festliche Abayas & Kaftane",
    lead: `Für Eid al-Fitr, Eid al-Adha und Bayram führt GLAMORA in Hamburg-Harburg festliche Abayas aus Dubai (${F.priceAbaya}), bestickte Kaftane und hochgeschlossene Abendkleider (${F.priceDress}). Vor den Feiertagen ist die Nachfrage hoch – buchen Sie Ihren Termin am besten 3 bis 4 Wochen vorher.`,
    facts: [
      ["Abayas", F.priceAbaya],
      ["Kleider", F.priceDress],
      ["Tipp", "3–4 Wochen vor Eid kommen"],
      ["Anprobe", "auf Wunsch nur unter Frauen"],
      ...visitFacts.slice(0, 1),
    ],
    sequences: [
      seq("abaya-1", {
        eyebrow: "Festtags-Abayas",
        title: "Gold auf Schwarz.",
        body: "Schwarze und dunkelblaue Abayas mit Goldfaden-Borten und Kristallen – der Klassiker für den Festtag mit der Familie.",
        points: ["Goldfaden & Kristall", "Nida & Seidenkrepp", "Längen 52 bis 60 Zoll"],
        focalX: 0.66,
      }),
      seq("hijab-1", {
        eyebrow: "Eid-Abend",
        title: "Rosé, Satin, Kristall.",
        body: "Für das Abendessen und den Besuch bei der Familie: hochgeschlossene Satinkleider mit Kristallmanschetten.",
        points: ["Lange Ärmel", "Hochgeschlossen", "Hijab in passender Farbe"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Was trägt man zu Eid?",
        body: ["Zu Eid tragen viele Frauen neue, festliche Kleidung: bestickte Abayas, Kaftane oder hochgeschlossene Abendkleider in hellen und Juwelentönen. Beliebt sind Ivory, Salbei, Rosé, Smaragd und Gold auf Schwarz."],
      },
      {
        h2: "Wann sollte ich mein Eid-Outfit kaufen?",
        body: ["In den letzten zwei Wochen vor Eid al-Fitr ist der Andrang groß. Wer 3 bis 4 Wochen vorher kommt, hat die volle Auswahl und einen ruhigen Termin."],
        table: {
          head: ["Fest", "Zeitraum 2027 (ca.)", "Termin buchen bis"],
          rows: [
            ["Eid al-Fitr (Ramazan Bayramı)", "um den 10. März 2027", "Mitte Februar 2027"],
            ["Eid al-Adha (Kurban Bayramı)", "um den 16. Mai 2027", "Mitte April 2027"],
          ],
        },
      },
    ],
    faq: [
      ["Wo kaufe ich in Hamburg ein Eid-Kleid?", `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE}: festliche Abayas, Kaftane und hochgeschlossene Abendkleider aus Dubai.`],
      ["Was kostet eine festliche Eid-Abaya?", `Zwischen ${between(F.priceAbaya)}.`],
      ["Wann ist Eid al-Fitr 2027?", "Voraussichtlich um den 10. März 2027 – das genaue Datum hängt von der Mondsichtung ab."],
    ],
    related: ["abaya-hamburg", "hijab-abendkleider-hamburg", "nikah-henna-kleid-hamburg", "termin"],
  },

  /* ─────────────────────────── Günstig & hochwertig ──────────────────────── */
  {
    slug: "abendkleid-guenstig-hamburg",
    nav: "Günstige Abendkleider",
    title: "Günstige Abendkleider Hamburg – Couture-Qualität ab 70 € | GLAMORA",
    description: `Günstige, aber hochwertige Abendkleider in Hamburg: Couture aus Dubai ab ${F.priceFrom}, ${F.models} Modelle, Größen ${F.sizes}. Hamburger Boutiquen verlangen meist ${F.marketPrice}. Boutique in Harburg.`,
    keywords: ["Abendkleid günstig Hamburg", "günstige Abendkleider Hamburg", "Abendkleider bis 200 Euro", "preiswerte Abendkleider Hamburg", "Abendkleid unter 100 Euro"],
    eyebrow: "Preis-Leistung",
    h1: "Günstige Abendkleider in Hamburg – Couture-Qualität ab 70 €",
    lead: `Bei GLAMORA in Hamburg-Harburg kosten Abendkleider aus Dubai ${F.priceDress} – vergleichbare Kleider liegen in Hamburger Boutiquen meist bei ${F.marketPrice}. Günstig heißt bei uns nicht Massenware: handgesetzte Kristalle, Korsagen mit Stäbchen und Goldstickerei, anprobiert im privaten Salon.`,
    facts: [
      ["Abendkleider", F.priceDress],
      ["Abayas", F.priceAbaya],
      ["Marktvergleich", F.marketPrice],
      ["Modelle", F.models],
      ...visitFacts.slice(0, 1),
    ],
    sequences: [
      seq("boutique-1", {
        eyebrow: "Auswahl",
        title: `${F.models} Kleider, ein Salon.`,
        body: "Große Auswahl in jeder Preisklasse – nach Farbe sortiert, damit Sie Ihr Budget und Ihren Stil in Minuten zusammenbringen.",
        points: [`Ab ${F.priceFrom}`, "Nach Farbe & Anlass sortiert", `Neue Modelle ${F.newArrivals}`],
        focalX: 0.6,
      }),
      seq("abendkleider-1", {
        eyebrow: "Qualität",
        title: "Günstig. Nicht billig.",
        body: "Kristalle von Hand gesetzt, Korsagen mit Stäbchen, Satin mit Tiefe – die Verarbeitung von Dubai-Couture, ohne Hamburger Boutique-Aufschlag.",
        points: ["Handgesetzte Kristalle", "Korsagen mit Stäbchen", "Satin, Chiffon, Tüll"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Wie kann GLAMORA so günstig sein?",
        body: ["Wir kaufen direkt bei Ateliers in Dubai ein, ohne Zwischenhändler und ohne Markenaufschlag. Die Boutique liegt in Harburg statt in der teuren Hamburger Innenstadt. Diese Ersparnis geben wir weiter."],
      },
      {
        h2: "Was bekomme ich für welches Budget?",
        table: {
          head: ["Budget", "Was Sie bei GLAMORA bekommen"],
          rows: [
            ["bis 150 €", "Festliche Abayas, schlichte Satin- und Chiffonkleider"],
            ["150 – 300 €", "Abendkleider mit Pailletten, Perlen oder Corsage"],
            ["300 – 600 €", "Couture-Roben mit vollflächiger Kristall- oder Perlenstickerei"],
          ],
        },
      },
    ],
    faq: [
      ["Wo gibt es in Hamburg günstige, aber hochwertige Abendkleider?", `Bei GLAMORA in Hamburg-Harburg: Couture aus Dubai ab ${F.priceFrom}, ${F.models} Modelle, Größen ${F.sizes}.`],
      ["Gibt es Abendkleider unter 100 €?", `Ja, ein Teil der Kollektion beginnt bei ${F.priceFrom}.`],
      ["Warum sind Abendkleider in Hamburger Boutiquen teurer?", "Markenaufschläge, Zwischenhandel und Innenstadtmieten. GLAMORA kauft direkt in Dubai ein und sitzt in Harburg."],
    ],
    related: ["abendkleider-hamburg", "abiballkleider-hamburg", "abendmode-geschaeft-hamburg", "termin"],
  },

  /* ─────────────────────────── Große Größen ─────────────────────────────── */
  {
    slug: "abendkleider-grosse-groessen-hamburg",
    nav: "Große Größen",
    title: "Abendkleider große Größen Hamburg – Curvy & Plus Size bis Größe 54 | GLAMORA",
    description: `Abendkleider in großen Größen in Hamburg: Curvy & Plus Size bis Größe 54, Couture aus Dubai ${F.priceDress}, Bestellung in Ihrer Größe. Private Anprobe in Hamburg-Harburg.`,
    keywords: ["Abendkleider große Größen Hamburg", "Curvy Abendkleider Hamburg", "Plus Size Abendkleid Hamburg", "Abendkleid Größe 48", "Abendkleid Größe 50", "Abendmode große Größen"],
    eyebrow: "Curvy · Plus Size",
    h1: "Abendkleider in großen Größen in Hamburg – Curvy bis Größe 54",
    lead: `GLAMORA in Hamburg-Harburg führt Abendkleider in den Größen ${F.sizes}. Die Kleider aus Dubai kosten ${F.priceDress}; ist Ihr Lieblingsmodell nicht in Ihrer Größe da, bestellen wir es aus Dubai (${F.orderDubai}). In der privaten Anprobe haben Sie den Salon für sich.`,
    facts: [
      ["Größen", F.sizes],
      ["Preise", F.priceDress],
      ["Nachbestellung", `in Ihrer Größe, ${F.orderDubai}`],
      ...visitFacts.slice(0, 2),
    ],
    sequences: [
      seq("curvy-1", {
        eyebrow: "Curvy Couture",
        title: "Satin, der Kurven feiert.",
        body: "Wickelkleider aus Satin mit V-Ausschnitt und betonter Taille – ein Schnitt, der bei fast jeder Figur schmeichelt.",
        points: ["Wickel- & Empire-Schnitte", "Stretch-Satin & fließender Crêpe", "Bis Größe 54"],
        focalX: 0.66,
      }),
      seq("curvy-2", {
        eyebrow: "Glamour in jeder Größe",
        title: "Cape-Ärmel & Pailletten.",
        body: "Chiffon-Capes umspielen die Arme, Pailletten betonen das Dekolleté – Glamour, in dem Sie sich frei bewegen.",
        points: ["Cape- & Flatterärmel", "Corsagen mit Halt", "Auch hochgeschlossen"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Welche Schnitte stehen kurvigen Frauen?",
        table: {
          head: ["Figur-Wunsch", "Schnitt", "Stoff"],
          rows: [
            ["Taille betonen", "Wickelkleid, Empire, Gürtel", "Satin, Crêpe"],
            ["Arme umspielen", "Cape-, Flatter- oder Bischofsärmel", "Chiffon"],
            ["Hüfte umspielen", "A-Linie", "Fließender Crêpe, Tüll"],
            ["Dekolleté in Szene setzen", "V-Ausschnitt, Corsage mit Stäbchen", "Satin mit Pailletten"],
          ],
        },
      },
      {
        h2: "Wie fallen Dubai-Größen aus?",
        body: ["Viele Dubai-Labels arbeiten mit S bis XXL oder UK-Größen. Als Richtwert: UK 16 entspricht DE 44, UK 18 DE 46, UK 20 DE 48. In der Anprobe messen wir und bestellen notfalls in der passenden Größe."],
        table: {
          head: ["Dubai / International", "UK", "DE"],
          rows: [["L", "14", "42"], ["XL", "16", "44"], ["XXL", "18", "46"], ["3XL", "20", "48"], ["4XL", "22–24", "50–52"], ["5XL", "26", "54"]],
        },
      },
    ],
    faq: [
      ["Gibt es in Hamburg Abendkleider ab Größe 46?", `Ja, bei GLAMORA in Hamburg-Harburg in Größen ${F.sizes}.`],
      ["Welche Schnitte stehen kurvigen Frauen?", "Wickelkleider, Empire-Schnitte und A-Linien mit Cape- oder Flatterärmeln."],
      ["Mein Modell ist nicht in meiner Größe da – was nun?", `Wir bestellen es aus Dubai in Ihrer Größe, in der Regel in ${F.orderDubai}.`],
      ["Wie fallen Dubai-Größen aus?", "Etwa: XL ≈ DE 44, XXL ≈ DE 46, 3XL ≈ DE 48. Wir messen in der Anprobe."],
      ["Gibt es private Curvy-Termine?", "Jeder Termin ist privat – der Salon gehört während der Anprobe Ihnen."],
    ],
    related: ["abendkleider-hamburg", "kleid-brautmutter-hamburg", "hijab-abendkleider-hamburg", "termin"],
  },

  /* ─────────────────────────── Abendkleider Harburg ─────────────────────── */
  {
    slug: "abendkleider-harburg",
    nav: "Abendkleider Harburg",
    title: "Abendkleider Harburg – Boutique Lüneburger Straße 33, 21073 Hamburg | GLAMORA",
    description: `Abendkleider in Hamburg-Harburg: GLAMORA, Lüneburger Straße 33, 21073 Hamburg – 5 Min. von S Harburg Rathaus. Für Heimfeld, Eißendorf, Wilstorf, Neugraben & den Landkreis Harburg.`,
    keywords: ["Abendkleider Harburg", "Abendmode Harburg", "Abendkleid 21073", "Abendkleider Hamburg Süd", "Abendkleider Heimfeld", "Abendkleider Neugraben"],
    eyebrow: "Hamburg-Harburg",
    h1: "Abendkleider in Hamburg-Harburg – Lüneburger Straße 33",
    lead: `GLAMORA ist die Boutique für Abendkleider und Abayas in Hamburg-Harburg, ${ADDRESS_LINE}. Die S-Bahn-Station Harburg Rathaus (S3/S5) liegt etwa 5 Gehminuten entfernt. Für Kundinnen aus Heimfeld, Eißendorf, Wilstorf, Marmstorf, Neugraben-Fischbek und dem Landkreis Harburg ist Harburg näher als die Innenstadt – mit ${F.models} Modellen in Größen ${F.sizes}.`,
    facts: [
      ["Adresse", ADDRESS_LINE],
      ["S-Bahn", "Harburg Rathaus, ca. 5 Min."],
      ["Öffnungszeiten", SITE.hoursLabel],
      ["Größen", F.sizes],
    ],
    sequences: [
      seq("harburg-1", {
        eyebrow: "Lüneburger Straße",
        title: "Abends, im Schaufenster.",
        body: `Mitten in der Harburger Fußgängerzone: Unser Schaufenster zeigt ${F.newArrivals} ein neues Kleid aus Dubai.`,
        points: ["Fußgängerzone Lüneburger Straße", `Neue Modelle ${F.newArrivals}`, "Abends nach Vereinbarung"],
        focalX: 0.62,
      }),
      seq("harburg-2", {
        eyebrow: "Passform-Beratung",
        title: "Gemessen. Gefunden.",
        body: `Wir nehmen Maß, prüfen Länge und Sitz im großen Spiegel und finden das Modell, das ohne große Änderungen passt – oder bestellen es in Ihrer Größe aus Dubai (${F.orderDubai}).`,
        points: ["Maß nehmen im Termin", "Größe & Länge im Spiegel prüfen", "Bestellung in Ihrer Größe"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Wie komme ich nach Harburg?",
        table: {
          head: ["Von", "Verbindung", "Dauer ca."],
          rows: [
            ["Hamburg Hbf", "S3 / S5 bis Harburg Rathaus", "15 Min."],
            ["Wilhelmsburg", "S3 / S5 bis Harburg Rathaus", "6 Min."],
            ["Neugraben", "S3 / S5 bis Harburg Rathaus", "10 Min."],
            ["Buxtehude", "S5 bis Harburg Rathaus", "25 Min."],
            ["Stade", "S5 bis Harburg Rathaus", "45 Min."],
            ["Lüneburg", "metronom bis Hamburg-Harburg, 10 Min. zu Fuß", "30 Min."],
            ["Winsen (Luhe)", "metronom bis Hamburg-Harburg", "20 Min."],
            ["Seevetal / Buchholz", "Regionalbahn oder Auto über A1 / A7", "15–25 Min."],
          ],
        },
      },
      {
        h2: "Abendmode im Süden Hamburgs",
        body: [
          "Für Harburg, Heimfeld, Eißendorf, Wilstorf, Marmstorf, Rönneburg, Neugraben-Fischbek, Neuwiedenthal und Hausbruch ist GLAMORA die nächste Adresse für Abendkleider und Abayas aus Dubai: private Anprobe mit Termin, ohne Fahrt in die Innenstadt und ohne Parkplatzsuche am Jungfernstieg.",
        ],
      },
    ],
    faq: [
      ["Wo kaufe ich in Harburg ein Abendkleid?", `Bei GLAMORA, ${ADDRESS_LINE}, ca. 5 Minuten von S Harburg Rathaus.`],
      ["Gibt es Parkplätze in der Nähe?", "Ja, mehrere Parkhäuser in der Harburger Innenstadt liegen in wenigen Gehminuten Entfernung."],
      ["Lohnt sich die Anfahrt aus dem Landkreis Harburg?", "Ja – Harburg ist aus dem Landkreis meist schneller erreichbar als die Innenstadt, und mit Termin hängt Ihre Vorauswahl schon bereit."],
      ["Welche Öffnungszeiten hat GLAMORA?", `${SITE.hoursLabel}.`],
    ],
    related: ["abendkleider-wilhelmsburg", "abendkleider-buxtehude", "abendkleider-lueneburg", "abendkleider-winsen"],
  },

  /* ─────────────────────────── Umland ────────────────────────────────────── */
  townPage({
    slug: "abendkleider-wilhelmsburg",
    town: "Wilhelmsburg",
    nav: "Wilhelmsburg",
    distance: "ca. 6 Minuten mit der S-Bahn",
    keywords: ["Abendkleider Wilhelmsburg", "Abaya Wilhelmsburg", "Abiye Wilhelmsburg", "Abendkleid Veddel", "Abendkleider Elbinsel"],
    why: "Von der Station Wilhelmsburg fahren S3 und S5 direkt nach Harburg Rathaus – zwei Stationen, keine Umstiege. Von der Veddel sind es drei Stationen.",
    journey: [
      ["S-Bahn", "S3 / S5 Wilhelmsburg → Harburg Rathaus", "6 Min."],
      ["S-Bahn", "S3 / S5 Veddel → Harburg Rathaus", "9 Min."],
      ["Bus", "Metrobus 13 bis S Wilhelmsburg, dann S-Bahn", "15–20 Min."],
      ["Auto", "über die B75 / Wilhelmsburger Reichsstraße", "10–15 Min."],
    ],
    extraFaq: [["Gibt es Abayas und Hijab-Abendkleider?", "Ja, festliche Abayas aus Dubai und hochgeschlossene Abendkleider mit langen Ärmeln sind unser Schwerpunkt."]],
    seqs: [
      seq("hijab-2", {
        eyebrow: "Für die große Hochzeit",
        title: "Salbei, Perlen, Chiffon.",
        body: "Hochgeschlossen, mit Bischofsärmeln und Perlen am Kragen – für Saalhochzeit, Nikah und Nişan.",
        points: ["Lange Ärmel", "Perlen & Kristall", "Anprobe unter Frauen"],
        focalX: 0.66,
      }),
      seq("boutique-1", {
        eyebrow: "Zwei Stationen entfernt",
        title: "Eine Stange voller Momente.",
        body: `Abendkleider, Abiye und Abayas aus Dubai, nach Farbe sortiert – ${F.models} Modelle in Harburg.`,
        points: [`${F.models} Modelle`, F.priceDress, F.sizes],
        focalX: 0.6,
      }),
    ],
    related: ["abendkleider-harburg", "hijab-abendkleider-hamburg", "abaya-hamburg", "kleid-hochzeitsgast-hamburg"],
  }),
  townPage({
    slug: "abendkleider-buxtehude",
    town: "Buxtehude",
    nav: "Buxtehude",
    distance: "ca. 25 Minuten mit der S5",
    keywords: ["Abendkleider Buxtehude", "Abendmode Buxtehude", "Abiballkleid Buxtehude", "Abendkleid Neu Wulmstorf"],
    why: "Die S5 fährt von Buxtehude über Neu Wulmstorf und Neugraben direkt bis Harburg Rathaus – ohne Umstieg. Von der Station sind es rund 5 Gehminuten zur Lüneburger Straße.",
    journey: [
      ["S-Bahn", "S5 Buxtehude → Harburg Rathaus", "25 Min."],
      ["S-Bahn", "S5 Neu Wulmstorf → Harburg Rathaus", "15 Min."],
      ["Auto", "über die A26 und B73", "20–25 Min."],
    ],
    extraFaq: [["Gibt es Abiballkleider für Buxtehuder Schulen?", "Ja. Wir notieren Schule und Balltermin und verkaufen dasselbe Modell nicht doppelt an einen Jahrgang."]],
    seqs: [
      seq("abiball-1", {
        eyebrow: "Abiball 2027",
        title: "Ein Kleid, das sich dreht.",
        body: "Tüll-Ballkleider und Corsagen für den Abiball – kein Modell doppelt pro Jahrgang.",
        points: ["Tüll & Corsage", F.priceAbiball, "Kein Modell doppelt"],
        focalX: 0.66,
      }),
      seq("harburg-1", {
        eyebrow: "Direkt mit der S5",
        title: "Abends, im Schaufenster.",
        body: "Von Buxtehude ohne Umstieg bis Harburg Rathaus – und in fünf Minuten zu Fuß in der Lüneburger Straße.",
        points: ["S5 ohne Umstieg", "5 Min. zu Fuß", "Abends nach Vereinbarung"],
        focalX: 0.62,
      }),
    ],
    related: ["abendkleider-harburg", "abiballkleider-hamburg", "abendkleider-stade", "abendkleider-hamburg"],
  }),
  townPage({
    slug: "abendkleider-stade",
    town: "Stade",
    nav: "Stade",
    distance: "ca. 45 Minuten mit der S5",
    keywords: ["Abendkleider Stade", "Abendmode Stade", "Abiballkleid Stade", "Abendkleid Landkreis Stade"],
    why: "Die S5 verbindet Stade direkt mit Harburg Rathaus. Mit dem Auto fahren Sie über die A26 Richtung Hamburg und die B73.",
    journey: [
      ["S-Bahn", "S5 Stade → Harburg Rathaus", "45 Min."],
      ["Auto", "über die A26 und B73", "35–40 Min."],
    ],
    extraFaq: [["Lohnt sich die Fahrt aus Stade?", `Ja, mit Termin: Ihre Vorauswahl aus ${F.models} Modellen hängt bereit, und Sie sparen sich die Fahrt über die Elbbrücken in die Innenstadt.`]],
    seqs: [
      seq("abendkleider-1", {
        eyebrow: "Die Kollektion",
        title: "Satin, Seide, Kristall.",
        body: "Couture aus Dubai mit handgesetzten Kristallen und Korsagen – die Fahrt lohnt sich.",
        points: [F.priceDress, F.sizes, "Vorauswahl nach Termin"],
        focalX: 0.66,
      }),
      seq("boutique-2", {
        eyebrow: "Der Spiegelsalon",
        title: "Der Vorhang gehört Ihnen.",
        body: "Wer extra anreist, soll nicht warten: Mit Termin haben Sie den Salon für sich.",
        points: [`Termin: ${F.appointmentLength}`, F.companions, "Diskret, auf Wunsch nur Frauen"],
        focalX: 0.66,
      }),
    ],
    related: ["abendkleider-buxtehude", "abendkleider-harburg", "abiballkleider-hamburg", "termin"],
  }),
  townPage({
    slug: "abendkleider-lueneburg",
    town: "Lüneburg",
    nav: "Lüneburg",
    distance: "ca. 30 Minuten mit dem metronom",
    keywords: ["Abendkleider Lüneburg", "Abendmode Lüneburg", "Abiballkleid Lüneburg", "Abaya Lüneburg"],
    why: "Der metronom (RE3 / RB31) fährt von Lüneburg ohne Umstieg bis Hamburg-Harburg. Vom Bahnhof Harburg sind es etwa 10 Minuten zu Fuß oder eine S-Bahn-Station bis Harburg Rathaus.",
    journey: [
      ["Bahn", "metronom Lüneburg → Hamburg-Harburg, dann 10 Min. zu Fuß", "30–35 Min."],
      ["Bahn + S-Bahn", "metronom bis Harburg, S3/S5 eine Station bis Harburg Rathaus", "35 Min."],
      ["Auto", "über die A39 und A1/A253", "35–40 Min."],
    ],
    extraFaq: [["Gibt es in Lüneburg einen Abaya-Laden?", "Für Abayas mit Anprobe ist GLAMORA in Hamburg-Harburg die nächstgelegene Boutique mit Schwerpunkt Dubai-Abayas – rund 30 Minuten mit dem metronom."]],
    seqs: [
      seq("abaya-2", {
        eyebrow: "Abayas aus Dubai",
        title: "Für Nikah, Hochzeit & Eid.",
        body: "Festliche Abayas mit Perlenstickerei – in Harburg zum Anprobieren, 30 Minuten von Lüneburg.",
        points: [F.priceAbaya, "Längen 52 bis 60 Zoll", "Anprobe unter Frauen"],
        focalX: 0.66,
      }),
      seq("abendkleider-2", {
        eyebrow: "Für jeden Anlass",
        title: "Gala, Hochzeit, Ball.",
        body: "Vom Abiball bis zur Hochzeit – wir stellen Ihre Auswahl vor dem Termin zusammen.",
        points: ["Vorauswahl nach Anlass", F.priceDress, F.sizes],
        focalX: 0.66,
      }),
    ],
    related: ["abendkleider-winsen", "abendkleider-harburg", "abaya-hamburg", "abendkleider-hamburg"],
  }),
  townPage({
    slug: "abendkleider-winsen",
    town: "Winsen (Luhe)",
    nav: "Winsen (Luhe)",
    distance: "ca. 20 Minuten mit dem metronom",
    keywords: ["Abendkleider Winsen Luhe", "Abendmode Winsen", "Abiballkleid Winsen", "Abendkleider Landkreis Harburg"],
    why: "Der metronom fährt von Winsen (Luhe) in rund 15 Minuten bis Hamburg-Harburg. Vom Bahnhof sind es etwa 10 Minuten zu Fuß in die Lüneburger Straße.",
    journey: [
      ["Bahn", "metronom Winsen → Hamburg-Harburg, dann 10 Min. zu Fuß", "20–25 Min."],
      ["Auto", "über die A39 / A250 und A1", "20–25 Min."],
    ],
    seqs: [
      seq("curvy-2", {
        eyebrow: "Glamour in jeder Größe",
        title: "Cape-Ärmel & Pailletten.",
        body: `Abendkleider in Größen ${F.sizes} – mit Cape, Pailletten und Corsagen mit Halt.`,
        points: [F.sizes, "Cape- & Flatterärmel", "Bestellung in Ihrer Größe"],
        focalX: 0.66,
      }),
      seq("harburg-1", {
        eyebrow: "Lüneburger Straße",
        title: "Abends, im Schaufenster.",
        body: "In der Harburger Fußgängerzone, zehn Gehminuten vom Bahnhof Harburg.",
        points: ["10 Min. vom Bahnhof", "Abends nach Vereinbarung", `Neue Modelle ${F.newArrivals}`],
        focalX: 0.62,
      }),
    ],
    related: ["abendkleider-lueneburg", "abendkleider-buchholz-seevetal", "abendkleider-harburg", "abendkleider-grosse-groessen-hamburg"],
  }),
  townPage({
    slug: "abendkleider-buchholz-seevetal",
    town: "Buchholz & Seevetal",
    nav: "Buchholz & Seevetal",
    distance: "ca. 15–25 Minuten",
    keywords: ["Abendkleider Buchholz Nordheide", "Abendkleider Seevetal", "Abendmode Rosengarten", "Abiballkleid Buchholz", "Abendkleider Jesteburg Tostedt"],
    why: "Von Buchholz in der Nordheide fahren Regionalzüge in rund 15 Minuten nach Hamburg-Harburg, aus Seevetal (Hittfeld, Maschen, Meckelfeld) sind Sie mit Bus, Bahn oder Auto in 15 bis 20 Minuten da. Auch aus Rosengarten, Jesteburg und Tostedt ist Harburg der kürzeste Weg.",
    journey: [
      ["Bahn", "Regionalbahn Buchholz → Hamburg-Harburg, dann 10 Min. zu Fuß", "20–25 Min."],
      ["Bahn", "Regionalbahn Hittfeld / Maschen → Hamburg-Harburg", "10–15 Min."],
      ["Auto", "Buchholz über die A1 / A261", "20–25 Min."],
      ["Auto", "Seevetal über die A1 / A7", "15 Min."],
    ],
    seqs: [
      seq("abendkleider-1", {
        eyebrow: "Die Kollektion",
        title: "Satin, Seide, Kristall.",
        body: "Lange Abendkleider und Ballkleider aus Dubai – für Abiball, Hochzeit und Gala.",
        points: [F.priceDress, F.sizes, `${F.models} Modelle`],
        focalX: 0.66,
      }),
      seq("termin-1", {
        eyebrow: "Mit Termin",
        title: "Die Türen öffnen sich für Sie.",
        body: "Während Ihres Termins ist der Salon nur für Sie da – kein Gedränge, keine Wartezeit.",
        points: ["Ein Termin, eine Kundin", "Abends nach Vereinbarung", "Kostenlos & unverbindlich"],
        focalX: 0.5,
      }),
    ],
    related: ["abendkleider-winsen", "abendkleider-harburg", "abiballkleider-hamburg", "termin"],
  }),

  /* ───────────────────────────────── Termin ─────────────────────────────── */
  {
    slug: "termin",
    nav: "Termin vereinbaren",
    title: "Termin für die Anprobe – Abendkleider & Abayas Hamburg | GLAMORA",
    description: `Anprobe-Termin bei GLAMORA in Hamburg-Harburg vereinbaren: ${F.appointmentLength}, privater Salon, ${F.companions}, Vorauswahl nach Anlass, Größe & Budget. Kostenlos und unverbindlich.`,
    keywords: ["Abendkleid Anprobe Termin Hamburg", "Termin Abendkleider Hamburg", "Abaya Anprobe Hamburg"],
    eyebrow: "Ihr Termin",
    h1: "Termin für Ihre Anprobe in Hamburg vereinbaren",
    lead: `Ein Anprobe-Termin bei GLAMORA ist kostenlos und unverbindlich. Er dauert ${F.appointmentLength}, findet in unserem privaten Salon in der ${SITE.street} in Hamburg-Harburg statt und Sie können ${F.companions} mitbringen. Schreiben Sie uns Anlass, Datum, Größe und Budget – wir bereiten eine Vorauswahl vor.`,
    facts: [
      ["Dauer", F.appointmentLength],
      ["Kosten", "kostenlos & unverbindlich"],
      ["Begleitung", F.companions],
      ["Adresse", ADDRESS_LINE],
      ["Öffnungszeiten", SITE.hoursLabel],
    ],
    sequences: [
      seq("termin-1", {
        eyebrow: "Willkommen",
        title: "Die Türen öffnen sich für Sie.",
        body: "Während Ihres Termins ist der Salon nur für Sie da. Kein Gedränge, keine Wartezeit, keine fremden Blicke.",
        points: ["Ein Termin, eine Kundin", "Auf Wunsch nur Beraterinnen", "Abendtermine nach Vereinbarung"],
        focalX: 0.5,
      }),
      seq("termin-2", {
        eyebrow: "Der Ablauf",
        title: "Ein Glas, eine Auswahl.",
        body: "Sie kommen an, wir reichen Champagner oder Tee, Ihre Vorauswahl hängt bereit. Danach probieren Sie in Ruhe – und wir nehmen Maß, falls wir in Ihrer Größe nachbestellen.",
        points: ["Vorauswahl nach Ihren Angaben", "Maß nehmen im Termin", "Kein Kaufzwang"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "So läuft Ihr Termin ab",
        table: {
          head: ["Schritt", "Was passiert"],
          rows: [
            ["1. Anfrage", "Per E-Mail: Anlass, Datum, Größe, Budget, Lieblingsfarben"],
            ["2. Vorauswahl", "Wir stellen 8–15 passende Modelle zusammen"],
            ["3. Anprobe", `${F.appointmentLength} im privaten Salon`],
            ["4. Entscheidung", "Lagerware direkt mitnehmen"],
            ["5. Bestellung", `Nicht vorrätige Farbe oder Größe aus Dubai, ${F.orderDubai}`],
          ],
        },
      },
      {
        h2: "Was sollte ich zur Anprobe mitbringen?",
        body: ["Schuhe mit der Absatzhöhe, die Sie am Anlass tragen möchten, einen passenden BH bzw. Unterwäsche, bei Abayas und Hijab-Kleidern Ihren Hijab – und, falls vorhanden, Fotos von Kleidern, die Ihnen gefallen."],
      },
    ],
    faq: [
      ["Kostet der Termin etwas?", "Nein, der Termin ist kostenlos und unverbindlich."],
      ["Wie viele Personen darf ich mitbringen?", `${F.companions}.`],
      ["Wie lange dauert der Termin?", `${F.appointmentLength}.`],
      ["Gibt es Termine am Abend oder Wochenende?", "Samstags regulär, abends und sonntags nach Vereinbarung."],
      ["Wie buche ich?", `Per E-Mail an ${SITE.email} mit Anlass, Datum, Größe und Budget.`],
    ],
    related: ["abendkleider-hamburg", "abendmode-geschaeft-hamburg", "ueber-uns", "abendkleider-harburg"],
  },

  /* ─────────────────────────────── Über uns ─────────────────────────────── */
  {
    slug: "ueber-uns",
    nav: "Über GLAMORA",
    title: "Über GLAMORA Hamburg – Abendmode aus Dubai in Hamburg-Harburg",
    description: `GLAMORA Hamburg ist eine Boutique für Abendkleider und Abayas aus Dubai in Hamburg-Harburg. Fakten, Kollektion, Service und Adresse auf einen Blick.`,
    keywords: ["GLAMORA Hamburg", "Abendmode aus Dubai", "Dubai Abendkleider Hamburg", "Couture Hamburg"],
    eyebrow: "Über uns",
    h1: "GLAMORA – Abendmode aus Dubai in Hamburg",
    lead: `GLAMORA ist eine Boutique für Abendkleider, Abayas und festliche Couture aus Dubai in Hamburg-Harburg (${ADDRESS_LINE}). Wir führen ${F.models} Modelle in Größen ${F.sizes}, preislich zwischen ${between(F.priceDress)}, und beraten mit Termin im privaten Salon.${SITE.founder ? ` Gegründet ${SITE.foundingYear ? `${SITE.foundingYear} ` : ""}von ${SITE.founder.name}.` : ""}`,
    facts: [
      ["Standort", "Hamburg-Harburg"],
      ...(SITE.foundingYear ? [["Gegründet", SITE.foundingYear]] : []),
      ...(SITE.founder ? [[SITE.founder.role, SITE.founder.name]] : []),
      ["Herkunft der Kollektion", "Ateliers in Dubai"],
      ["Modelle", F.models],
      ["Größen", F.sizes],
      ["Service", "Anprobe mit Termin, Vorauswahl, Bestellung aus Dubai"],
    ],
    sequences: [
      seq("atelier-1", {
        eyebrow: "Handwerk",
        title: "Kristall für Kristall.",
        body: "In den Ateliers in Dubai werden Kristalle und Perlen von Hand gesetzt. Manche Kleider tragen mehrere tausend davon.",
        points: ["Handgesetzte Kristalle & Perlen", "Goldfaden-Stickerei", "Korsagen mit Stäbchen"],
        focalX: 0.6,
      }),
      seq("atelier-2", {
        eyebrow: "Material",
        title: "Seide, Satin, Chiffon.",
        body: "Wir wählen Stoffe nach Fall und Haptik aus: schwere Duchesse-Seide, fließender Chiffon, Satin mit Tiefe.",
        points: ["Duchesse-Seide & Satin", "Chiffon & Tüll", "Nida & Seidenkrepp für Abayas"],
        focalX: 0.66,
      }),
    ],
    sections: [
      ...(SITE.founder?.bio ? [{ h2: `Wer steht hinter GLAMORA?`, body: [SITE.founder.bio] }] : []),
      {
        h2: "GLAMORA in Zahlen",
        table: {
          head: ["", ""],
          rows: [
            ["Adresse", ADDRESS_LINE],
            ["Modelle vor Ort", F.models],
            ["Größen", F.sizes],
            ["Abendkleider", F.priceDress],
            ["Abayas", F.priceAbaya],
            ["Bestellung aus Dubai", F.orderDubai],
            ["Öffnungszeiten", SITE.hoursLabel],
          ],
        },
      },
      {
        h2: "Warum Dubai?",
        body: ["Dubai ist eines der Zentren für Abend- und Modest-Couture: aufwendige Stickerei, hochwertige Stoffe und Schnitte, die Glamour und Bedeckung verbinden. Wir bringen diese Mode nach Hamburg – zum Anfassen und Anprobieren, statt nur auf Instagram."],
      },
    ],
    faq: [
      ["Was ist GLAMORA?", `Eine Boutique für Abendkleider und Abayas aus Dubai in Hamburg-Harburg, ${ADDRESS_LINE}.`],
      ["Woher stammen die Kleider?", "Aus Ateliers in Dubai, ausgewählt nach Stoff, Verarbeitung und Passform."],
      ["Hat GLAMORA eine Schneiderei?", "Nein. Wir konzentrieren uns auf Auswahl und Beratung und bestellen nicht vorrätige Größen und Farben aus Dubai."],
      ["Gibt es einen Onlineshop?", "Aktuell verkaufen wir ausschließlich in der Boutique mit Anprobe. Anfragen zu einzelnen Modellen beantworten wir per E-Mail."],
    ],
    related: ["abendmode-geschaeft-hamburg", "abendkleider-hamburg", "abaya-hamburg", "termin"],
  },
];
