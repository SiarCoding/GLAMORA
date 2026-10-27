import { SITE } from "@/lib/site";
import { PAGES } from "@/lib/pages";

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...PAGES.map((p) => ({
      url: `${SITE.url}/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: p.slug === "termin" || p.slug === "ueber-uns" ? 0.6 : 0.9,
    })),
  ];
}
