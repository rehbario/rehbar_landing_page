import type { Metadata } from "next";
import { site } from "@/lib/site";

type MetaInput = {
  title?: string;
  description?: string;
  /** Route path, e.g. "/" or "/vision". Used for the canonical URL. */
  path?: string;
};

/**
 * Build per-page Metadata (§5): unique title/description, canonical, OG + Twitter.
 * The OG image is supplied automatically by the file-based `opengraph-image.tsx`.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
}: MetaInput = {}): Metadata {
  const url = new URL(path, site.url).toString();
  const resolvedTitle =
    title ?? `${site.name} — You have the ability. We'll show you the way.`;
  const resolvedDescription = description ?? site.description;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: url },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: site.name,
      type: "website",
      locale: site.ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
    },
  };
}

/** Organization JSON-LD (§5). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    description: site.description,
    email: site.contactEmail,
    sameAs: [
      site.social.instagram,
      site.social.facebook,
      site.social.linkedin,
    ],
  };
}

/** SoftwareApplication JSON-LD (§5) — education category, free offer. */
export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: site.url,
    description: site.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PKR",
    },
  };
}
