"use client";

import { useState } from "react";

type CopyState = "idle" | "copied" | "failed";

/** Phones can't run EyePause, so offer to carry the link over to a Mac instead. */
export function MobileNotice() {
  const [copy, setCopy] = useState<CopyState>("idle");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0]);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  };

  return (
    <div className="mb-5 rounded-xl border border-border bg-surface px-4.5 py-4">
      <p className="mb-3 text-body-sm text-fg-muted">
        <strong className="font-semibold text-fg">EyePause is a Mac app.</strong> Open this page on your Mac to
        install it.
      </p>
      <button
        type="button"
        className="inline-flex min-h-target w-full items-center justify-center gap-2 rounded-lg border border-border px-3.5 py-2.5 text-sm font-medium text-fg hover:bg-bg focus-visible:outline-offset-2 sm:w-auto"
        onClick={onCopy}
      >
        {copy === "copied" ? "Link copied" : "Copy link"}
      </button>
      <p className="mt-2 text-caption text-fg-muted empty:hidden" role="status">
        {copy === "copied"
          ? "Link copied to your clipboard."
          : copy === "failed"
            ? "Couldn't copy. Use your browser's share menu instead."
            : ""}
      </p>
    </div>
  );
}
