"use client";

import { useEffect, useRef } from "react";
import { copy } from "@/content/copy";
import { IconClose } from "@/components/ui/icons";
import { WaitlistForm } from "./WaitlistForm";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function WaitlistModal({
  open,
  source,
  onClose,
}: {
  open: boolean;
  source: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const items = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-fg/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        aria-describedby="waitlist-subhead"
        className="stage-in relative z-10 max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-bg p-6 shadow-2xl sm:rounded-2xl sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg"
        >
          <IconClose className="size-5" />
        </button>
        <h2
          id="waitlist-title"
          className="pr-8 text-xl font-extrabold tracking-tight text-primary"
        >
          {copy.waitlist.modalTitle}
        </h2>
        <p id="waitlist-subhead" className="mt-1 text-sm text-muted">
          {copy.waitlist.modalSubhead}
        </p>
        <div className="mt-5">
          <WaitlistForm source={source} />
        </div>
      </div>
    </div>
  );
}
