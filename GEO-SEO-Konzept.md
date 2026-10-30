# GLAMORA – GEO- & SEO-Konzept (lokal Hamburg)

Stand: 27.10.2026 · Branch `seo-unterseiten` (Commit `096bb84`)
Ziel: In Hamburg bei Google (Local Pack + organisch) und in KI-Antworten (ChatGPT, Gemini, Perplexity, Claude, Copilot) als erste Adresse für **Abendkleider, Abayas und hijabtaugliche Abendmode** genannt werden – mit dem Argument **Couture-Qualität aus Dubai zum fairen Preis**.

---

## 1. Ausgangslage

### 1.1 Was die KIs heute antworten

Auf „bestes Abendkleider-Geschäft Hamburg“ nennen Gemini und ChatGPT (Oktober 2026):

| Rang | Geschäft | Warum die KI es nennt |
|---|---|---|
| 1 | BALAYI (Rothenburgsort) | Harte Zahlen: 4.000+ Kleider, 70+ Marken, Meisterschneiderei, 24h-Express, Plus Size, Preise 150 € bis 1.000 €+ |
| 1 (ChatGPT) | VIVIRY (Innenstadt) | 4,9 ★ bei **703 Google-Bewertungen**, ohne Termin, Preise 239–349 € |
| 2–5 | Ava Dress, Farahnaz, Gerda Gregor, Ella Deck, P&C, Secondella | Bewertungen, klare Nische (Couture, ohne Termin, Second-Hand), Lage |

**Erkenntnis:** Die KIs empfehlen nicht die schönste Website, sondern die Läden mit
1. **zählbaren Fakten** (Anzahl Kleider, Marken, Preise, Service-Zeiten),
2. **vielen Bewertungen** im Google- bzw. Bing-Profil,
3. **einer klaren Rolle** („für maximale Auswahl“, „ohne Termin“, „Couture“, „Second-Hand“).

Im Moment kommt GLAMORA in keiner Antwort vor: Es gibt noch kein Unternehmensprofil, keine Bewertungen und keine Live-Website.

### 1.2 Unsere Lücke im Markt (aus der Konkurrenzanalyse)

| Suchanfrage | Wer rankt heute | Chance für GLAMORA |
|---|---|---|
| Abaya Hamburg / Abaya Laden Hamburg | Nur Instagram, TikTok, Online-Shops. **Kein Ladengeschäft mit eigener Seite** | ⭐⭐⭐ sehr hoch |
| Hijab-Abendkleid / Modest Fashion Hamburg | Niemand mit eigener Seite | ⭐⭐⭐ sehr hoch |
| Verlobungskleid / Nikah / Henna Hamburg | Nur Social Media | ⭐⭐⭐ hoch |
| Abendkleider Harburg | Branchenbuch mit 3 Einträgen, Yelp | ⭐⭐⭐ hoch |
| Abendkleider große Größen Hamburg | Keine lokale Seite | ⭐⭐ hoch |
| Abiballkleider Hamburg | Yelp, schwache Seiten | ⭐⭐ mittel |
| Abendkleider Hamburg | VIVIRY, Tempel, Salon, Azazie, hamburg.de | ⭐ schwer, langfristig |

**Unsere Rolle in KI-Antworten** (so soll eine KI uns beschreiben):

> „Für Abayas und hijabtaugliche Abendmode sowie Couture-Abendkleider aus Dubai zu fairen Preisen ist **GLAMORA in Hamburg-Harburg** die erste Adresse: Abendkleider ab 70 €, Abayas 70–150 €, Größen 34–54, private Anprobe auf Wunsch nur unter Frauen, eigene Schneiderei.“

Jede Maßnahme unten zahlt auf diesen Satz ein.

---

## 2. Was bereits umgesetzt ist (Website)

### 2.1 Unterseiten (10 Stück)

