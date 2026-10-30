import { SITE } from "@/lib/site";
import { LOCALES } from "@/lib/i18n";
import { PAGES } from "@/lib/pages";
import { PAGES_TR } from "@/lib/pages-tr";
import { PAGES_AR } from "@/lib/pages-ar";

/* One index over every landing page in every language. Pages that share a
 * `group` are translations of each other and get reciprocal hreflang links. */

const withLocale = (pages, locale) =>
  pages.map((p) => ({ ...p, locale, path: `${LOCALES[locale].prefix}/${p.slug}` }));

export const ALL_PAGES = [
  ...withLocale(PAGES, "de"),
  ...withLocale(PAGES_TR, "tr"),
  ...withLocale(PAGES_AR, "ar"),
];

export const PAGE_BY_PATH = Object.fromEntries(ALL_PAGES.map((p) => [p.path, p]));

export const pagesFor = (locale) => ALL_PAGES.filter((p) => p.locale === locale);

export const findPage = (locale, slug) => PAGE_BY_PATH[`${LOCALES[locale].prefix}/${slug}`];

/** { de: "/abaya-hamburg", tr: "/tr/abaya-hamburg", ar: "/ar/abaya-hamburg" } */
export function alternatesOf(page) {
  if (!page.group) return { [page.locale]: page.path };
  return Object.fromEntries(
    ALL_PAGES.filter((p) => p.group === page.group).map((p) => [p.locale, p.path])
  );
}

/** Next.js `alternates.languages` incl. x-default (German version). */
export function hreflangOf(page) {
  const alt = alternatesOf(page);
  if (Object.keys(alt).length < 2) return undefined;
  const languages = Object.fromEntries(
    Object.entries(alt).map(([loc, path]) => [LOCALES[loc].hreflang, path])
  );
  languages["x-default"] = alt.de ?? page.path;
  return languages;
}

export const absolute = (path) => `${SITE.url}${path === "/" ? "" : path}`;
