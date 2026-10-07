"use client";

import type { MouseEvent } from "react";
import { useDownloadState } from "@/hooks/useDownloadState";
import { formatBytes } from "@/lib/format";
import type { DownloadOption } from "@/lib/releases";

const cta =
  "flex min-h-target w-full flex-wrap items-center justify-between gap-x-4 gap-y-1.5 rounded-xl bg-fg px-5.5 py-4.5 text-left text-base font-semibold text-bg transition-[transform,background-color,opacity] duration-200 ease-calm hover:-translate-y-px active:translate-y-0 data-[state=started]:bg-accent data-[state=started]:text-accent-fg data-[state=starting]:cursor-progress data-[state=unavailable]:cursor-not-allowed data-[state=unavailable]:bg-surface data-[state=unavailable]:text-fg-muted data-[state=unavailable]:ring-1 data-[state=unavailable]:ring-border data-[state=unavailable]:ring-inset data-[state=unavailable]:hover:translate-y-0";
const size = "font-mono text-caption font-normal opacity-70 wrap-anywhere";

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
      <div className="animate-fade-up rounded-xl border border-dashed border-border p-5.5">
        <h3 className="mb-1.5 font-display text-2xl leading-tight">{option.label} is on the way</h3>
        <p className="text-body-sm text-fg-muted">
          EyePause is a Mac app today. A {option.label} build is planned. Check
          back on this page.
        </p>
      </div>
    );
  }

  if (option.status === "unavailable" || !option.primary) {
    return (
      <div className="animate-fade-up">
        <button
          type="button"
          className={cta}
          data-state="unavailable"
          disabled
          aria-describedby="download-unavailable"
        >
          <span>Download for {option.label}</span>
          <span className={size}>Unavailable</span>
        </button>
        <p id="download-unavailable" className="mt-3.5 text-body-sm text-fg-muted">
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
        className={cta}
        href={primary.href}
        download={primary.name}
        data-state={state}
        aria-busy={state === "starting" || undefined}
        onClick={onClick}
      >
        <span>{label}</span>
        <span className={size}>
          {primary.name} · {formatBytes(primary.size)}
        </span>
      </a>
      <div
        className="mt-3 h-0.5 overflow-hidden rounded-xs bg-border opacity-0 transition-opacity duration-200 data-[active=true]:opacity-100"
        data-active={state === "starting"}
        aria-hidden="true"
      >
        <i className="block h-full w-2/5 animate-slide bg-accent" />
      </div>
      {alternate && (
        <div className="mt-1 flex flex-wrap gap-4 text-sm text-fg-muted">
          <a
            className="inline-flex min-h-target items-center underline decoration-border underline-offset-3 hover:text-fg hover:decoration-current"
            href={alternate.href}
            download={alternate.name}
          >
            Download {extension(alternate.name)} archive ({formatBytes(alternate.size)})
          </a>
        </div>
      )}
      {state === "started" && installSteps.length > 0 && (
        <ol
          className="mt-4.5 grid animate-fade-up gap-2.5 [counter-reset:step]"
          aria-label="Install steps"
        >
          {installSteps.map((step) => (
            <li
              key={step}
              className="grid grid-cols-[1.75rem_1fr] text-body-sm text-fg-muted [counter-increment:step] before:font-mono before:text-xs before:leading-[1.9] before:font-medium before:text-accent-text before:content-[counter(step)]"
            >
              {step}
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
