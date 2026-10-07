import styles from "./SiteFooter.module.css";

interface SiteFooterProps {
  version?: string;
}

export function SiteFooter({ version }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <span>{version ? `EyePause ${version}` : "EyePause"}</span>
      <span>Free for macOS. No account, no telemetry.</span>
    </footer>
  );
}
