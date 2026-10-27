import { SITE, ADDRESS_LINE } from "@/lib/site";

/* Content model for every keyword landing page. Each page follows the same
 * answer-first template: H1 → 2–3 sentence answer with hard facts → fact grid
 * → scroll sequence → H2 sections (question-style headings, tables) → scroll
 * sequence → FAQ (FAQPage schema) → visit CTA → related pages.
 *
 * Sequence frames live in /public/seiten/<dir>/frame-001.webp … */

const F = SITE.facts;
// "70 € bis 600 €" → "70 € und 600 €" after "zwischen".
const between = (range) => range.replace(" bis ", " und ");
// Scenes with a person (or dress form) were re-shot by Kling on a seamless white
// studio background (/seiten/weiss/<dir>, 9:16, background baked to the page
// porcelain); the rest play as framed full scenes.
const CUT = new Set([
  "abendkleider-1", "abendkleider-2", "abaya-1", "abaya-2", "boutique-2",
  "abiball-1", "abiball-2", "verlobung-1", "verlobung-2", "curvy-1", "curvy-2",
  "hijab-1", "hijab-2", "harburg-2",
]);

const seq = (dir, copy) =>
  CUT.has(dir)
    ? { basePath: `/seiten/weiss/${dir}`, frameCount: 120, variant: "cut", ...copy }
    : { basePath: `/seiten/${dir}`, frameCount: 120, variant: "framed", ...copy };

const visitFacts = [
  ["Adresse", ADDRESS_LINE],
  ["Anprobe", `mit Termin, ${F.appointmentLength}`],
  ["Größen", F.sizes],
  ["Änderungen", `im Haus, ${F.alterationDays}`],
];

