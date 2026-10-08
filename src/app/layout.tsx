import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { site } from "@/config/site";
import { body, display, mono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1013" },
  ],
};

/**
 * Hides the hero until its intro starts, so it never flashes in its final
 * state first. Skipped under reduced motion; un-hides after 3s if scripts fail.
 */
const motionBoot = `(function(){var r=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;r.dataset.motion="pending";setTimeout(function(){if(r.dataset.motion==="pending")r.dataset.motion="off"},3000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes sets data-theme and color-scheme on <html> before hydration.
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        <ThemeProvider>
          <a
            className="fixed top-2 left-4 z-40 inline-flex min-h-target -translate-y-[200%] items-center rounded-control bg-fg px-4 text-body-sm font-semibold text-bg focus-visible:translate-y-0"
            href="#main"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