| URL | Haupt-Keyword | Szenen |
|---|---|---|
| `/abendkleider-hamburg` | Abendkleider Hamburg | 2 |
| `/abaya-hamburg` | Abaya Hamburg, Abaya Laden | 2 |
| `/abendmode-geschaeft-hamburg` | Abendmode-Geschäft Hamburg | 2 |
| `/abiballkleider-hamburg` | Abiballkleider Hamburg 2027 | 2 |
| `/verlobungskleid-hamburg` | Verlobung, Nikah, Henna, Nişan | 2 |
| `/hijab-abendkleider-hamburg` | Hijab-Abendkleid, Modest Fashion | 2 |
| `/abendkleider-grosse-groessen-hamburg` | Curvy, Plus Size | 2 |
| `/abendkleider-harburg` | Harburg + Umland | 2 |
| `/termin` | Anprobe-Termin | 2 |
| `/ueber-uns` | Marke, Fakten | 2 |

Jede Seite folgt demselben Aufbau:
- eigener Title, Meta-Description, Keywords, Canonical, Open-Graph-Bild,
- H1 mit Keyword, danach eine **Answer-First-Einleitung** mit Zahlen,
- **Faktenbox** (Preise, Größen, Adresse, Termin, Änderungsdauer),
- Positionierungssatz „Couture aus Dubai zu fairen Preisen … Marktvergleich 240 € bis über 1.000 €“,
- H2 als echte Nutzerfragen, dazu **Vergleichstabellen**,
- 5 bis 8 FAQs mit **FAQPage-Schema**,
- Besuchsblock mit Adresse, Anfahrt und Öffnungszeiten, interne Links auf verwandte Seiten.

### 2.2 Technik

| Bereich | Stand |
|---|---|
| Schema.org | `ClothingStore` (Adresse, Geo, Öffnungszeiten, Preisspanne, areaServed, knowsAbout, slogan), `WebSite`, je Seite `WebPage`, `BreadcrumbList`, `FAQPage` |
| `robots.txt` | Alle Crawler erlaubt, KI-Bots ausdrücklich (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, Bingbot …) |
| `sitemap.xml` | Startseite + 10 Unterseiten |
| `llms.txt` | Positionierung, alle Fakten, Liste aller Seiten, automatisch aus denselben Daten |
| NAP-Daten | Zentral in `lib/site.js`; Website, Schema und `llms.txt` lesen nur von dort |
| Adresse | Überall „Lüneburger Straße 33, 21073 Hamburg“, „Neuer Wall“ entfernt |
| Navigation/Footer | Verlinken alle Unterseiten |
| Schrift | Urbanist + Cormorant (Wortmarke), lokal gehostet, DSGVO-konform |
| Performance | Scroll-Frames laden erst kurz vor der Sektion (lazy), Studio-Sequenzen 3–10 MB |

---

## 3. Was vor dem Live-Gang zwingend fehlt

Ohne diese Punkte bringt alles Weitere wenig oder ist rechtlich riskant.

| # | Aufgabe | Warum | Wo |
|---|---|---|---|
| 1 | **Platzhalter-Fakten durch echte ersetzen**: Modellanzahl („über 300“), Größen 34–54, Änderungsdauer, Express 48 h, Öffnungszeiten, Begleitpersonen | KIs zitieren diese Zahlen wörtlich. Falsche Angaben = Abmahnrisiko und Vertrauensverlust | `lib/site.js` |
| 2 | **Telefonnummer** eintragen (und WhatsApp, Instagram) | NAP braucht ein „P“. Ohne Telefon kein vollständiges Google-Profil | `lib/site.js` → `phone`, `whatsapp`, `instagram` |
| 3 | **Domain festlegen** (aktuell angenommen: `glamora.hamburg`) | Canonicals, Sitemap, Schema hängen daran | `lib/site.js` → `url` |
| 4 | **Impressum + Datenschutzerklärung** als echte Seiten | Pflicht (DDG/DSGVO), außerdem Vertrauenssignal für Google | Footer-Links sind noch `#` |
| 5 | **Versprechen prüfen**: „Anprobe nur unter Frauen“, „kein Abiballmodell doppelt pro Schule“, „Bestellung aus Dubai 4–6 Wochen“, „Couture-Verarbeitung“ | Werbeaussagen müssen stimmen (UWG) | `lib/pages.js` |
| 6 | **Preisvergleich absichern**: „vergleichbare Kleider 240 € bis über 1.000 €“ | Vergleichende Werbung muss belegbar sein. Quelle: Websites von VIVIRY, Tempel, Salon (Okt. 2026). Screenshots als Beleg ablegen | `lib/site.js` → `marketPrice` |
| 7 | **Startseite: H1 + Faktentext** ergänzen | Die Startseite hat **keine H1** und keinen Satz mit Fakten. Google und KIs sehen dort nur Inszenierung | siehe 4.1 |
| 8 | **Cookie-/Consent-Lösung**, falls Analytics oder Maps eingebunden werden | DSGVO | – |

