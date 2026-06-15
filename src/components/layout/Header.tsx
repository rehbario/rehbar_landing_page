"use client";

import { useState } from "react";
import Link from "next/link";
import { copy } from "@/content/copy";
import { WaitlistCta } from "@/components/waitlist/WaitlistCta";
import { BrandMark } from "@/components/layout/BrandMark";
import { IconMenu, IconClose } from "@/components/ui/icons";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[var(--maxw)] items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Rehbar home" className="shrink-0">
          <BrandMark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {copy.nav.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <WaitlistCta source="header">
            {copy.waitlist.triggerLabelShort}
          </WaitlistCta>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-lg text-primary md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <IconClose className="size-6" />
          ) : (
            <IconMenu className="size-6" />
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-bg md:hidden"
        >
          <nav
            aria-label="Mobile"
            className="flex flex-col gap-1 px-5 py-4"
          >
            {copy.nav.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-fg transition-colors hover:bg-surface"
              >
                {l.label}
              </Link>
            ))}
            <WaitlistCta
              source="header"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              {copy.waitlist.triggerLabelShort}
            </WaitlistCta>
          </nav>
        </div>
      )}
    </header>
  );
}
