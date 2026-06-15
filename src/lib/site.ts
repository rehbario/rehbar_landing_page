/**
 * Single source of truth for site-wide constants (§3).
 * Change the URL / CTA target here once the production app + domain are live.
 */
export const site = {
  name: "Rehbar",
  /** Canonical origin. Update to the real production domain when chosen. */
  url: "https://rehbar.io",
  /** ~138 chars — used for <meta description>, OG, Twitter. */
  description:
    "Rehbar is the free AI guide that helps every student find the right university, see exactly where they stand, and reach it — step by step.",
  tagline: "The guide who leads from the front.",
  locale: "en",
  ogLocale: "en_US",

  contactEmail: "rehbar.official.io@gmail.com",

  social: {
    instagram:
      "https://www.instagram.com/rehbar.io?igsh=MWRsN2RvdWkxaHNlbA==",
    facebook: "https://www.facebook.com/share/1NhqcRSXQk/",
    linkedin: "https://www.linkedin.com/company/rehbar-io/",
  },
} as const;

export type Site = typeof site;
