import { notFound } from "next/navigation";
import LandingPage from "@/components/seiten/LandingPage";
import { findPage, pagesFor } from "@/lib/registry";
import { landingMetadata } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesFor("tr").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  return landingMetadata("tr", params.slug);
}

export default function Page({ params }) {
  const page = findPage("tr", params.slug);
  if (!page) notFound();
  return <LandingPage page={page} />;
}
