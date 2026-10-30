import { SITE } from "@/lib/site";
import { ALL_PAGES, hreflangOf, absolute } from "@/lib/registry";
import { ARTICLES } from "@/lib/ratgeber";
import { ogImage } from "@/components/seiten/LandingPage";

export const dynamic = "force-static";

/* Hand-written sitemap: Next 14's sitemap.js cannot emit image entries, which
 * we want for Google Images / Lens. Includes reciprocal hreflang per URL.
 * lastmod is fixed (SITE.updated / article.modified) — a date that changes on
 * every build is ignored by Google. Bump SITE.updated when content changes. */

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function entry({ loc, lastmod, changefreq, priority, languages, images = [] }) {
  return [
    "<url>",
    `<loc>${esc(loc)}</loc>`,
    ...Object.entries(languages || {}).map(
      ([l, p]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${esc(absolute(p))}"/>`
    ),
    ...images.map(([src, title]) => `<image:image><image:loc>${esc(src)}</image:loc>${title ? `<image:title>${esc(title)}</image:title>` : ""}</image:image>`),
    `<lastmod>${lastmod}</lastmod>`,
    `<changefreq>${changefreq}</changefreq>`,
    `<priority>${priority}</priority>`,
    "</url>",
  ].join("");
}

export function GET() {
  const low = new Set(["termin", "ueber-uns"]);
  const urls = [
    entry({
      loc: SITE.url,
      lastmod: SITE.updated,
      changefreq: "weekly",
      priority: 1,
      images: [[`${SITE.url}/og/home.jpg`, "GLAMORA Hamburg – Boutique für Abendkleider und Abayas"]],
    }),
    ...ALL_PAGES.map((p) =>
      entry({
        loc: absolute(p.path),
        lastmod: SITE.updated,
        changefreq: "monthly",
        priority: low.has(p.slug) ? 0.6 : p.locale === "de" ? 0.9 : 0.8,
        languages: hreflangOf(p),
        images: [[absolute(ogImage(p)), `${p.h1} – GLAMORA Hamburg`]],
      })
    ),
    entry({ loc: `${SITE.url}/ratgeber`, lastmod: SITE.updated, changefreq: "weekly", priority: 0.7 }),
    ...ARTICLES.map((a) =>
      entry({
        loc: `${SITE.url}/ratgeber/${a.slug}`,
        lastmod: a.modified,
        changefreq: "monthly",
        priority: 0.7,
        images: [[`${SITE.url}/og/${a.image}.jpg`, a.h1]],
      })
    ),
    entry({ loc: `${SITE.url}/impressum`, lastmod: SITE.updated, changefreq: "yearly", priority: 0.2 }),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
