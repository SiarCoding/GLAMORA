import { SITE } from "@/lib/site";

/* Ratgeber (guides) — /ratgeber/<slug>, Article + FAQPage schema. GEO pattern:
 * H2 as the question people type into a chat, 2–3 sentence answer with facts,
 * a table, then a link to the matching landing page. Keep `modified` current —
 * it is shown as "Stand" and sent as dateModified. */

const F = SITE.facts;

export const ARTICLES = [
  {
    slug: "dresscode-erklaert-black-tie-cocktail",
    title: "Dresscode erklärt: Black Tie, Cocktail, Festlich – was tragen Damen? | GLAMORA",
    description: "Black Tie, Cocktail, Festlich, Business: Was die Dresscodes für Damen bedeuten, welche Kleidlänge passt und welche Stoffe – mit Tabelle.",
    h1: "Dresscode erklärt: Was tragen Damen bei Black Tie, Cocktail und Festlich?",
    lead: "Black Tie verlangt ein bodenlanges Abendkleid, Cocktail ein knie- bis wadenlanges Kleid, „Festlich“ lässt beides zu. Je formeller der Dresscode, desto länger der Saum, edler der Stoff und ruhiger der Schmuck.",
    image: "atelier-2",
    published: "2026-10-30",
    modified: "2026-10-30",
    sections: [
      {
        h2: "Welcher Dresscode verlangt welches Kleid?",
        table: {
          head: ["Dresscode", "Kleid", "Länge", "Stoffe"],
          rows: [
            ["White Tie", "Große Robe, Ballkleid", "bodenlang", "Seide, Duchesse, Taft"],
            ["Black Tie", "Abendkleid", "bodenlang", "Satin, Seide, Chiffon"],
            ["Black Tie optional / Festlich", "Abendkleid oder elegantes Midi", "bodenlang oder Midi", "Satin, Crêpe, Spitze"],
            ["Cocktail", "Cocktailkleid", "Knie bis Wade", "Crêpe, Satin, Pailletten"],
            ["Business / Smart", "Etuikleid, Hosenanzug", "Knie", "Wolle, Crêpe"],
          ],
        },
      },
      {
        h2: "Darf man bei Black Tie ein kurzes Kleid tragen?",
        body: ["Klassisch nein: Black Tie meint für Damen ein bodenlanges Abendkleid. Ein sehr elegantes Midi wird manchmal akzeptiert, ist aber nie die sichere Wahl."],
      },
      {
        h2: "Was bedeutet „festlich“ auf einer Einladung?",
        body: ["„Festlich“ ist eine Stufe unter Black Tie: Ein bodenlanges Abendkleid ist richtig, ein edles Midi-Kleid aus Satin oder Spitze ebenfalls. Bei Abendveranstaltungen ab 18 Uhr eher lang wählen."],
      },
    ],
    faq: [
      ["Was trägt man als Frau bei Black Tie?", "Ein bodenlanges Abendkleid aus Satin, Seide oder Chiffon, dazu dezenter Schmuck und eine kleine Clutch."],
      ["Was ist der Unterschied zwischen Black Tie und Cocktail?", "Black Tie verlangt bodenlang, Cocktail ein knie- bis wadenlanges Kleid."],
      ["Was trägt man bei „Abendgarderobe erwünscht“?", "Ein bodenlanges Abendkleid oder ein sehr elegantes Midi-Kleid."],
    ],
    related: ["abendkleider-hamburg", "kleid-hochzeitsgast-hamburg"],
  },
  {
    slug: "was-traegt-man-in-der-elbphilharmonie",
    title: "Was trägt man in der Elbphilharmonie und Staatsoper Hamburg? | GLAMORA",
    description: "Gibt es einen Dresscode in der Elbphilharmonie oder der Hamburgischen Staatsoper? Was man zu Konzert, Premiere und Silvester trägt – mit Tabelle.",
    h1: "Was trägt man in der Elbphilharmonie und in der Staatsoper Hamburg?",
    lead: "Die Elbphilharmonie hat keinen vorgeschriebenen Dresscode – erlaubt ist, was sich gut anfühlt. Zu Premieren, Galas und Silvesterkonzerten kleiden sich viele Gäste aber deutlich festlicher, oft im langen Abendkleid. Für die Staatsoper gilt dasselbe: kein Zwang, an Premierenabenden eher elegant.",
    image: "abendkleider-2",
    published: "2026-10-30",
    modified: "2026-10-30",
    sections: [
      {
        h2: "Gibt es in der Elbphilharmonie einen Dresscode?",
        body: ["Nein. Die Elbphilharmonie schreibt keine Kleidung vor; im Publikum sieht man Jeans ebenso wie Abendkleider. Je besonderer der Abend, desto festlicher wird es allerdings."],
      },
      {
        h2: "Was trägt man zu welchem Anlass?",
        table: {
          head: ["Anlass", "Typische Kleidung Damen"],
          rows: [
            ["Normales Abendkonzert", "Smart Casual bis elegant: Midi-Kleid, Hosenanzug"],
            ["Premiere, Gala, Festkonzert", "Elegantes Abendkleid, oft bodenlang"],
            ["Silvesterkonzert", "Festlich: Abendkleid mit Glanz, Pailletten, Satin"],
            ["Opernpremiere Staatsoper", "Abendkleid oder elegantes Cocktailkleid"],
          ],
        },
      },
      {
        h2: "Worauf sollte man im Konzertsaal achten?",
        body: ["Raschelnde Stoffe, klirrender Schmuck und hohe Absätze auf den vielen Treppen der Elbphilharmonie stören eher. Gut sind fließender Satin oder Crêpe, ein Kleid, in dem man bequem sitzt, und eine leichte Stola für den Weg zur Plaza."],
      },
    ],
    faq: [
      ["Muss man in der Elbphilharmonie schick angezogen sein?", "Nein, es gibt keinen Dresscode. Zu Galas, Premieren und Silvester kleiden sich viele Gäste aber festlich."],
      ["Was trägt man zur Opernpremiere in Hamburg?", "Ein Abendkleid oder ein elegantes Cocktailkleid; vorgeschrieben ist nichts."],
    ],
    related: ["abendkleider-hamburg", "abendkleid-guenstig-hamburg"],
  },
  {
    slug: "abaya-stoffe-nida-crepe-chiffon",
    title: "Abaya-Stoffe im Vergleich: Nida, Crêpe, Chiffon, Seide | GLAMORA",
    description: "Welcher Stoff für eine Abaya? Nida, Seidenkrepp, Chiffon, Jersey und Satin im Vergleich: Fall, Knitter, Wärme, Anlass – plus Längentabelle in Zoll.",
    h1: "Welcher Stoff für eine Abaya? Nida, Crêpe, Chiffon und Seide im Vergleich",
    lead: "Für festliche Abayas sind Nida und Seidenkrepp die beliebtesten Stoffe: Nida ist leicht, matt und knittert kaum, Seidenkrepp fällt schwerer und wirkt edler. Chiffon wird meist als Überlage oder für Ärmel verwendet, Satin für glänzende Bridal-Abayas.",
    image: "abaya-1",
    published: "2026-10-30",
    modified: "2026-10-30",
    sections: [
      {
        h2: "Welcher Abaya-Stoff eignet sich wofür?",
        table: {
          head: ["Stoff", "Eigenschaften", "Knittert", "Ideal für"],
          rows: [
            ["Nida", "Leicht, matt, weich fallend", "kaum", "Lange Feiern, Reisen, Alltag"],
            ["Seidenkrepp", "Schwerer Fall, edle Haptik", "wenig", "Hochzeit, Nikah, Eid"],
            ["Chiffon", "Transparent, bewegt", "mittel", "Überlagen, Ärmel, Sommer"],
            ["Satin", "Glänzend, festlich", "mittel", "Bridal-Abayas, Abendveranstaltungen"],
            ["Jersey", "Dehnbar, bequem", "kaum", "Alltag"],
          ],
        },
      },
      {
        h2: "Welche Abaya-Länge brauche ich?",
        body: ["Dubai-Abayas werden in Zoll von der Schulter bis zum Saum angegeben. Mit Absatz eine Stufe länger wählen."],
        table: {
          head: ["Körpergröße", "Länge"],
          rows: [["150–155 cm", "52 Zoll"], ["155–160 cm", "54 Zoll"], ["160–165 cm", "56 Zoll"], ["165–170 cm", "58 Zoll"], ["ab 170 cm", "60 Zoll"]],
        },
      },
    ],
    faq: [
      ["Was ist Nida-Stoff?", "Ein leichter, matter Polyesterstoff aus Dubai, der weich fällt und kaum knittert – der Standard für hochwertige Abayas."],
      ["Welcher Abaya-Stoff knittert am wenigsten?", "Nida und Jersey."],
      ["Was kostet eine festliche Abaya?", `Bei GLAMORA in Hamburg ${F.priceAbaya}.`],
    ],
    related: ["abaya-hamburg", "eid-kleid-hamburg"],
  },
  {
    slug: "dubai-groessen-umrechnen",
    title: "Dubai-Größen umrechnen: S bis 5XL, UK und DE im Vergleich | GLAMORA",
    description: "Wie fallen Abendkleider aus Dubai aus? Umrechnungstabelle von Dubai- und UK-Größen in deutsche Größen, plus Tipps zum Maßnehmen.",
    h1: "Dubai-Größen in deutsche Größen umrechnen",
    lead: "Abendkleider aus Dubai sind meist in S bis 5XL oder in UK-Größen angegeben. Als Richtwert entspricht UK 12 der deutschen 40, UK 16 der 44 und UK 20 der 48. Weil die Labels unterschiedlich schneiden, ist Maßnehmen sicherer als die Etikettengröße.",
    image: "curvy-1",
    published: "2026-10-30",
    modified: "2026-10-30",
    sections: [
      {
        h2: "Umrechnungstabelle Dubai – UK – DE",
        table: {
          head: ["Dubai / International", "UK", "DE", "Brust ca. (cm)"],
          rows: [
            ["XS", "6–8", "34–36", "80–84"],
            ["S", "10", "38", "88"],
            ["M", "12", "40", "92"],
            ["L", "14", "42", "96"],
            ["XL", "16", "44", "100"],
            ["XXL", "18", "46", "106"],
            ["3XL", "20", "48", "112"],
            ["4XL", "22–24", "50–52", "118–124"],
            ["5XL", "26", "54", "130"],
          ],
        },
      },
      {
        h2: "Wie messe ich richtig?",
        body: ["Brust an der stärksten Stelle, Taille an der schmalsten, Hüfte an der breitesten Stelle messen – das Maßband locker, nicht straff. Bei Korsagen entscheidet die Brust, bei A-Linien eher die Taille."],
      },
    ],
    faq: [
      ["Fallen Dubai-Kleider klein aus?", "Häufig ja, vor allem Korsagen. Im Zweifel eine Größe größer wählen oder nach Maß bestellen."],
      ["Welche deutsche Größe ist XXL bei Dubai-Kleidern?", "Etwa DE 46 (UK 18)."],
    ],
    related: ["abendkleider-grosse-groessen-hamburg", "abendkleider-hamburg"],
  },
  {
    slug: "abiball-2027-planung",
    title: "Abiball 2027: Wann das Kleid kaufen, Budget, Trends | GLAMORA",
    description: "Abiballkleid 2027: Wann kaufen, was kostet es, welche Farben und Schnitte sind gefragt? Zeitplan, Budget-Tabelle und Tipps für Hamburg.",
    h1: "Abiball 2027: Wann kauft man das Kleid, was kostet es, was ist im Trend?",
    lead: `Das Abiballkleid kauft man am besten 8 bis 12 Wochen vor dem Ball – für Hamburger Abibälle im Juni und Juli also ab März 2027. Ein gutes Ballkleid kostet bei GLAMORA ${F.priceAbiball}; Hamburger Boutiquen liegen meist bei ${F.marketPrice}.`,
    image: "abiball-1",
    published: "2026-10-30",
    modified: "2026-10-30",
    sections: [
      {
        h2: "Wann sollte man das Abiballkleid kaufen?",
        table: {
          head: ["Wann", "Was"],
          rows: [
            ["Januar – Februar 2027", "Inspiration sammeln, Budget festlegen"],
            ["März – April 2027", "Anprobe und Kauf, ggf. Bestellung in Wunschfarbe"],
            ["Mai 2027", "Schuhe, Schmuck, ggf. Saum bei der Änderungsschneiderei"],
            ["Juni – Juli 2027", "Abiball"],
          ],
        },
      },
      {
        h2: "Welche Abiball-Trends gibt es 2027?",
        body: ["Gefragt sind Corsagen mit sichtbaren Stäbchen, schmale Pailletten-Column-Kleider, Tüll-Ballkleider in Pastell sowie Satin-Meerjungfrau-Schnitte. Beliebte Farben: Puderblau, Salbei, Champagner, Silber und Noir."],
      },
      {
        h2: "Wie viel kostet ein Abiballkleid?",
        table: {
          head: ["Budget", "Was man bekommt"],
          rows: [
            ["bis 150 €", "Schlichte Satin- oder Chiffonkleider"],
            ["150 – 300 €", "Pailletten, Corsage, Tüll-Ballkleider"],
            ["300 – 600 €", "Couture mit vollflächiger Stickerei"],
          ],
        },
      },
    ],
    faq: [
      ["Wann sollte man das Abiballkleid kaufen?", "8 bis 12 Wochen vor dem Ball, für Juni/Juli also ab März."],
      ["Was kostet ein Abiballkleid?", `Bei GLAMORA ${F.priceAbiball}.`],
    ],
    related: ["abiballkleider-hamburg", "abendkleid-guenstig-hamburg"],
  },
  {
    slug: "farben-hochzeitsgast",
    title: "Welche Farben darf man als Hochzeitsgast tragen? | GLAMORA",
    description: "Weiß, Creme, Schwarz, Rot: Welche Farben sind für Hochzeitsgäste tabu, welche passen – auch bei türkischen, arabischen und kurdischen Hochzeiten.",
    h1: "Welche Farben darf man als Hochzeitsgast tragen?",
    lead: "Tabu sind Weiß, Ivory, Creme und sehr helles Champagner – sie gehören der Braut. Sicher sind Juwelen- und Pastelltöne wie Salbei, Flieder, Rosé, Bordeaux, Smaragd und Saphir. Schwarz ist bei Abendhochzeiten meist in Ordnung, Rot kann je nach Kultur der Braut vorbehalten sein.",
    image: "hijab-2",
    published: "2026-10-30",
    modified: "2026-10-30",
    sections: [
      {
        h2: "Welche Farben sind für Hochzeitsgäste erlaubt?",
        table: {
          head: ["Farbe", "Als Gast?", "Hinweis"],
          rows: [
            ["Weiß, Ivory, Creme", "Nein", "Brautfarben"],
            ["Champagner (sehr hell)", "Lieber nicht", "Kann auf Fotos weiß wirken"],
            ["Schwarz", "Meist ja", "Abends gut, tagsüber und in manchen Familien zu ernst"],
            ["Rot", "Mit Vorsicht", "Bei Henna-Nacht und in manchen Kulturen Brautfarbe"],
            ["Salbei, Flieder, Rosé", "Ja", "Ideal für Tageshochzeiten"],
            ["Bordeaux, Smaragd, Saphir", "Ja", "Ideal für Abend- und Saalhochzeiten"],
          ],
        },
      },
      {
        h2: "Gelten bei türkischen, arabischen oder kurdischen Hochzeiten andere Regeln?",
        body: ["Bei großen Saalhochzeiten darf es deutlich glänzender sein: Pailletten, Kristall und bodenlange Abendkleider sind üblich. Weiß bleibt tabu; zur Henna-Nacht ist Rot der Braut vorbehalten."],
      },
    ],
    faq: [
      ["Darf man als Hochzeitsgast Creme tragen?", "Nein, Creme und Ivory bleiben der Braut vorbehalten."],
      ["Darf man als Hochzeitsgast Schwarz tragen?", "Bei Abendhochzeiten meist ja, tagsüber und in manchen Familien besser nicht."],
    ],
    related: ["kleid-hochzeitsgast-hamburg", "brautjungfernkleider-hamburg"],
  },
  {
    slug: "was-traegt-man-zur-nikah-henna-nisan",
    title: "Was trägt man zur Nikah, Henna-Nacht und zum Nişan? | GLAMORA",
    description: "Kleiderguide für Nikah, Henna-Nacht (Kına) und Nişan: Farben, Schnitte und Stoffe für Braut und Gäste – mit Übersichtstabelle.",
    h1: "Was trägt man zur Nikah, zur Henna-Nacht und zum Nişan?",
    lead: "Zur Nikah trägt die Braut meist Ivory oder Champagner, hochgeschlossen und mit langen Ärmeln. Zur Henna-Nacht (Kına) traditionell Rot, Bordeaux oder Purpur mit Gold, oft als Samt-Kaftan. Zum Nişan sind Pastell- und Juwelentöne wie Flieder, Rosé oder Smaragd üblich.",
    image: "verlobung-1",
    published: "2026-10-30",
    modified: "2026-10-30",
    sections: [
      {
        h2: "Übersicht: Braut und Gäste",
        table: {
          head: ["Fest", "Braut", "Gäste"],
          rows: [
            ["Nikah", "Ivory, Champagner, Bridal-Abaya, lange Ärmel", "Juwelentöne, Pastell, kein Weiß"],
            ["Henna / Kına", "Rot, Bordeaux, Purpur mit Gold, Samt-Kaftan (Bindallı)", "Smaragd, Gold, Bordeaux"],
            ["Nişan / Verlobung", "Flieder, Rosé, Champagner, Smaragd", "Festliche Farben, kein Weiß"],
            ["Söz", "Pastell, Puder, schlicht", "Elegant, nicht zu festlich"],
          ],
        },
      },
      {
        h2: "Was ist ein Bindallı?",
        body: ["Ein traditionelles türkisches Henna-Kleid aus Samt – meist Rot, Bordeaux oder Purpur – mit aufwendiger Goldstickerei. Die Braut trägt es mit einem roten Schleier zur Kına Gecesi."],
      },
    ],
    faq: [
      ["Welche Farbe trägt die Braut zur Henna-Nacht?", "Traditionell Rot, Bordeaux oder Purpur mit Gold."],
      ["Was trägt man als Gast zur Nikah?", "Hochgeschlossene, festliche Kleidung in Juwelen- oder Pastelltönen, kein Weiß."],
    ],
    related: ["nikah-henna-kleid-hamburg", "verlobungskleid-hamburg"],
  },
];

export const ARTICLE_BY_SLUG = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
