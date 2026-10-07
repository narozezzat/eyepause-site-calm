import { DownloadPanel } from "@/components/download/DownloadPanel";
import { formatDate } from "@/lib/format";
import type { DownloadOption } from "@/lib/releases";

interface DownloadSectionProps {
  options: DownloadOption[];
}

const dt = "font-mono text-xs leading-[1.8] font-medium tracking-wider text-fg-subtle uppercase";

export function DownloadSection({ options }: DownloadSectionProps) {
  const release = options.find((o) => o.status !== "coming-soon") ?? options[0];

  return (
    <section
      className="grid scroll-mt-4 gap-9 border-t border-border py-16 sm:py-20 md:grid-cols-[0.9fr_1.1fr] md:gap-14 lg:py-28 [&>*]:min-w-0"
      id="download"
      aria-labelledby="download-title"
    >
      <div>
        <h2 id="download-title" className="mb-3 font-display text-3xl leading-tight tracking-tight">
          Download EyePause
        </h2>
        <p className="text-body-sm text-fg-muted">Free. No account, no telemetry.</p>
        {release && (
          <dl className="mt-6.5 grid grid-cols-[auto_1fr] gap-x-5.5 gap-y-2 text-sm">
            <dt className={dt}>Version</dt>
            <dd className="tabular-nums">{release.version}</dd>
            <dt className={dt}>Released</dt>
            <dd className="tabular-nums">
              <time dateTime={release.publishedAt}>{formatDate(release.publishedAt)}</time>
            </dd>
            <dt className={dt}>Build</dt>
            <dd>Universal · Apple silicon &amp; Intel</dd>
            <dt className={dt}>Price</dt>
            <dd>Free</dd>
          </dl>
        )}
      </div>
      <DownloadPanel options={options} />
    </section>
  );
}
