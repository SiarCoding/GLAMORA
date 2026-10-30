import { notFound } from "next/navigation";
import LandingPage from "@/components/seiten/LandingPage";
import { findPage, pagesFor } from "@/lib/registry";
import { landingMetadata } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesFor("de").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  return landingMetadata("de", params.slug);
}

export default function Page({ params }) {
  const page = findPage("de", params.slug);
  if (!page) notFound();
  return <LandingPage page={page} />;
}