---

## 4. Website: weitere Optimierung (On-Page)

### 4.1 Startseite (höchste Priorität)

- **H1 einfügen**, z. B. „Abendkleider & Abayas in Hamburg – Couture aus Dubai“. Sie darf optisch klein sein, etwa als Eyebrow über dem Film-Hero, muss aber als `<h1>` im HTML stehen.
- **Faktenblock** unter dem Hero oder vor dem Footer, als sichtbarer Text:
  > „GLAMORA in Hamburg-Harburg (Lüneburger Straße 33) führt [X] Abendkleider und Abayas aus Dubai in den Größen [34–54]. Abendkleider kosten 70–600 €, Abayas 70–150 €. Anprobe mit Termin, eigene Schneiderei, Änderungen in [5–10] Werktagen.“
- **Kurz-FAQ** (4–5 Fragen) mit FAQPage-Schema auf der Startseite.
- **Links in den Inhaltsbereich**: In Showroom und Garderobe direkt auf `/abaya-hamburg`, `/abendkleider-hamburg` und `/hijab-abendkleider-hamburg` verlinken, nicht nur über das Menü.
- Wortmarke in `components/HeroSequence.jsx` (Zeile ~126) nutzt `font-display` und wird damit in Urbanist gesetzt → auf `font-brand` umstellen, falls sie wie das Logo aussehen soll.

### 4.2 Fehlende Unterseiten (nach Priorität)

**Stufe A – Anlässe Hamburg (nächste 4 Wochen)**

| URL | Keyword | Grund |
|---|---|---|
| `/kleid-hochzeitsgast-hamburg` | Kleid Hochzeitsgast Hamburg | Hohe Nachfrage, VIVIRY/Salon nur mit Kollektionsseiten |
| `/brautjungfernkleider-hamburg` | Brautjungfernkleider Hamburg | Gruppen-Käufe, hoher Warenkorb |
| `/ballkleider-gala-hamburg` | Ballkleid / Gala Hamburg | Opernball, Presseball, Galas |
| `/nikah-henna-kleid-hamburg` | Nikah-Kleid, Kına-/Henna-Kleid | Eigene Suchintention, bisher Teil der Verlobungsseite |
| `/abendkleid-leihen-hamburg` | Abendkleid leihen Hamburg | Laut Social Media hohe Nachfrage. **Nur anlegen, wenn ihr verleiht** |

**Stufe B – Einzugsgebiet Süden & Norddeutschland (Monat 2–3)**

Je eine Seite pro Ort, mit **echtem** Inhalt (Anfahrt, Fahrzeit, Parken, „Anprobe + Änderung an einem Tag“), keine Copy-Paste-Seiten:
`/abendkleider-lueneburg`, `/abendkleider-buxtehude`, `/abendkleider-stade`, `/abendkleider-winsen`, `/abendkleider-seevetal-buchholz`, später `/abendkleider-bremen`, `/abendkleider-hannover`, `/abendkleider-kiel-luebeck`.

**Stufe C – Long-Tail & Ratgeber (ab Monat 2, laufend)**

Ratgeber nach dem GEO-Muster: H2 als Frage, 2–3 Sätze mit Zahlen als Antwort, Tabelle, FAQ, Link zur passenden Landingpage.

