import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = {
  title: { absolute: "Impressum | GLAMORA Hamburg" },
  description: `Impressum von ${SITE.legalName}, ${SITE.street}, ${SITE.zip} ${SITE.city}.`,
  alternates: { canonical: "/impressum" },
};

/* Angaben nach § 5 DDG. Einzelunternehmen ohne Handelsregistereintrag —
 * Pflicht ist der volle Name der Inhaberin; Registerzeile entfällt. */
const LEGAL = {
  owner: "Farsana Alizadah",
  legalForm: "Einzelunternehmen",
  register: null, // nur bei Eintragung (e. K.), z. B. "Amtsgericht Hamburg, HRA 123456"
  vatId: null, // TODO: USt-IdNr. ergänzen, falls vorhanden, z. B. "DE123456789"
};

const h = "font-display text-[24px] text-noir";

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <h2 className={h}>Angaben gemäß § 5 DDG</h2>
      <p>
        {SITE.legalName}
        <br />
        Inhaberin: {LEGAL.owner}
        <br />
        {LEGAL.legalForm}
        <br />
        {SITE.street}
        <br />
        {SITE.zip} {SITE.city}
        <br />
        Deutschland
      </p>
      <h2 className={h}>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>
        <br />
        Telefon: {SITE.phone ?? "[Telefonnummer – bitte ergänzen]"}
      </p>
      {LEGAL.register ? <p>Registereintrag: {LEGAL.register}</p> : null}
      {LEGAL.vatId ? <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {LEGAL.vatId}</p> : null}
      <h2 className={h}>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
      <h2 className={h}>Haftung für Inhalte und Links</h2>
      <p>
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
        Vollständigkeit und Aktualität können wir jedoch keine Gewähr übernehmen. Für Inhalte
        externer Websites, auf die wir verlinken, sind ausschließlich deren Betreiber verantwortlich.
      </p>
    </LegalPage>
  );
}
