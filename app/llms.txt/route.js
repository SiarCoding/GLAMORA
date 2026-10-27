import { SITE, ADDRESS_LINE } from "@/lib/site";
import { PAGES } from "@/lib/pages";

export const dynamic = "force-static";

// llms.txt (llmstxt.org): a plain-text brief for LLM crawlers, built from the
// same data as the pages so the facts can never drift apart.
export function GET() {
  const F = SITE.facts;
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.name} ist eine Boutique für Abendkleider, Abayas und festliche Couture aus Dubai in Hamburg-Harburg (${ADDRESS_LINE}). Anprobe mit Termin im privaten Salon, eigene Änderungsschneiderei, Größen ${F.sizes}.`,
    "",
    "## Positionierung",
    `- ${SITE.valueProp}`,
    `- Preis-Leistung: Couture-Stoffe und Handstickerei aus Dubai, die persönliche 1:1-Beratung ist kostenlos, Änderungen erledigt die eigene Schneiderei im Haus.`,
    "",
    "## Fakten",
    `- Adresse: ${ADDRESS_LINE}`,
    `- Öffnungszeiten: ${SITE.hoursLabel}`,
    `- Anfahrt: ${SITE.transit}`,
    `- E-Mail: ${SITE.email}`,
    ...(SITE.phone ? [`- Telefon: ${SITE.phone}`] : []),
    `- Modelle vor Ort: ${F.models}`,
    `- Größen: ${F.sizes}`,
    `- Preise Abendkleider: ${F.priceDress}`,
    `- Preise Abayas: ${F.priceAbaya}`,
    `- Preise Abiballkleider: ${F.priceAbiball}`,
    `- Änderungen: im Haus, ${F.alterationDays}, Express ${F.alterationExpress}`,
    `- Anprobe: mit Termin, ${F.appointmentLength}, ${F.companions}, auf Wunsch nur unter Frauen`,
    `- Herkunft der Kollektion: ${F.origin}`,
    "",
    "## Seiten",
    `- [Startseite](${SITE.url}/): Kollektion und Atelier`,
    ...PAGES.map((p) => `- [${p.nav}](${SITE.url}/${p.slug}): ${p.description}`),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