| Ratgeber | Ziel-Frage |
|---|---|
| Dresscode Elbphilharmonie & Staatsoper | „Was trägt man in der Elbphilharmonie?“ |
| Dresscode Hotel Atlantic, Fontenay, Presseball | „Welches Kleid für eine Gala in Hamburg?“ |
| Abaya-Ratgeber: Nida, Crêpe, Chiffon | „Welcher Stoff für eine Abaya?“ |
| Was trägt man zur Nikah / Henna-Nacht / Nişan? | Kulturelle Anlässe, wenig Konkurrenz |
| Dubai-Größen in deutsche Größen umrechnen | „Wie fallen Dubai-Größen aus?“ |
| Abiball 2027: wann kaufen, Budget, Trends | „Wann Abiballkleid kaufen?“ |
| Abendkleid ab Größe 44: Schnitte | „Welcher Schnitt bei Kurven?“ |
| Abendkleid kürzen: Kosten & Dauer in Hamburg | „Was kostet Abendkleid kürzen?“ |
| Farben für Hochzeitsgäste: Was ist erlaubt? | „Darf man als Gast Creme tragen?“ |

Technisch: als weitere Einträge in `lib/pages.js` oder als eigene Route `/ratgeber/[slug]` mit `Article`-Schema (Autor, Datum, `dateModified`).

### 4.3 Technische Feinheiten

| Aufgabe | Nutzen |
|---|---|
| **Echte Produktfotos** mit `<img>` und Alt-Text („Smaragdgrünes Satin-Abendkleid mit Kristallkorsage, GLAMORA Hamburg“) in jede Unterseite | Google Bilder-Suche, Google Lens, KIs mit Bildverständnis. Die Canvas-Animationen zählen für Google nicht als Bilder |
| `Product`-/`Offer`-Schema für echte Modelle (Name, Farbe, Größen, Preis, Verfügbarkeit) | Rich Results, Merchant Listings, „Abendkleid Größe 48 unter 200 €“ |
| Bild-Sitemap bzw. `images` in `sitemap.js` | Indexierung der Produktbilder |
| `sameAs` im Schema befüllen (Instagram, TikTok, Google-Profil-Link, Yelp, hamburg.de-Eintrag) | Entitäts-Verknüpfung, KIs erkennen „das ist dieselbe Marke“ |
| `dateModified` und sichtbares „Stand: Monat Jahr“ auf Ratgebern | Aktualitätssignal, vor allem für Perplexity und ChatGPT |
| **Core Web Vitals** am Live-Server messen (PageSpeed Insights). Mobil ggf. 60 statt 120 Frames, AVIF statt WebP | Ranking-Faktor, Absprungrate |
| **IndexNow** (Bing, Yandex) per Ping bei neuen Seiten | ChatGPT und Copilot nutzen den Bing-Index, schnellere Aufnahme |
| Startseiten-Title und -Description bei Bedarf nachschärfen, Open-Graph-Bild für die Startseite ergänzen | Klickrate, Social Sharing |
| 404-Seite mit Links auf die Kernseiten | Crawl- und Nutzerführung |

---

## 5. Lokales SEO außerhalb der Website (Off-Page)

> Für Google Maps, Gemini und die ChatGPT-Kartenansicht ist das **Unternehmensprofil wichtiger als die Website**.

### 5.1 Google Unternehmensprofil (Woche 1)

- **Name exakt** wie auf der Website: `GLAMORA` (keine Keywords im Namen, das verstößt gegen Googles Richtlinien und führt zur Sperre).
- **Hauptkategorie** sinngemäß „Abendmode/Damenbekleidung“ aus der Google-Liste wählen, Nebenkategorien z. B. Brautmoden, Änderungsschneiderei. Exakte Namen in der Kategorieauswahl prüfen.
- **Adresse, Telefon, Website, Öffnungszeiten** zeichengenau wie in `lib/site.js`.
- **Beschreibung** (750 Zeichen) mit den Fakten aus der Faktenbox und dem Positionierungssatz.
- **Produkte**: Kategorien „Abendkleider“, „Abayas“, „Hijab-Abendkleider“, „Abiballkleider“, jeweils mit Fotos, Preisspanne und Link auf die Unterseite.
- **Leistungen**: Anprobe mit Termin, Änderungsschneiderei, Express-Änderung, Maßbestellung aus Dubai.
- **Attribute**: Termin empfohlen, barrierefreier Eingang (nur falls zutreffend), Zahlungsarten.
- **Fotos**: mindestens 20 echte Fotos (Laden außen mit Hausnummer, Schaufenster, Innenraum, Kleider, Team). Danach jede Woche neue.
- **Beiträge**: wöchentlich einen Beitrag (neue Lieferung, Abiball-Saison, Eid-Kollektion).
- **Fragen & Antworten**: die FAQ-Fragen der Website selbst einstellen und beantworten.
- **Terminlink** auf `/termin`.

