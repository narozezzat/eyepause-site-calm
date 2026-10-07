interface SiteFooterProps {
  version?: string;
}

export function SiteFooter({ version }: SiteFooterProps) {
  return (
    <footer className="flex flex-wrap justify-between gap-x-4 gap-y-2 border-t border-border pt-6 pb-10 text-caption text-fg-subtle">
      <span>{version ? `EyePause ${version}` : "EyePause"}</span>
      <span>Free for macOS. No account, no telemetry.</span>
    </footer>
  );
}
