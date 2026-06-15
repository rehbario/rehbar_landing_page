import Link from "next/link";
import { copy } from "@/content/copy";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/layout/BrandMark";
import {
  IconInstagram,
  IconFacebook,
  IconLinkedIn,
} from "@/components/ui/icons";

const socials = [
  { label: "Instagram", href: site.social.instagram, Icon: IconInstagram },
  { label: "Facebook", href: site.social.facebook, Icon: IconFacebook },
  { label: "LinkedIn", href: site.social.linkedin, Icon: IconLinkedIn },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <BrandMark />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {copy.footer.tagline}
            </p>
            <ul className="mt-4 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3"
          >
            {copy.footer.links.map((l) =>
              l.href.startsWith("/") ? (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              ),
            )}
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted">
          © {year} {copy.nav.brand} ·{" "}
          <a
            href={`mailto:${site.contactEmail}`}
            className="transition-colors hover:text-primary"
          >
            {site.contactEmail}
          </a>
        </div>
      </Container>
    </footer>
  );
}
