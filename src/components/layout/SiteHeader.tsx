import { BrandMark } from "@/components/brand/BrandMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { withBasePath } from "@/config/site";
import { cn } from "@/lib/cn";

const home = withBasePath("/");

/** Below sm only the theme toggle stays (Download follows the hero); Tour and Details join at md. */
const links = [
  { href: `${home}#tour`, label: "Tour", className: "hidden md:inline-flex" },
  { href: `${home}#details`, label: "Details", className: "hidden md:inline-flex" },
  { href: `${home}#download`, label: "Download", className: "inline-flex" },
];

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-4 py-3.5">
      <a
        className="inline-flex min-h-target items-center gap-2.5 font-semibold tracking-tight"
        href={home}
      >
        <BrandMark className="size-5.5" />
        EyePause
      </a>
      <div className="flex items-center gap-4 md:gap-6">
        <nav className="hidden gap-5.5 sm:flex text-sm text-fg-muted" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "min-h-target min-w-target items-center justify-center transition-colors duration-200 ease-calm hover:text-fg",
                link.className,
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
