import { cn } from "@/lib/cn";
import { copy } from "@/content/copy";
import { createElement } from "react";

/** The Rehbar badge loads from /logo.svg; replace that file and regenerate favicon.ico / apple-icon.png to rebrand. */
export function BrandMark({
  className,
  showMark = true,
}: {
  className?: string;
  showMark?: boolean;
}) {
  return createElement(
    "span",
    { className: cn("inline-flex items-center gap-2.5", className) },
    createElement("img", {
      "aria-hidden": "true",
      src: "/logo.svg",
      alt: "",
      className: "size-9 rounded-[10px] object-cover",
    }),
    createElement(
      "span",
      { className: "text-lg font-extrabold tracking-tight text-primary" },
      copy.nav.brand,
      showMark
        ? createElement(
            "span",
            {
              lang: "ur",
              dir: "rtl",
              className: "ml-1.5 align-middle text-base font-semibold text-muted",
            },
            copy.nav.mark,
          )
        : null,
    ),
  );
}
