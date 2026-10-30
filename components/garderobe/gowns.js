// Gowns on the Garderobe rail, in rail order.
//
// Assets per id (public/abendkleider/):
//   turn/<id>.mp4         side → front turn, colour-matched to the section
//   turn/<id>-side.webp   first frame (poster, rest state)
//   turn/<id>-front.webp  last frame (instant detail preview)
//   <id>-4k.webp          4K front still for the detail view
//
// Geometry is measured from the clips, as fractions of the clip frame
// (width for side/front/…Cx, height for hook):
//   side / sideCx    profile silhouette width + centre (first frame)
//   front / frontCx  front silhouette width + centre (last frame)
//   hook             hook tip from the top — hangs every gown on the rod
//
// color / material feed the Product structured data.
//
// Names and copy are placeholders until the atelier's real product names are
// in. `productUrl: null` = no product page yet; the CTA then books a fitting.
// `price` (number, EUR) — TODO: echten Preis je Robe eintragen → Offer im Schema.
export const GOWNS = [
  {
    id: "olive-perlen-korsett",
    name: "Oliva",
    line: "Korsett-Robe in Olivsatin",
    details: ["Satin-Corsage mit Manschettenausschnitt", "Rock mit Perlen- und Kristallgirlanden", "Bodenlang, schmale Silhouette"],
    color: "Olivgrün", material: "Satin, Perlen, Kristalle",
    side: 0.2528, sideCx: 0.4954, front: 0.4731, frontCx: 0.4991, hook: 0.0073,
    productUrl: null,
  },
  {
    id: "bordeaux-chiffon-schal",
    name: "Rubina",
    line: "Chiffonrobe in Bordeaux mit Schal",
    details: ["Geraffte, trägerlose Corsage", "Kristallborte an Ausschnitt und Taille", "Fließender Schulterschal, Plissee-Chiffon"],
    color: "Bordeaux", material: "Chiffon, Kristalle",
    side: 0.6204, sideCx: 0.5014, front: 0.7343, frontCx: 0.5102, hook: 0.0203,
    productUrl: null,
  },
  {
    id: "navy-perlen-korsett",
    name: "Notte",
    line: "Korsett-Robe in Nachtblau",
    details: ["Satin-Corsage mit Manschettenausschnitt", "Tüllrock, vollflächig perlenbestickt", "Bodenlang, schmale Silhouette"],
    color: "Nachtblau", material: "Satin, Tüll, Perlen",
    side: 0.2676, sideCx: 0.5074, front: 0.4843, frontCx: 0.4963, hook: 0.0047,
    productUrl: null,
  },
  {
    id: "rosa-neckholder",
    name: "Rosé",
    line: "Neckholder-Robe in Blush",
    details: ["Tiefer V-Ausschnitt, Neckholder", "Kristallbesetzter Taillenbund", "Weiter Plissee-Chiffon"],
    color: "Blush-Rosa", material: "Plissee-Chiffon, Kristalle",
    side: 0.512, sideCx: 0.4694, front: 0.6574, frontCx: 0.4968, hook: 0.0193,
    productUrl: null,
  },
  {
    id: "noir-halbmond",
    name: "Luna Noir",
    line: "Drapierte Satinrobe mit Kristall-Halbmond",
    details: ["Stehkragen, lange Ärmel", "Asymmetrische Raffung an der Taille", "Chiffonrock, Kristallornament an der Hüfte"],
    color: "Schwarz", material: "Satin, Chiffon, Kristalle",
    side: 0.2843, sideCx: 0.4963, front: 0.537, frontCx: 0.4903, hook: 0.0083,
    productUrl: null,
  },
  {
    id: "champagner-satin",
    name: "Champagne",
    line: "Satin-Meerjungfrau mit Kristallborten",
    details: ["Fließender Seidensatin", "Kristallborte am Ausschnitt und Schößchen", "Sanfte Schleppe"],
    color: "Champagner", material: "Seidensatin, Kristalle",
    side: 0.6361, sideCx: 0.5944, front: 0.7019, frontCx: 0.5634, hook: 0.0219,
    productUrl: null,
  },
  {
    id: "bordeaux-plissee",
    name: "Bordeaux",
    line: "Plissee-Robe mit Kristallkragen",
    details: ["Feines Satin-Plissee", "Ballonärmel mit Schleifenbündchen", "Kristallkragen und Kristallgürtel"],
    color: "Bordeaux", material: "Satin-Plissee, Kristalle",
    side: 0.2537, sideCx: 0.4986, front: 0.6444, frontCx: 0.4995, hook: 0.0057,
    productUrl: null,
  },
  {
    id: "oliv-chiffon-schal",
    name: "Verde",
    line: "Chiffonrobe in Salbeioliv mit Schal",
    details: ["Geraffte, trägerlose Corsage", "Kristallborte an Ausschnitt und Taille", "Fließender Schulterschal, Plissee-Chiffon"],
    color: "Salbeioliv", material: "Chiffon, Kristalle",
    side: 0.5898, sideCx: 0.5389, front: 0.7176, frontCx: 0.5093, hook: 0.0182,
    productUrl: null,
  },
  {
    id: "salbei-pailletten",
    name: "Salvia",
    line: "Meerjungfrau-Robe in Salbei",
    details: ["Herzausschnitt, perlenbesetzte Neckholder-Träger", "Pailletten, Perlen und Kristalle", "Transparente Cape-Ärmel"],
    color: "Salbeigrün", material: "Pailletten, Perlen, Tüll",
    side: 0.5352, sideCx: 0.5069, front: 0.5972, frontCx: 0.5065, hook: 0.0,
    productUrl: null,
  },
  {
    id: "sand-spitze",
    name: "Sabbia",
    line: "Off-Shoulder-Robe mit Spitzencorsage",
    details: ["Portrait-Kragen, schulterfrei", "Spitzencorsage mit Perlen, spitze Taille", "Weiter Chiffonrock"],
    color: "Sand-Beige", material: "Spitze, Perlen, Chiffon",
    side: 0.5398, sideCx: 0.4963, front: 0.775, frontCx: 0.4963, hook: 0.0193,
    productUrl: null,
  },
  {
    id: "rosa-floral-korsett",
    name: "Fiore",
    line: "Blüten-Corsage in Rosé",
    details: ["Corsage mit 3D-Blütenapplikationen", "Transparenter Chiffon-Schal", "Weiter, bodenlanger Chiffonrock"],
    color: "Rosé", material: "Blütenapplikationen, Chiffon",
    side: 0.5417, sideCx: 0.5139, front: 0.7157, frontCx: 0.5028, hook: 0.0177,
    productUrl: null,
  },
  {
    id: "ivory-drapee",
    name: "Perla",
    line: "Drapierte Corsage in Ivory",
    details: ["Gerafftes Satin-Bustier", "Bodenlanger Plissee-Chiffon", "Zarte transparente Träger"],
    color: "Ivory", material: "Satin, Plissee-Chiffon",
    side: 0.3898, sideCx: 0.4833, front: 0.5259, frontCx: 0.5579, hook: 0.0057,
    productUrl: null,
  },
];
