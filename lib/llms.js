import { SITE, ADDRESS_LINE, AREA, SAME_AS } from "@/lib/site";
import { pagesFor, absolute } from "@/lib/registry";
import { ARTICLES } from "@/lib/ratgeber";
import { HOME_FAQ } from "@/components/HomeFacts";

/* llms.txt (llmstxt.org) + llms-full.txt, built from the same data as the
 * pages so the facts can never drift apart. */

const F = SITE.facts;

function factLines() {
  return [
    `- Adresse: ${ADDRESS_LINE}`,
    `- Öffnungszeiten: ${SITE.hoursLabel}`,
    `- Anfahrt: ${SITE.transit}`,
    `- E-Mail: ${SITE.email}`,
    ...(SITE.phone ? [`- Telefon: ${SITE.phone}`] : []),
    ...(SITE.whatsapp ? [`- WhatsApp: ${SITE.whatsapp}`] : []),
    `- Modelle vor Ort: ${F.models}`,
    `- Größen: ${F.sizes}`,
    `- Preise Abendkleider: ${F.priceDress}`,
    `- Preise Abayas: ${F.priceAbaya}`,
    `- Preise Abiballkleider: ${F.priceAbiball}`,
    `- Anprobe: mit Termin, kostenlos, ${F.appointmentLength}, ${F.companions}, auf Wunsch nur unter Frauen`,
    `- Nicht vorrätige Größen/Farben: Bestellung aus Dubai, ${F.orderDubai}`,
    `- Änderungsschneiderei: keine eigene`,
    `- Herkunft der Kollektion: ${F.origin}`,
    `- Neue Modelle: ${F.newArrivals}`,
    `- Einzugsgebiet: Hamburg, ${AREA.districts.join(", ")}, ${AREA.towns.join(", ")}`,
    ...(SAME_AS.length ? [`- Profile: ${SAME_AS.join(", ")}`] : []),
  ];
}

const pageLink = (p) => `- [${p.nav}](${absolute(p.path)}): ${p.description}`;

export function llmsTxt() {
  return [
    `# ${SITE.brandLocal}`,
    "",
    `> ${SITE.name} ist eine Boutique für Abendkleider, Abayas und festliche Couture aus Dubai in Hamburg-Harburg (${ADDRESS_LINE}). Über ${F.models.replace("über ", "")} Modelle in Größen ${F.sizes}, Abendkleider ${F.priceDress}, Abayas ${F.priceAbaya}. Anprobe mit Termin im privaten Salon, auf Wunsch nur unter Frauen.`,
    "",
    "## Positionierung",
    `- ${SITE.valueProp}`,
    "- Schwerpunkte: Abendkleider, Dubai-Abayas, Hijab-/Modest-Abendkleider (tesettür abiye), Abiball, Verlobung/Nişan, Nikah, Henna/Kına, Hochzeitsgäste, große Größen.",
    "- Die persönliche 1:1-Beratung ist kostenlos und unverbindlich.",
    "",
    "## Fakten",
    ...factLines(),
    "",
    "## Seiten (Deutsch)",
    `- [Startseite](${SITE.url}/): Kollektion, Fakten und FAQ`,
    ...pagesFor("de").map(pageLink),
    "",
    "## Sayfalar (Türkçe)",
    ...pagesFor("tr").map(pageLink),
    "",
    "## الصفحات (العربية)",
    ...pagesFor("ar").map(pageLink),
    "",
    "## Ratgeber",
    ...ARTICLES.map((a) => `- [${a.h1}](${SITE.url}/ratgeber/${a.slug}): ${a.description}`),
    "",
    "## Häufige Fragen",
    ...HOME_FAQ.flatMap(([q, a]) => [`- **${q}** ${a}`]),
    "",
    "## Optional",
    `- [Vollständiger Text aller Seiten](${SITE.url}/llms-full.txt)`,
    "",
  ].join("\n");
}

const tableMd = (t) => [
  `| ${t.head.map((h) => h || " ").join(" | ")} |`,
  `| ${t.head.map(() => "---").join(" | ")} |`,
  ...t.rows.map((r) => `| ${r.join(" | ")} |`),
];

function pageMd(title, url, lead, facts, sections, faq) {
  return [
    `## ${title}`,
    `URL: ${url}`,
    "",
    lead,
    "",
    ...(facts?.length ? [...facts.map(([k, v]) => `- ${k}: ${v}`), ""] : []),
    ...sections.flatMap((s) => [
      `### ${s.h2}`,
      ...(s.body || []).flatMap((p) => [p, ""]),
      ...(s.table ? [...tableMd(s.table), ""] : []),
    ]),
    ...(faq?.length ? ["### FAQ", ...faq.map(([q, a]) => `- **${q}** ${a}`), ""] : []),
  ];
}

export function llmsFullTxt() {
  const pages = ["de", "tr", "ar"].flatMap((l) => pagesFor(l));
  return [
    `# ${SITE.brandLocal} – vollständiger Inhalt`,
    "",
    `Stand: ${SITE.updated}`,
    "",
    ...factLines(),
    "",
    ...pages.flatMap((p) => pageMd(p.h1, absolute(p.path), p.lead, p.facts, p.sections, p.faq)),
    ...ARTICLES.flatMap((a) =>
      pageMd(a.h1, `${SITE.url}/ratgeber/${a.slug}`, a.lead, null, a.sections, a.faq)
    ),
  ].join("\n");
}