### 5.2 Weitere Profile (Woche 1–2, alle mit identischem NAP)

| Plattform | Warum |
|---|---|
| **Bing Places** | Datenquelle für ChatGPT und Copilot |
| **Apple Business Connect** | Apple Maps, Siri, Apple Intelligence |
| **hamburg.de Branchenbuch** | Rankt selbst auf „Abendkleider Hamburg“, unter „Harburg“ nur 3 Einträge |
| **Yelp** | Rankt für „abendkleider harburg“, wird von KIs als Bewertungsquelle genutzt |
| Das Örtliche, Gelbe Seiten, 11880, GoLocal, Cylex | Zitate (Citations) für die NAP-Konsistenz |
| Facebook-Seite, Instagram, TikTok, Pinterest | Social Signals, `sameAs`, Bildersuche |
| Hochzeits- und Brautportale (regionale Dienstleisterlisten) | Verlobung, Nikah, Brautjungfern |

Eine **Tabelle aller Einträge** (Plattform, Login, NAP geprüft am) führen, damit Änderungen überall nachgezogen werden.

### 5.3 Bewertungen (der wichtigste Hebel)

VIVIRY gewinnt mit 703 Bewertungen. Ziel für GLAMORA: **50 Bewertungen in 3 Monaten, 150 in 12 Monaten**.

- QR-Aufsteller in der Umkleide und an der Kasse, Karte in jeder Kleidertüte, Link in der Abholbestätigung (WhatsApp/E-Mail).
- Kundinnen bitten, **konkret** zu schreiben, was sie gekauft haben und wofür. Erlaubt ist eine Bitte, keine Vorformulierung: „Erzählen Sie gern, für welchen Anlass Sie Ihr Kleid gefunden haben.“ So entstehen Texte mit „Abaya“, „Abiball“, „große Größe“, „Harburg“.
- **Nicht erlaubt** (Google-Richtlinien, UWG): Rabatte oder Geschenke für Bewertungen, nur zufriedene Kundinnen fragen (Review-Gating), eigene oder gekaufte Bewertungen.
- **Jede Bewertung beantworten**, in der Antwort natürlich Anlass und Ort erwähnen.
- Auch auf Yelp und Bing um Bewertungen bitten, sobald Google läuft.

### 5.4 Erwähnungen, Bestenlisten, Presse (Monat 1–6)

KIs übernehmen, was viele unabhängige Quellen gemeinsam sagen.

| Ziel | Vorgehen |
|---|---|
| Hamburger Bestenlisten („die besten Abendkleider-Läden Hamburg“) | Monatlich die Listen suchen, die Google, ChatGPT und Perplexity zitieren, und die Redaktionen anschreiben (Mit Vergnügen Hamburg, Geheimtipp Hamburg, Szene Hamburg, Stadtmagazine) |
| Lokalpresse Harburg & Hamburg | Aufhänger: „Erster Abaya-Laden mit Anprobe in Hamburg“, „Dubai-Couture in Harburg“ |
| Mode- und Modest-Fashion-Creator aus Hamburg | Einladung zur Anprobe, ehrliche Vorstellung, Werbung kennzeichnen |
| Schulen / Abi-Komitees im Süden Hamburgs | Abiball-Kooperation, Komitees bekommen Termine für Gruppen |
| Hochzeitsplaner, Henna-Artists, Hochzeitslocations | Gegenseitige Empfehlungen, Verlinkung auf Partnerseiten |
| Reddit / Foren | Nur echte, ehrliche Beiträge, wenn gefragt. Kein Astroturfing |

