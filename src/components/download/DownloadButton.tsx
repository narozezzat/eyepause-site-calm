"use client";

import type { MouseEvent } from "react";
import { useDownloadState } from "@/hooks/useDownloadState";
import { formatBytes } from "@/lib/format";
import type { DownloadOption } from "@/lib/releases";
import styles from "./Download.module.css";

interface DownloadButtonProps {
  option: DownloadOption;
  installSteps: string[];
}

function extension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot) : name;
}

export function DownloadButton({ option, installSteps }: DownloadButtonProps) {
  const { state, begin } = useDownloadState();

  if (option.status === "coming-soon") {
    return (
      <div className={`${styles.soon} ${styles.fade}`}>
        <h3>{option.label} is on the way</h3>
        <p>
          EyePause is a Mac app today. A {option.label} build is planned. Check
          back on this page.
        </p>
      </div>
    );
  }

  if (option.status === "unavailable" || !option.primary) {
    return (
      <div className={styles.fade}>
        <button
          type="button"
          className={styles.cta}
          data-state="unavailable"
          disabled
          aria-describedby="download-unavailable"
        >
          <span>Download for {option.label}</span>
          <span className={styles.size}>Unavailable</span>
        </button>
        <p id="download-unavailable" className={styles.error}>
          The {option.label} download is temporarily unavailable. The installer
          for version {option.version} could not be attached to this page.
          Please check back shortly.
        </p>
      </div>
    );
  }

  const { primary, alternate } = option;
  const label =
    state === "starting"
      ? "Preparing download…"
      : state === "started"
        ? "Download started"
        : `Download for ${option.label}`;

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (state === "starting") {
      event.preventDefault();
      return;
    }
    if (state === "idle") begin();
  };

  return (
    <>
      <a
        className={styles.cta}
        href={primary.href}
        download={primary.name}
        data-state={state}
        aria-busy={state === "starting" || undefined}
        onClick={onClick}
      >
        <span>{label}</span>
        <span className={styles.size}>
          {primary.name} · {formatBytes(primary.size)}
        </span>
      </a>
      <div className={styles.bar} data-active={state === "starting"} aria-hidden="true">
        <i />
      </div>
      {alternate && (
        <div className={styles.alt}>
          <a href={alternate.href} download={alternate.name}>
            Download {extension(alternate.name)} archive ({formatBytes(alternate.size)})
          </a>
        </div>
      )}
      {state === "started" && installSteps.length > 0 && (
        <ol className={`${styles.steps} ${styles.fade}`} aria-label="Install steps">
          {installSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      )}
    </>
  );
}
