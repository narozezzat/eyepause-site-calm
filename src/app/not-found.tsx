import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { withBasePath } from "@/config/site";
import styles from "./status.module.css";

export const metadata: Metadata = {
  title: "Page not found · EyePause",
};

export default function NotFound() {
  return (
    <div className="wrap">
      <SiteHeader />
      <main id="main" tabIndex={-1} className={styles.notFound}>
        <p className={styles.eyebrow}>404</p>
        <h1>This page is taking a break.</h1>
        <p className={styles.lede}>
          The address you followed doesn&apos;t lead anywhere. Look twenty feet
          away for twenty seconds, then head back.
        </p>
        <a className={styles.home} href={withBasePath("/")}>
          Back to EyePause
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
