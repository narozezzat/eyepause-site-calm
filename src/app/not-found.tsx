import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { withBasePath } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found · EyePause",
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <SiteHeader />
      <main id="main" tabIndex={-1} className="py-16 sm:py-20 lg:py-28">
        <p className="mb-5 font-mono text-xs leading-none font-medium tracking-caps text-fg-subtle uppercase">
          404
        </p>
        <h1 className="font-display text-status font-light tracking-tight text-balance">
          This page is taking a break.
        </h1>
        <p className="mt-5 mb-8 max-w-[46ch] text-lg text-fg-muted">
          The address you followed doesn&apos;t lead anywhere. Look twenty feet
          away for twenty seconds, then head back.
        </p>
        <a
          className="inline-flex min-h-target w-full items-center justify-center rounded-xl bg-fg px-5 font-semibold text-bg sm:w-auto"
          href={withBasePath("/")}
        >
          Back to EyePause
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