### 5.5 Social Media für lokale Nischen

Bei „Abaya Hamburg“ und „Verlobungskleid Hamburg“ ranken heute **Instagram- und TikTok-Profile auf Platz 1–3**.
- Profilname und Bio: „GLAMORA · Abendkleider & Abayas · Hamburg-Harburg“, Adresse und Link.
- Hashtags: #abayahamburg #abendkleidhamburg #harburg #verlobungskleid #nikah #modestfashion #hijabfashion #abiball2027.
- Formate: Anprobe-Reels (mit Einverständnis), „neue Lieferung aus Dubai“, Kleid von allen Seiten, Preis im Video nennen.

---

## 6. GEO speziell: wie wir die KIs füttern

| KI | Hauptquelle | Unsere Maßnahme | Status |
|---|---|---|---|
| ChatGPT / Copilot | Bing-Index, Bing Places, Webseiten | Bing Places, Bing Webmaster Tools, IndexNow, `robots.txt` erlaubt OAI-SearchBot | Website ✅, Rest offen |
| Gemini / AI Overviews | Google-Index, Unternehmensprofil, Bewertungen, Schema | Unternehmensprofil, Bewertungen, FAQPage, Faktenboxen | Website ✅, Profil offen |
| Perplexity | Live-Websuche, Tabellen, Foren, Vergleichsseiten | Ratgeber mit Tabellen, Bestenlisten, Erwähnungen | Tabellen ✅, Ratgeber offen |
| Claude | Websuche, redaktionelle Quellen | Über-uns mit Fakten, Presse | ✅ / offen |
| Apple Intelligence / Siri | Apple Maps | Apple Business Connect | offen |

**Regeln für jeden Text auf der Website:**
1. Erster Absatz beantwortet die Frage mit **Zahlen** (Preis, Größe, Dauer, Ort).
2. Fakten sind **überall identisch** (eine Quelle: `lib/site.js`).
3. Mindestens eine **Tabelle** pro Seite.
4. **Fragen als Überschriften**, so wie Menschen sie in den Chat tippen.
5. Keine Floskeln ohne Information („unvergessliche Momente“).
6. Ort immer mitnennen: „in Hamburg-Harburg“, „Lüneburger Straße 33“.

---

## 7. Messen und nachsteuern

### 7.1 Werkzeuge

| Werkzeug | Zweck |
|---|---|
| Google Search Console | Indexierung, Suchanfragen, Klicks, Sitemap einreichen |
| Bing Webmaster Tools | Bing-Index (Basis für ChatGPT), IndexNow |
| Statistik im Google-Profil | Aufrufe, Anrufe, Routenanfragen, Suchbegriffe |
| Datensparsame Webanalyse (z. B. Plausible, Matomo ohne Cookies) | Besucher, Termin-Klicks, DSGVO-freundlich |
| Rank-Tracking lokal (z. B. Local Falcon, BrightLocal) | Position im Local Pack rund um Harburg |

### 7.2 Monatlicher KI-Test

Jeden Monat dieselben Fragen in ChatGPT (mit Websuche), Gemini, Perplexity, Claude und Copilot stellen und in einer Tabelle festhalten: genannt ja/nein, Position, zitierte Quelle.

1. „Ich suche das beste Abendkleider-Geschäft in Hamburg. Gib mir die Top-Empfehlung.“
2. „Wo kann ich in Hamburg eine Abaya anprobieren?“
3. „Abendkleid Größe 48 unter 300 Euro in Hamburg?“
4. „Hijab-taugliches Abendkleid für eine Hochzeit in Hamburg kaufen?“
5. „Verlobungskleid oder Nikah-Kleid in Hamburg?“
6. „Abendkleider in Harburg oder in der Nähe von Lüneburg?“
7. „Günstige, aber hochwertige Abiballkleider in Hamburg?“

### 7.3 Ziele (KPIs)

