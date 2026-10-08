import { DownloadPanel } from "@/components/download/DownloadPanel";
import type { DownloadOption } from "@/lib/releases";
export function DownloadSection({ options }: { options: DownloadOption[] }) {
  return (
    <section className="section download" id="download">
      <div className="download-copy">
        <span className="eyebrow muted">A small addition to your day</span>
        <h2>
          Make room
          <br />
          for a little rest.
        </h2>
        <p>Get EyePause, set your rhythm, and let your menu bar keep time.</p>
        <div className="free-note">
          <svg aria-hidden="true" className="icon">
            <use href="#check" />
          </svg>
          Free. No subscription. No sign-up.
        </div>
      </div>
      <DownloadPanel options={options} />
    </section>
  );
}
