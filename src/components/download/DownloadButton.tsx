"use client";

import { ArrowDownToLine } from "lucide-react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/Notice";
import { useDownloadState } from "@/hooks/useDownloadState";
import { formatBytes } from "@/lib/format";
import {
  downloadMeta,
  downloadView,
  type DownloadOption,
} from "@/lib/releases";
import { InstallSteps } from "./InstallSteps";

interface DownloadButtonProps {
  option: DownloadOption;
  installSteps: string[];
}

const link =
  "inline-flex min-h-target items-center font-medium text-fg underline decoration-border-strong underline-offset-4 transition-colors duration-150 ease-out hover:decoration-current";

function extension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1).toUpperCase() : name;
}

function Meta({ parts }: { parts: string[] }) {
  return (
    <ul className="release-meta" aria-label="Release details">
      {parts.map((part, i) => (
        <li key={part} className="flex gap-2">
          {i > 0 && <span aria-hidden="true">·</span>}
          <span className="wrap-anywhere">{part}</span>
        </li>
      ))}
    </ul>
  );
}

function DownloadIcon() {
  return (
    <ArrowDownToLine
      className="size-5 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
      aria-hidden="true"
      focusable="false"
    />
  );
}

function Spinner() {
  return (
    <svg
      className="size-5 animate-spin motion-reduce:animate-none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2.4"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The download area for one platform. Every view keeps the meta row
 * (version · size · requirement · date) so the facts never disappear.
 */
export function DownloadButton({ option, installSteps }: DownloadButtonProps) {
  const { state, begin, reset } = useDownloadState();
  const view = downloadView(option);

  if (view === "coming-soon") {
    return (
      <div className="grid animate-enter gap-3">
        <button className="btn download-button" disabled>
          {option.label} · Coming soon
        </button>
        <Notice
          tone="info"
          title={`${option.label} is planned`}
          announce={false}
        >
          <p>
            EyePause is a Mac app today. There is no {option.label} build yet,
            so there is nothing to download.
          </p>
        </Notice>
        <Meta
          parts={[
            `Latest Mac version ${option.version}`,
            option.requirementShort,
          ]}
        />
      </div>
    );
  }

  if (view === "unavailable") {
    return (
      <div className="grid animate-enter gap-3">
        <button className="btn download-button" disabled>
          Installer unavailable
        </button>
        <Notice
          tone="info"
          title="The installer isn't on this page right now"
          announce={false}
        >
          <p>
            Version {option.version} is released, but its files weren&apos;t
            attached when this page was built. Check back later today, or reload
            if you opened this page a while ago.
          </p>
        </Notice>
        <Meta parts={downloadMeta(option, null)} />
      </div>
    );
  }

  if (view === "error" && option.alternate) {
    const { alternate } = option;
    return (
      <div className="grid animate-enter gap-4">
        <Notice
          tone="error"
          title="The disk image is missing from this release"
          announce={false}
        >
          <p>
            The {extension(alternate.name)} archive has the same app. Unzip it
            and move EyePause to Applications.
          </p>
        </Notice>
        <div>
          <Button
            className="btn download-button"
            href={alternate.href}
            download={alternate.name}
            size="lg"
            fullWidthOnMobile
            icon={<DownloadIcon />}
          >
            Download {extension(alternate.name)} ({formatBytes(alternate.size)})
          </Button>
        </div>
        <Meta parts={downloadMeta(option, alternate)} />
      </div>
    );
  }

  const primary = option.primary;
  if (!primary) return null;
  const alternate = option.alternate;

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (state === "starting") {
      event.preventDefault();
      return;
    }
    begin();
  };

  if (state === "started") {
    return (
      <div className="grid animate-enter gap-5">
        <Notice tone="success" title="Download started">
          <p className="wrap-anywhere">
            Check your Downloads folder for {primary.name}. Then:
          </p>
        </Notice>
        <InstallSteps steps={installSteps} />
        <p className="flex flex-wrap items-center gap-x-5 text-body-sm text-fg-muted">
          <span>Nothing happened?</span>
          <a
            className={link}
            href={primary.href}
            download={primary.name}
            onClick={reset}
          >
            Download again
          </a>
        </p>
        <Meta parts={downloadMeta(option)} />
      </div>
    );
  }

  const starting = state === "starting";
  return (
    <div className="grid gap-3">
      <div>
        <Button
          className="btn download-button"
          href={primary.href}
          download={primary.name}
          size="lg"
          fullWidthOnMobile
          aria-busy={starting || undefined}
          onClick={onClick}
          icon={starting ? <Spinner /> : <DownloadIcon />}
        >
          {starting ? "Starting download…" : `Download for ${option.label}`}
        </Button>
      </div>
      <Meta parts={downloadMeta(option)} />
      <div className="download-detail">
        <span>{option.requirements}</span>
        <span>Free to download</span>
      </div>
      {alternate && (
        <p className="archive text-fg-muted">
          Prefer an archive?{" "}
          <a className={link} href={alternate.href} download={alternate.name}>
            {extension(alternate.name)}, {formatBytes(alternate.size)}
          </a>
        </p>
      )}
    </div>
  );
}