| Zeitraum | Ziel |
|---|---|
| Monat 1 | Alle Profile live, Website indexiert, 15+ Bewertungen |
| Monat 3 | Top 3 bei Google für „Abaya Hamburg“, „Abendkleider Harburg“, „Hijab Abendkleid Hamburg“. In mindestens 2 KIs bei Frage 2 und 4 genannt. 50 Bewertungen |
| Monat 6 | Local Pack für „Abendkleider Hamburg“ im Süden Hamburgs. In 3+ KIs bei Frage 1 als Alternative genannt. 2–3 Bestenlisten-Erwähnungen |
| Monat 12 | Top-Empfehlung für Abaya/Modest in allen KIs. 150 Bewertungen. Seiten für Norddeutschland ranken |

---

## 8. Fahrplan

### Woche 1 – Basis
- [ ] Echte Fakten, Telefon, Domain in `lib/site.js` eintragen
- [ ] Impressum und Datenschutz anlegen
- [ ] Startseite: H1, Faktenblock, Kurz-FAQ
- [ ] Branch `seo-unterseiten` nach `main` mergen, live schalten
- [ ] Google Unternehmensprofil komplett anlegen, Verifizierung anstoßen
- [ ] Search Console + Bing Webmaster Tools verifizieren, Sitemap einreichen

### Woche 2 – Profile & Bewertungen
- [ ] Bing Places, Apple Business Connect, hamburg.de, Yelp, Das Örtliche, Gelbe Seiten
- [ ] `sameAs`-Links ins Schema eintragen
- [ ] QR-Aufsteller und Bewertungskarten drucken, Ablauf mit dem Team festlegen
- [ ] 20+ echte Fotos in Google und auf die Website

### Woche 3 – Inhalte
- [ ] Echte Produktfotos mit Alt-Text auf die Unterseiten
- [ ] Neue Seiten: Hochzeitsgast, Brautjungfern, Nikah/Henna
- [ ] Erste Instagram- und TikTok-Reels mit lokalen Hashtags

### Woche 4 – Autorität
- [ ] Bestenlisten recherchieren, Redaktionen anschreiben
- [ ] Lokalpresse Harburg mit dem Aufhänger „Abaya-Laden mit Anprobe“
- [ ] Erste zwei Ratgeber (Elbphilharmonie-Dresscode, Abaya-Stoffe)
- [ ] Erster KI-Test, Ergebnisse dokumentieren

### Monat 2–3
- [ ] Seiten für das Umland (Lüneburg, Buxtehude, Stade, Winsen, Seevetal)
- [ ] `Product`-Schema für echte Modelle
- [ ] Wöchentlich Google-Beiträge, monatlich 2 Ratgeber
- [ ] Core Web Vitals am Live-Server prüfen, Frames ggf. reduzieren

### Monat 4–12
- [ ] Seiten für Bremen, Hannover, Kiel/Lübeck
- [ ] Long-Tail-Seiten (Farbe + Stoff + Anlass), sobald echtes Sortiment fotografiert ist
- [ ] Kooperationen mit Schulen, Hochzeitsplanern, Creatorn
- [ ] Optional: „Online reservieren“ für einzelne Modelle als Vorstufe zum Shop

---

## 9. Dateien im Projekt

| Datei | Inhalt |
|---|---|
| `lib/site.js` | NAP, Öffnungszeiten, Fakten, Preise, Positionierung, `ClothingStore`-Schema |
| `lib/pages.js` | Inhalte aller Unterseiten (Texte, Tabellen, FAQ, Szenen) |
| `components/seiten/LandingPage.jsx` | Seitenaufbau, `WebPage`-/`Breadcrumb`-/`FAQPage`-Schema |
| `app/[slug]/page.js` | Routen und Meta-Tags |
| `app/robots.js`, `app/sitemap.js`, `app/llms.txt/route.js` | Crawler-Steuerung |
| `app/layout.js` | Globale Meta-Daten, `WebSite`-Schema |
| `app/globals.css` | Schriften (lokal) |

Neue Fakten oder Preise immer nur in `lib/site.js` ändern. Dann stimmen Website, Schema und `llms.txt` automatisch überein.
