import { SITE } from "@/lib/site";
import { LOCALES } from "@/lib/i18n";
import { findPage, hreflangOf } from "@/lib/registry";
import { ogImage } from "@/components/seiten/LandingPage";

/** Shared generateMetadata for the DE / TR / AR landing routes. */
export function landingMetadata(locale, slug) {
  const page = findPage(locale, slug);
  if (!page) return {};
  const image = ogImage(page);
  const loc = LOCALES[locale];
  const languages = hreflangOf(page);
  const alternateLocale = languages
    ? Object.keys(languages)
        .filter((l) => l !== "x-default" && l !== loc.hreflang)
        .map((l) => Object.values(LOCALES).find((x) => x.hreflang === l)?.og)
        .filter(Boolean)
    : undefined;
  return {
    title: { absolute: page.title },
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: page.path, ...(languages ? { languages } : {}) },
    openGraph: {
      type: "website",
      locale: loc.og,
      ...(alternateLocale?.length ? { alternateLocale } : {}),
      siteName: SITE.brandLocal,
      url: page.path,
      title: page.title,
      description: page.description,
      images: [{ url: image, width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [image] },
  };
}
