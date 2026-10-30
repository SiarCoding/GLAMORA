import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = {
  title: { absolute: "Datenschutzerklärung | GLAMORA Hamburg" },
  description: "Datenschutzerklärung von GLAMORA Hamburg: Hosting, Server-Logs, Kontakt per E-Mail, lokal gehostete Schriften, keine Cookies, Ihre Rechte.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

/* Vorlage — vor dem Livegang von einer fachkundigen Person prüfen lassen und
 * um Hoster, Analytics-Tool o. Ä. ergänzen, sobald etwas davon eingesetzt wird. */
const HOSTER = "[Name und Anschrift des Hosters – bitte ergänzen]";

const h = "font-display text-[24px] text-noir";

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2 className={h}>1. Verantwortliche Stelle</h2>
      <p>
        {SITE.legalName}, {SITE.street}, {SITE.zip} {SITE.city}, E-Mail:{" "}
        <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>
      </p>
      <h2 className={h}>2. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird bei {HOSTER} gehostet. Beim Aufruf werden technisch notwendige Daten
        (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser, Betriebssystem, Referrer) in
        Server-Logfiles verarbeitet, um die Website sicher und stabil bereitzustellen
        (Art. 6 Abs. 1 lit. f DSGVO). Die Logfiles werden nach kurzer Zeit gelöscht.
      </p>
      <h2 className={h}>3. Cookies und Tracking</h2>
      <p>Diese Website setzt keine Cookies und verwendet keine Tracking- oder Analysedienste.</p>
      <h2 className={h}>4. Schriftarten</h2>
      <p>
        Die verwendeten Schriften (Urbanist, Cormorant Garamond) werden lokal von unserem Server
        geladen. Es findet keine Verbindung zu Google Fonts oder anderen Drittanbietern statt.
      </p>
      <h2 className={h}>5. Kontakt per E-Mail{SITE.whatsapp ? " oder WhatsApp" : ""}</h2>
      <p>
        Wenn Sie uns kontaktieren, verarbeiten wir Ihre Angaben (z. B. Name, Anlass, Größe,
        Wunschtermin), um Ihre Anfrage zu beantworten und einen Termin zu vereinbaren
        (Art. 6 Abs. 1 lit. b DSGVO). Die Daten löschen wir, sobald sie nicht mehr benötigt werden
        und keine gesetzlichen Aufbewahrungspflichten bestehen.
      </p>
      <h2 className={h}>6. Links zu Google Maps und sozialen Netzwerken</h2>
      <p>
        Links zu Google Maps oder sozialen Netzwerken sind einfache Verlinkungen. Daten werden erst
        übertragen, wenn Sie den Link anklicken und die jeweilige Seite aufrufen; dort gelten die
        Datenschutzbestimmungen des Anbieters.
      </p>
      <h2 className={h}>7. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
        Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO) sowie das Recht auf Beschwerde bei
        einer Aufsichtsbehörde, in Hamburg beim Hamburgischen Beauftragten für Datenschutz und
        Informationsfreiheit.
      </p>
    </LegalPage>
  );
}
