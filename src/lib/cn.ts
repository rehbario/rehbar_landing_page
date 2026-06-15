/** Tiny className joiner — keeps the bundle lean (no clsx/tailwind-merge dep). */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
