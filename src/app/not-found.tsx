import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found · EyePause",
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto grid w-full max-w-6xl flex-1 place-content-center px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8"
      >
        <p className="mb-4 font-mono text-micro font-medium tracking-caps text-fg-subtle uppercase tabular-nums">
          Error 404
        </p>
        <h1 className="font-display text-section font-light tracking-tight text-balance">
          This page is taking a break.
        </h1>
        <p className="mx-auto mt-4 mb-8 max-w-[44ch] text-lede text-pretty text-fg-muted">
          The address you followed doesn&apos;t lead anywhere. Look twenty feet
          away for twenty seconds, then head back.
        </p>
        <div>
          <Button href={withBasePath("/")} size="lg" fullWidthOnMobile>
            Back to EyePause
          </Button>
        </div>
      </main>
      <div className="wrap w-full">
        <SiteFooter />
      </div>
    </div>
  );
}
