import { DownloadPanel } from "@/components/download/DownloadPanel";
import { formatDate } from "@/lib/format";
import type { DownloadOption } from "@/lib/releases";
import styles from "@/components/download/Download.module.css";

interface DownloadSectionProps {
  options: DownloadOption[];
}

export function DownloadSection({ options }: DownloadSectionProps) {
  const release = options.find((o) => o.status !== "coming-soon") ?? options[0];

  return (
    <section className={styles.panel} id="download" aria-labelledby="download-title">
      <div>
        <h2 id="download-title">Download EyePause</h2>
        <p className={styles.meta}>Free. No account, no telemetry.</p>
        {release && (
          <dl className={styles.metaList}>
            <dt>Version</dt>
            <dd>{release.version}</dd>
            <dt>Released</dt>
            <dd>
              <time dateTime={release.publishedAt}>{formatDate(release.publishedAt)}</time>
            </dd>
            <dt>Build</dt>
            <dd>Universal · Apple silicon &amp; Intel</dd>
            <dt>Price</dt>
            <dd>Free</dd>
          </dl>
        )}
      </div>
      <DownloadPanel options={options} />
    </section>
  );
}
