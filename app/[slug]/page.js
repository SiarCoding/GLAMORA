import { notFound } from "next/navigation";
import LandingPage, { ogImage } from "@/components/seiten/LandingPage";
import { PAGES, PAGE_BY_SLUG } from "@/lib/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const page = PAGE_BY_SLUG[params.slug];
  if (!page) return {};
  const image = ogImage(page);
  return {
    title: { absolute: page.title },
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: "GLAMORA",
      url: `/${page.slug}`,
      title: page.title,
      description: page.description,
      images: [{ url: image, width: 1920, height: 1080, alt: page.h1 }],
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [image] },
  };
}

export default function Page({ params }) {
  const page = PAGE_BY_SLUG[params.slug];
  if (!page) notFound();
  return <LandingPage page={page} />;
}