export const PAGES = [
  /* ───────────────────────────── Abendkleider Hamburg ───────────────────── */
  {
    slug: "abendkleider-hamburg",
    nav: "Abendkleider Hamburg",
    title: "Abendkleider Hamburg – Couture aus Dubai, Anprobe mit Termin | GLAMORA",
    description: `Abendkleider in Hamburg kaufen: ${F.models} Modelle aus Dubai, Größen ${F.sizes}, ${F.priceDress}. Private Anprobe mit Termin & eigene Änderungsschneiderei in Hamburg-Harburg.`,
    keywords: ["Abendkleider Hamburg", "Abendkleid kaufen Hamburg", "Abendmode Hamburg", "exklusive Abendkleider Hamburg", "lange Abendkleider Hamburg"],
    eyebrow: "Abendkleider · Hamburg",
    h1: "Abendkleider in Hamburg – Couture aus Dubai, privat anprobiert",
    lead: `GLAMORA ist eine Boutique für Abendkleider in Hamburg-Harburg (${SITE.street}). Wir führen ${F.models} Abendkleider, Ballkleider und Abayas aus Dubai in den Größen ${F.sizes}, preislich zwischen ${between(F.priceDress)}. Die Anprobe findet mit Termin statt, dauert ${F.appointmentLength} und Änderungen erledigt unsere eigene Schneiderei in ${F.alterationDays}.`,
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
        body: "Ob Hochzeitsgast, Gala im Hotel Atlantic, Opernabend oder Abiball – wir stellen Ihnen vorab eine Auswahl passend zu Anlass, Größe und Budget zusammen.",
        points: ["Vorauswahl nach Ihren Angaben", "Private Kabine & Spiegelsalon", "Accessoires passend zum Kleid"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Wo kaufe ich in Hamburg ein exklusives Abendkleid?",
        body: [
          `Wer in Hamburg ein Abendkleid sucht, das nicht von der Stange kommt, findet bei GLAMORA in Harburg Couture aus Dubai: aufwendige Stickereien, Pailletten, Perlen und Korsagen in Größen ${F.sizes}. Anders als in großen Häusern beraten wir immer nur eine Kundin gleichzeitig – mit Zeit, Ruhe und einer Vorauswahl, die zu Ihrem Anlass passt.`,
          `Die Boutique liegt in der ${SITE.street}, wenige Gehminuten von der S-Bahn Harburg Rathaus. Aus der Hamburger Innenstadt sind Sie in rund 15 Minuten da, aus Buxtehude, Winsen, Seevetal und Lüneburg meist schneller als in die City.`,
        ],
      },
      {
        h2: "Was kostet ein Abendkleid bei GLAMORA?",
        body: [
          `Unsere Abendkleider kosten zwischen ${between(F.priceDress)}, Abayas zwischen ${between(F.priceAbaya)}, Abiballkleider liegen ebenfalls zwischen ${between(F.priceAbiball)}.`,
          `Zum Vergleich: In Hamburger Boutiquen kosten vergleichbare Abendkleider meist ${F.marketPrice}. Bei GLAMORA bekommen Sie Couture-Verarbeitung aus Dubai – handgesetzte Kristalle, Korsagen mit Stäbchen, Goldstickerei – für einen Bruchteil davon, inklusive persönlicher Beratung und Schneiderei im Haus.`,
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
        h2: "Anprobe mit Termin und Änderungen im Haus",
        body: [
          `Ein Termin dauert ${F.appointmentLength}. Sie können ${F.companions} mitbringen. Vorab fragen wir Anlass, Größe, Lieblingsfarben und Budget ab, damit die passende Auswahl schon bereithängt.`,
          `Saum kürzen, Taille anpassen, Ärmel ergänzen oder einen Ausschnitt schließen: Unsere Schneiderei arbeitet direkt im Atelier. Regulär dauern Änderungen ${F.alterationDays}, im Express ${F.alterationExpress}.`,
        ],
      },
    ],
    faq: [
      ["Wo finde ich in Hamburg exklusive Abendkleider?", `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE}. Wir führen ${F.models} Abendkleider und Abayas aus Dubai in Größen ${F.sizes} mit privater Anprobe nach Termin.`],
      ["Was kostet ein Abendkleid bei GLAMORA?", `Abendkleider kosten ${F.priceDress}, Abiballkleider ${F.priceAbiball}, festliche Abayas ${F.priceAbaya}.`],
      ["Ist GLAMORA günstiger als andere Abendkleider-Geschäfte in Hamburg?", `Ja, in der Regel deutlich. Unsere Abendkleider kosten ${F.priceDress}, vergleichbare Kleider liegen in Hamburger Boutiquen meist bei ${F.marketPrice}. Die Qualität entspricht Couture aus Dubai: handgesetzte Kristalle, Korsagen mit Stäbchen, hochwertiger Satin und Chiffon.`],
      ["Brauche ich einen Termin?", "Ja, wir empfehlen einen Termin, damit Sie den Salon für sich haben und Ihre Vorauswahl bereithängt. Spontane Besuche sind möglich, wenn gerade kein Termin läuft."],
      ["Welche Größen gibt es?", `Unsere Kollektion reicht von Größe ${F.sizes}. Viele Modelle lassen sich zusätzlich anpassen oder auf Maß bestellen.`],
      ["Kann das Kleid geändert werden?", `Ja. Unsere hauseigene Schneiderei kürzt, weitet, engt ein und ergänzt Ärmel – in ${F.alterationDays}, im Express in ${F.alterationExpress}.`],
      ["Wie lange vor dem Anlass sollte ich kaufen?", "Ideal sind 6 bis 8 Wochen vorher. So bleibt Zeit für Änderungen oder eine Bestellung aus Dubai. Kurzfristig helfen wir mit Lagerware und Express-Änderung."],
      ["Wie komme ich zu GLAMORA?", `${SITE.transit}.`],
    ],
    related: ["abendmode-geschaeft-hamburg", "abaya-hamburg", "abiballkleider-hamburg", "abendkleider-grosse-groessen-hamburg"],
  },

  /* ───────────────────────────── Abaya Hamburg ──────────────────────────── */
  {
    slug: "abaya-hamburg",
    nav: "Abaya Hamburg",
    title: "Abaya Hamburg – Abaya-Laden in Harburg, Dubai-Abayas anprobieren | GLAMORA",
    description: `Abaya kaufen in Hamburg: festliche Dubai-Abayas für Hochzeit, Nikah & Eid im Laden anprobieren. ${F.priceAbaya}, Größen ${F.sizes}, Kürzen im Haus. Lüneburger Straße 33, Harburg.`,
    keywords: ["Abaya Hamburg", "Abaya Laden Hamburg", "Abaya kaufen Hamburg", "Dubai Abaya", "festliche Abaya", "Abaya Geschäft Hamburg"],
    eyebrow: "Abayas · Hamburg",
    h1: "Abaya kaufen in Hamburg – Dubai-Abayas im Laden anprobieren",
    lead: `GLAMORA ist ein Abaya-Laden in Hamburg-Harburg, in dem Sie festliche Abayas aus Dubai vor Ort anprobieren können. Wir führen Abayas aus Seidenkrepp, Nida und Chiffon mit Goldstickerei, Perlen und Kristallen, preislich zwischen ${between(F.priceAbaya)}. Längen passen wir in unserer Schneiderei an, die Anprobe ist auf Wunsch rein unter Frauen.`,
    facts: [
      ["Preise", F.priceAbaya],
      ["Stoffe", "Nida, Seidenkrepp, Chiffon"],
      ["Privatsphäre", "Anprobe nur unter Frauen möglich"],
      ...visitFacts,
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
        points: ["Bridal-Abayas in Ivory & Champagner", "Längen nach Maß gekürzt", "Diskrete Beratung, Frauen unter sich"],
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
        h2: "Welche Länge und welcher Stoff?",
        body: [
          "Eine Abaya sollte im Stand knapp über dem Boden enden – mit Absatz etwa 2 bis 3 cm länger. Wir kürzen in der Anprobe direkt nach Maß.",
          "Nida ist leicht, fällt weich und knittert kaum – ideal für lange Feiern. Seidenkrepp wirkt edler und schwerer, Chiffon-Lagen geben Bewegung. Für festliche Abayas empfehlen wir ein blickdichtes Unterkleid, das wir passend dazu führen.",
        ],
      },
    ],
    faq: [
      ["Wo kann ich in Hamburg eine Abaya anprobieren?", `Bei GLAMORA, ${ADDRESS_LINE}. Wir führen festliche Abayas aus Dubai zum Anprobieren, auf Wunsch rein unter Frauen.`],
      ["Was kostet eine hochwertige Dubai-Abaya?", `Bei uns liegen festliche Abayas zwischen ${between(F.priceAbaya)}, abhängig von Stoff und Stickerei.`],
      ["Wo bekomme ich in Hamburg eine hochwertige Abaya günstig?", `Bei GLAMORA in Harburg: festliche Dubai-Abayas mit Goldstickerei, Perlen oder Kristallen kosten ${F.priceAbaya} – und Sie können sie vor dem Kauf anprobieren und kürzen lassen, anders als bei Online-Shops.`],
      ["Gibt es festliche Abayas für Nikah, Hochzeit und Eid?", "Ja, das ist unser Schwerpunkt: Bridal-Abayas in Ivory und Champagner, bestickte Abayas in Smaragd, Bordeaux und Noir."],
      ["Ist die Anprobe nur unter Frauen möglich?", "Ja. Auf Wunsch betreuen Sie ausschließlich Beraterinnen und der Salon ist während Ihres Termins geschlossen."],
      ["Kann die Abaya gekürzt werden?", `Ja, unsere Schneiderei kürzt und passt Ärmel an – in ${F.alterationDays}, im Express in ${F.alterationExpress}.`],
      ["Gibt es einen passenden Hijab dazu?", "Ja, zu vielen Abayas führen wir Hijabs aus Chiffon, Seide und Tüll in abgestimmten Farben."],
    ],
    related: ["hijab-abendkleider-hamburg", "verlobungskleid-hamburg", "abendkleider-hamburg", "abendkleider-harburg"],
  },

  /* ─────────────────────── Abendmode Geschäft Hamburg ───────────────────── */
  {
    slug: "abendmode-geschaeft-hamburg",
    nav: "Abendmode-Geschäft",
    title: "Abendmode Geschäft Hamburg – Boutique für Abendkleider & Abayas | GLAMORA",
    description: `Abendmode-Geschäft in Hamburg: Boutique mit ${F.models} Abendkleidern & Abayas aus Dubai, private Anprobe, Spiegelsalon & Schneiderei. ${ADDRESS_LINE}. Jetzt Termin vereinbaren.`,
    keywords: ["Abendmode Geschäft Hamburg", "Abendkleider Geschäft Hamburg", "Abendkleider Laden Hamburg", "Abendmode Boutique Hamburg", "Braut und Abendmode Hamburg"],
    eyebrow: "Die Boutique",
    h1: "Abendmode-Geschäft in Hamburg: die Boutique für Abendkleider & Abayas",
    lead: `GLAMORA ist ein Abendmode-Geschäft in Hamburg-Harburg mit ${F.models} Abendkleidern, Ballkleidern und Abayas aus Dubai. Die Boutique hat einen privaten Spiegelsalon, eine eigene Änderungsschneiderei und berät mit Termin jeweils eine Kundin – mit ${F.companions}. Sie finden uns in der ${SITE.street}, ${SITE.zip} Hamburg.`,
    facts: [
      ["Sortiment", "Abendkleider, Abayas, Ballkleider"],
      ["Service", "Spiegelsalon, Schneiderei, Accessoires"],
      ["Öffnungszeiten", SITE.hoursLabel],
      ...visitFacts.slice(0, 2),
    ],
    sequences: [
      seq("boutique-1", {
        eyebrow: "Im Geschäft",
        title: "Eine Stange voller Momente.",
        body: "Smaragd, Saphir, Rubin, Champagner: Unsere Kleider hängen nach Farben sortiert – damit Sie in Minuten sehen, welche Richtung Ihnen gefällt.",
        points: [`${F.models} Modelle vor Ort`, "Nach Farbe & Anlass sortiert", "Neue Lieferungen aus Dubai jeden Monat"],
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
            ["Preis", F.priceDress, `meist ${F.marketPrice}`],
            ["Beratung", "1:1, mit Termin, Vorauswahl", "Selbstbedienung"],
            ["Herkunft", "Couture aus Dubai", "Meist Massenware"],
            ["Änderungen", `Im Haus, ${F.alterationDays}`, "Extern oder gar nicht"],
            ["Größen", F.sizes, "Oft nur bis 42/44"],
            ["Anprobe", "Privater Salon", "Sammelkabine / zu Hause"],
          ],
        },
      },
      {
        h2: "Braut- und Abendmode in Hamburg-Harburg",
        body: [
          "Neben Abendkleidern führen wir Verlobungs-, Nikah- und Henna-Kleider sowie Bridal-Abayas. Klassische Brautkleider vermitteln wir auf Anfrage über unsere Partnerateliers in Dubai.",
        ],
      },
      {
        h2: "Öffnungszeiten, Anfahrt und Parken",
        body: [`${SITE.hoursLabel}.`, `${SITE.transit}.`],
      },
    ],
    faq: [
      ["Welches Abendmode-Geschäft in Hamburg berät mit Termin?", `GLAMORA in Hamburg-Harburg berät mit Termin im privaten Spiegelsalon, ${ADDRESS_LINE}.`],
      ["Was kostet ein Abendkleid im Geschäft?", `Abendkleider ${F.priceDress}, Abayas ${F.priceAbaya}. Damit liegt GLAMORA unter dem Hamburger Durchschnitt von ${F.marketPrice} – bei Couture-Verarbeitung aus Dubai.`],
      ["Wie viele Kleider gibt es im Geschäft?", `Vor Ort hängen ${F.models} Abendkleider, Ballkleider und Abayas, monatlich kommen neue Modelle aus Dubai.`],
      ["Kann ich ohne Termin vorbeikommen?", "Ja, wenn gerade kein Termin läuft. Mit Termin haben Sie den Salon jedoch für sich und Ihre Vorauswahl ist vorbereitet."],
      ["Gibt es eine Änderungsschneiderei?", `Ja, im Haus. Änderungen dauern ${F.alterationDays}, im Express ${F.alterationExpress}.`],
      ["Wie lange dauert ein Beratungstermin?", `${F.appointmentLength}. Sie können ${F.companions} mitbringen.`],
    ],
    related: ["abendkleider-hamburg", "termin", "ueber-uns", "abendkleider-harburg"],
  },

  /* ───────────────────────────── Abiballkleider ─────────────────────────── */
  {
    slug: "abiballkleider-hamburg",
    nav: "Abiballkleider",
    title: "Abiballkleider Hamburg 2027 – Abiballkleid in Harburg anprobieren | GLAMORA",
    description: `Abiballkleider in Hamburg für den Abiball 2027: Ballkleider & Pailletten-Kleider ${F.priceAbiball}, Größen ${F.sizes}, Änderung im Haus. Termin in Hamburg-Harburg buchen.`,
    keywords: ["Abiballkleider Hamburg", "Abiballkleid Hamburg", "Abschlussballkleid Hamburg", "Ballkleid Hamburg", "Abiball 2027"],
    eyebrow: "Abiball 2027",
    h1: "Abiballkleider in Hamburg – rechtzeitig für den Abiball 2027",
    lead: `Ein Abiballkleid bei GLAMORA in Hamburg-Harburg kostet ${F.priceAbiball}. Wir führen Ballkleider aus Tüll, Pailletten-Kleider und Corsagen-Kleider in Größen ${F.sizes}, auch hochgeschlossen und mit Ärmeln. Kaufen Sie idealerweise 8 bis 12 Wochen vor dem Ball, damit genug Zeit für Änderungen bleibt – unsere Schneiderei passt das Kleid im Haus an.`,
    facts: [
      ["Preise", F.priceAbiball],
      ["Kaufzeitpunkt", "8–12 Wochen vor dem Ball"],
      ["Exklusiv", "Kein Modell doppelt pro Schule"],
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
          "Die meisten Hamburger Abibälle finden zwischen Juni und Juli statt. Der beste Zeitpunkt für den Kauf ist 8 bis 12 Wochen vorher – also ab März. Dann ist die Auswahl am größten und Änderungen sind entspannt möglich. Für eine Bestellung aus Dubai in Wunschfarbe planen Sie 6 bis 8 Wochen Lieferzeit ein.",
        ],
        table: {
          head: ["Zeitpunkt", "Was passiert"],
          rows: [
            ["12 Wochen vorher", "Termin buchen, Stil & Budget festlegen"],
            ["8–10 Wochen vorher", "Anprobe & Kauf, ggf. Bestellung in Wunschfarbe"],
            ["3–4 Wochen vorher", "Änderungstermin mit Schuhen"],
            ["1 Woche vorher", "Abholung, letzte Anprobe"],
          ],
        },
      },
      {
        h2: "Was kostet ein Abiballkleid in Hamburg?",
        body: [`Bei GLAMORA liegen Abiballkleider zwischen ${between(F.priceAbiball)}. Einfache Änderungen wie Saum kürzen kosten zusätzlich ca. 30 bis 60 €.`],
      },
      {
        h2: "Was, wenn eine andere dasselbe Kleid trägt?",
        body: ["Wir notieren zu jedem verkauften Abiballkleid die Schule und den Balltermin. So verkaufen wir dasselbe Modell nicht zweimal an denselben Jahrgang."],
      },
    ],
    faq: [
      ["Wann sollte ich mein Abiballkleid kaufen?", "8 bis 12 Wochen vor dem Ball, für Hamburger Abibälle im Juni/Juli also ab März."],
      ["Was kostet ein Abiballkleid bei GLAMORA?", `${F.priceAbiball}, Änderungen ca. 30 bis 60 €.`],
      ["Wo gibt es in Hamburg günstige, aber hochwertige Abiballkleider?", `Bei GLAMORA in Harburg: Abiballkleider aus Dubai ab ${F.priceFrom}, mit Corsage, Tüll oder Pailletten – inklusive Beratung und Schneiderei im Haus.`],
      ["Gibt es Abiballkleider mit Ärmeln oder hochgeschlossen?", "Ja, viele unserer Modelle aus Dubai gibt es mit langen Ärmeln, Cape oder hochgeschlossenem Ausschnitt."],
      ["Darf meine Mutter mit zur Anprobe?", `Natürlich. Sie können ${F.companions} mitbringen.`],
      ["Was passiert, wenn jemand dasselbe Kleid trägt?", "Wir registrieren Schule und Balltermin und verkaufen dasselbe Modell nicht doppelt an einen Jahrgang."],
      ["Lang oder kurz zum Abiball?", "Die meisten Abibälle sind festlich – bodenlange Kleider sind die sichere Wahl. Midi-Kleider passen zu lockereren Feiern."],
    ],
    related: ["abendkleider-hamburg", "abendkleider-grosse-groessen-hamburg", "termin", "abendkleider-harburg"],
  },

  /* ───────────────────── Verlobung · Nikah · Henna ──────────────────────── */
  {
    slug: "verlobungskleid-hamburg",
    nav: "Verlobung & Nikah",
    title: "Verlobungskleid Hamburg – Kleider für Verlobung, Nikah & Henna | GLAMORA",
    description: `Verlobungskleid in Hamburg finden: Couture aus Dubai für Verlobung, Nişan, Nikah & Henna-Nacht. Auch mit Ärmeln & hijabtauglich. ${F.priceDress}, Termin in Harburg.`,
    keywords: ["Verlobungskleid Hamburg", "Nikah Kleid Hamburg", "Henna Kleid Hamburg", "Nişan elbisesi Hamburg", "Kına Kleid", "Standesamtkleid Hamburg"],
    eyebrow: "Verlobung · Nikah · Henna",
    h1: "Verlobungskleid in Hamburg – für Verlobung, Nikah und Henna-Nacht",
    lead: `Bei GLAMORA in Hamburg-Harburg finden Sie Verlobungskleider, Nikah-Kleider und Henna-Kleider aus Dubai zwischen ${F.priceDress.replace(" bis ", " und ")}. Viele Modelle gibt es mit langen Ärmeln und hochgeschlossen, also hijabtauglich. Wir empfehlen, 8 bis 10 Wochen vor dem Fest zu kommen – für Bestellungen in Wunschfarbe und Anpassungen in unserer Schneiderei.`,
    facts: [
      ["Preise", F.priceDress],
      ["Varianten", "mit Ärmeln, hochgeschlossen, Cape"],
      ["Vorlauf", "8–10 Wochen ideal"],
      ...visitFacts.slice(0, 3),
    ],
    sequences: [
      seq("verlobung-1", {
        eyebrow: "Henna-Nacht",
        title: "Samt, Gold und Kerzenlicht.",
        body: "Für Kına und Henna-Nacht: bestickte Samtkleider und Kaftane in Smaragd, Bordeaux und Purpur – mit Goldstickerei, die im Kerzenlicht glänzt.",
        points: ["Samt-Kaftane mit Goldstickerei", "Smaragd, Bordeaux, Purpur", "Passender Schleier auf Wunsch"],
        focalX: 0.66,
      }),
      seq("verlobung-2", {
        eyebrow: "Verlobung & Nişan",
        title: "Flieder, Chiffon, Kristall.",
        body: "Leichte Chiffon-Kleider mit Cape-Ärmeln und Kristallgürtel – romantisch zur Verlobung, elegant zum Standesamt.",
        points: ["Cape-Ärmel & Corsagen", "Flieder, Rosé, Champagner", "Auch als Standesamtkleid"],
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
            ["Nikah", "Ivory, Champagner, Pastell", "Hochgeschlossen, lange Ärmel, Bridal-Abaya"],
            ["Henna / Kına", "Bordeaux, Smaragd, Purpur, Rot-Gold", "Samt-Kaftan, bestickte Robe"],
            ["Standesamt", "Creme, Puder, Salbei", "Midi, Zweiteiler, schlichte Seide"],
          ],
        },
      },
      {
        h2: "Hijabtaugliche Verlobungs- und Nikah-Kleider",
        body: ["Viele unserer Modelle aus Dubai sind von Haus aus hochgeschlossen und mit langen Ärmeln gearbeitet. Andere ergänzen wir in der Schneiderei mit Ärmeln aus Chiffon oder Spitze und einem Einsatz am Ausschnitt."],
      },
      {
        h2: "Wie lange dauert eine Bestellung aus Dubai?",
        body: ["Lagerware nehmen Sie direkt mit. Ein Modell in Wunschfarbe oder -größe aus Dubai dauert in der Regel 4 bis 6 Wochen, danach folgen Anpassungen im Atelier."],
      },
    ],
    faq: [
      ["Wo finde ich in Hamburg ein Verlobungskleid?", `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE} – Verlobungs-, Nikah- und Henna-Kleider aus Dubai mit Anprobe nach Termin.`],
      ["Was kostet ein Verlobungskleid?", `Bei uns zwischen ${F.priceDress.replace(" bis ", " und ")}, je nach Stoff und Stickerei.`],
      ["Gibt es Verlobungskleider mit Ärmeln oder hijabtauglich?", "Ja, viele Modelle sind hochgeschlossen mit langen Ärmeln; andere ergänzen wir in der Schneiderei."],
      ["Was trägt man zur Henna-Nacht?", "Traditionell Samt oder bestickte Kaftane in Bordeaux, Smaragd oder Rot-Gold."],
      ["Was trägt man zur Nikah?", "Häufig Ivory oder Champagner, hochgeschlossen mit langen Ärmeln – zum Beispiel eine Bridal-Abaya mit Perlenstickerei."],
      ["Wie lange dauert eine Bestellung aus Dubai?", "In der Regel 4 bis 6 Wochen plus Zeit für Anpassungen."],
    ],
    related: ["abaya-hamburg", "hijab-abendkleider-hamburg", "abendkleider-hamburg", "termin"],
  },

  /* ─────────────────────── Hijab / Modest Abendkleider ──────────────────── */
  {
    slug: "hijab-abendkleider-hamburg",
    nav: "Hijab-Abendkleider",
    title: "Hijab Abendkleider Hamburg – Abendkleider mit Ärmeln & hochgeschlossen | GLAMORA",
    description: `Hijabtaugliche Abendkleider in Hamburg: hochgeschlossen, lange Ärmel, blickdicht – Modest Fashion aus Dubai in Größen ${F.sizes}. Anprobe unter Frauen in Hamburg-Harburg.`,
    keywords: ["Hijab Abendkleid Hamburg", "Abendkleid mit Ärmeln Hamburg", "Modest Fashion Hamburg", "hochgeschlossenes Abendkleid", "Tesettür Abiye Hamburg"],
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
        points: ["Bischofs- & Cape-Ärmel", "Perlen- und Kristallstickerei", "Ärmel auch nachträglich ergänzbar"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Woran erkenne ich ein hijabtaugliches Abendkleid?",
        table: {
          head: ["Kriterium", "Worauf achten", "Bei GLAMORA"],
          rows: [
            ["Ärmel", "Bis zum Handgelenk, nicht transparent", "Standard oder nachträglich ergänzt"],
            ["Ausschnitt", "Hochgeschlossen oder mit Einsatz", "Einsatz aus Chiffon/Spitze möglich"],
            ["Länge", "Bodenlang, ohne Schlitz", "Saum nach Maß"],
            ["Stoff", "Blickdicht, nicht hauteng", "Gefüttert, A-Linie & fließend"],
          ],
        },
      },
      {
        h2: "Normales Abendkleid hijabtauglich machen",
        body: [`Gefällt Ihnen ein Kleid mit Ausschnitt oder ohne Ärmel? Unsere Schneiderei ergänzt Ärmel, schließt Ausschnitte und verlängert Säume – farblich passend, in ${F.alterationDays}.`],
      },
    ],
    faq: [
      ["Wo gibt es in Hamburg Abendkleider für Hijabis?", `Bei GLAMORA in Hamburg-Harburg, ${ADDRESS_LINE}: hochgeschlossene Abendkleider mit langen Ärmeln aus Dubai.`],
      ["Kann man Ärmel nachträglich ergänzen?", "Ja, unsere Schneiderei ergänzt Ärmel aus Chiffon, Spitze oder dem Originalstoff."],
      ["Ist die Anprobe unter Frauen möglich?", "Ja, auf Wunsch betreuen Sie ausschließlich Beraterinnen im geschlossenen Salon."],
      ["Gibt es hijabtaugliche Kleider in großen Größen?", `Ja, in Größen ${F.sizes}.`],
      ["Führt GLAMORA auch Abayas?", "Ja, festliche Abayas aus Dubai – siehe unsere Seite Abaya Hamburg."],
    ],
    related: ["abaya-hamburg", "verlobungskleid-hamburg", "abendkleider-grosse-groessen-hamburg", "abendkleider-hamburg"],
  },

  /* ─────────────────────────── Große Größen ─────────────────────────────── */
  {
    slug: "abendkleider-grosse-groessen-hamburg",
    nav: "Große Größen",
    title: "Abendkleider große Größen Hamburg – Curvy bis Größe 54 | GLAMORA",
    description: `Abendkleider in großen Größen in Hamburg: Curvy & Plus Size bis Größe 54, Couture aus Dubai, Anpassung nach Maß im Haus. Private Anprobe in Hamburg-Harburg.`,
    keywords: ["Abendkleider große Größen Hamburg", "Curvy Abendkleider Hamburg", "Plus Size Abendkleid Hamburg", "Abendkleid Größe 48", "Abendmode große Größen"],
    eyebrow: "Curvy · Plus Size",
    h1: "Abendkleider in großen Größen in Hamburg – Curvy bis Größe 54",
    lead: `GLAMORA in Hamburg-Harburg führt Abendkleider in den Größen ${F.sizes} – ein großer Teil der Kollektion ist ab Größe 44 erhältlich. Die Kleider aus Dubai kosten ${F.priceDress} und werden in unserer Schneiderei an Ihre Figur angepasst. In der privaten Anprobe haben Sie den Salon für sich.`,
    facts: [
      ["Größen", F.sizes],
      ["Ab Größe 44", "großer Teil der Kollektion"],
      ["Anpassung", `im Haus, ${F.alterationDays}`],
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
        points: ["Cape- & Flatterärmel", "Corsagen mit Halt", "Ärmel nachträglich ergänzbar"],
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
        body: ["Viele Dubai-Labels arbeiten mit S bis XXL oder UK-Größen. Als Richtwert: UK 16 entspricht DE 44, UK 18 DE 46, UK 20 DE 48. In der Anprobe messen wir und bestellen notfalls nach Maß."],
        table: {
          head: ["Dubai / International", "UK", "DE"],
          rows: [["L", "14", "42"], ["XL", "16", "44"], ["XXL", "18", "46"], ["3XL", "20", "48"], ["4XL", "22–24", "50–52"]],
        },
      },
    ],
    faq: [
      ["Gibt es in Hamburg Abendkleider ab Größe 46?", `Ja, bei GLAMORA in Hamburg-Harburg in Größen ${F.sizes}.`],
      ["Welche Schnitte stehen kurvigen Frauen?", "Wickelkleider, Empire-Schnitte und A-Linien mit Cape- oder Flatterärmeln."],
      ["Ist eine Maßanfertigung möglich?", "Ja, viele Modelle bestellen wir aus Dubai nach Ihren Maßen."],
      ["Wie fallen Dubai-Größen aus?", "Etwa: XL ≈ DE 44, XXL ≈ DE 46, 3XL ≈ DE 48. Wir messen in der Anprobe."],
      ["Gibt es private Curvy-Termine?", "Jeder Termin ist privat – der Salon gehört während der Anprobe Ihnen."],
    ],
    related: ["abendkleider-hamburg", "hijab-abendkleider-hamburg", "abiballkleider-hamburg", "termin"],
  },

  /* ─────────────────────────── Abendkleider Harburg ─────────────────────── */
  {
    slug: "abendkleider-harburg",
    nav: "Abendkleider Harburg",
    title: "Abendkleider Harburg – Boutique Lüneburger Straße 33 | GLAMORA",
    description: `Abendkleider in Hamburg-Harburg: GLAMORA, Lüneburger Straße 33, 21073 Hamburg – 5 Min. von S Harburg Rathaus. Für Kundinnen aus Harburg, Buxtehude, Winsen, Seevetal & Lüneburg.`,
    keywords: ["Abendkleider Harburg", "Abendmode Harburg", "Abendkleid 21073", "Brautmode Harburg", "Abendkleider Buxtehude", "Abendkleider Lüneburg", "Abendkleider Winsen"],
    eyebrow: "Hamburg-Harburg",
    h1: "Abendkleider in Hamburg-Harburg – Lüneburger Straße 33",
    lead: `GLAMORA ist die Boutique für Abendkleider und Abayas in Hamburg-Harburg, ${ADDRESS_LINE}. Die S-Bahn-Station Harburg Rathaus (S3/S5) liegt etwa 5 Gehminuten entfernt. Für Kundinnen aus Buxtehude, Winsen (Luhe), Seevetal, Buchholz, Stade und Lüneburg ist Harburg oft näher als die Hamburger Innenstadt – mit ${F.models} Modellen in Größen ${F.sizes}.`,
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
        body: "Mitten in der Harburger Fußgängerzone: Unser Schaufenster zeigt jeden Monat ein neues Kleid aus Dubai.",
        points: ["Fußgängerzone Lüneburger Straße", "Neue Modelle jeden Monat", "Abends nach Vereinbarung"],
        focalX: 0.62,
      }),
      seq("harburg-2", {
        eyebrow: "Schneiderei im Haus",
        title: "Abgesteckt. Angepasst.",
        body: `Kürzen, einnähen, Ärmel ergänzen – direkt bei uns in Harburg, in ${F.alterationDays}. Für Kundinnen mit Anreise legen wir Anprobe und Änderung auf einen Tag.`,
        points: [`Express in ${F.alterationExpress}`, "Anprobe & Änderung an einem Tag", "Abholung oder Versand"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Anfahrt nach Harburg",
        table: {
          head: ["Von", "Verbindung", "Dauer ca."],
          rows: [
            ["Hamburg Hbf", "S3 / S5 bis Harburg Rathaus", "15 Min."],
            ["Buxtehude", "S5 bis Harburg Rathaus", "25 Min."],
            ["Stade", "S5 bis Harburg Rathaus", "45 Min."],
            ["Lüneburg", "Metronom bis Harburg, 10 Min. zu Fuß", "30 Min."],
            ["Winsen (Luhe)", "Metronom bis Harburg / A39 / A1", "20 Min."],
            ["Seevetal / Buchholz", "Auto über A1 / A7 bzw. RB", "15–25 Min."],
          ],
        },
      },
      {
        h2: "Abendmode im Süden Hamburgs",
        body: [
          "Die Lüneburger Straße ist seit Jahren eine Adresse für festliche Mode im Hamburger Süden. GLAMORA ergänzt sie um Couture aus Dubai, eine private Anprobe mit Termin und eine eigene Schneiderei – ohne Fahrt in die Innenstadt und ohne Parkplatzsuche am Jungfernstieg.",
        ],
      },
    ],
    faq: [
      ["Wo kaufe ich in Harburg ein Abendkleid?", `Bei GLAMORA, ${ADDRESS_LINE}, ca. 5 Minuten von S Harburg Rathaus.`],
      ["Gibt es Parkplätze in der Nähe?", "Ja, mehrere Parkhäuser in der Harburger Innenstadt liegen in wenigen Gehminuten Entfernung."],
      ["Lohnt sich die Anfahrt aus Lüneburg oder Buxtehude?", "Ja – Harburg ist aus dem Landkreis meist schneller erreichbar als die Innenstadt, und Anprobe und Änderung legen wir auf einen Termin."],
      ["Welche Öffnungszeiten hat GLAMORA?", `${SITE.hoursLabel}.`],
    ],
    related: ["abendkleider-hamburg", "abendmode-geschaeft-hamburg", "termin", "abaya-hamburg"],
  },

  /* ───────────────────────────────── Termin ─────────────────────────────── */
  {
    slug: "termin",
    nav: "Termin vereinbaren",
    title: "Termin für die Anprobe – Abendkleider & Abayas Hamburg | GLAMORA",
    description: `Anprobe-Termin bei GLAMORA in Hamburg-Harburg vereinbaren: ${F.appointmentLength}, privater Salon, ${F.companions}, Vorauswahl nach Anlass, Größe & Budget. Kostenlos und unverbindlich.`,
    keywords: ["Abendkleid Anprobe Termin Hamburg", "Termin Abendkleider Hamburg", "Brautmode Termin Hamburg"],
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
        body: "Sie kommen an, wir reichen Champagner oder Tee, Ihre Vorauswahl hängt bereit. Danach probieren Sie in Ruhe – und wir stecken direkt ab, falls etwas angepasst werden soll.",
        points: ["Vorauswahl nach Ihren Angaben", "Abstecken direkt im Termin", "Kein Kaufzwang"],
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
            ["4. Abstecken", "Änderungen werden direkt markiert"],
            ["5. Abholung", `Nach ${F.alterationDays} – oder Express in ${F.alterationExpress}`],
          ],
        },
      },
      {
        h2: "Was sollte ich zur Anprobe mitbringen?",
        body: ["Schuhe mit der Absatzhöhe, die Sie am Anlass tragen möchten, einen passenden BH bzw. Unterwäsche und – falls vorhanden – Fotos von Kleidern, die Ihnen gefallen."],
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
    title: "Über GLAMORA – Abendmode aus Dubai in Hamburg-Harburg",
    description: `GLAMORA ist eine Boutique für Abendkleider und Abayas aus Dubai in Hamburg-Harburg mit eigener Schneiderei. Fakten, Kollektion, Service und Adresse auf einen Blick.`,
    keywords: ["GLAMORA Hamburg", "Abendmode aus Dubai", "Dubai Abendkleider Hamburg", "Couture Hamburg"],
    eyebrow: "Über uns",
    h1: "GLAMORA – Abendmode aus Dubai in Hamburg",
    lead: `GLAMORA ist eine Boutique für Abendkleider, Abayas und festliche Couture aus Dubai in Hamburg-Harburg (${ADDRESS_LINE}). Wir führen ${F.models} Modelle in Größen ${F.sizes}, preislich zwischen ${between(F.priceFrom)} und ${F.priceDress.split(" bis ")[1]}, beraten mit Termin im privaten Salon und passen jedes Kleid in unserer eigenen Schneiderei an.`,
    facts: [
      ["Gegründet in", "Hamburg"],
      ["Herkunft der Kollektion", "Ateliers in Dubai"],
      ["Modelle", F.models],
      ["Größen", F.sizes],
      ["Service", "Anprobe mit Termin, Schneiderei, Maßbestellung"],
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
            ["Änderungen", `${F.alterationDays}, Express ${F.alterationExpress}`],
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
      ["Gibt es einen Onlineshop?", "Aktuell verkaufen wir ausschließlich im Atelier mit Anprobe. Anfragen zu einzelnen Modellen beantworten wir per E-Mail."],
    ],
    related: ["abendmode-geschaeft-hamburg", "abendkleider-hamburg", "abaya-hamburg", "termin"],
  },
];

export const PAGE_BY_SLUG = Object.fromEntries(PAGES.map((p) => [p.slug, p]));
