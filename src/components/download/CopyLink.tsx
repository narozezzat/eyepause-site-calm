"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

type CopyState = "idle" | "copied" | "failed";

interface CopyLinkProps {
  /** Defaults to the current page without its hash. */
  url?: string;
  label?: string;
}

const RESET_MS = 2000;

/** Copies a link for later (e.g. from a phone to a Mac). Shows "Copied" for 2s and announces it. */
export function CopyLink({ url, label = "Copy link" }: CopyLinkProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onCopy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(url ?? window.location.href.split("#")[0]);
      setState("copied");
      timer.current = setTimeout(() => setState("idle"), RESET_MS);
    } catch {
      setState("failed");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <Button
        variant="secondary"
        fullWidthOnMobile
        onClick={onCopy}
        icon={
          <svg
            className="size-4.5 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            {state === "copied" ? (
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            ) : (
              <>
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
              </>
            )}
          </svg>
        }
      >
        {state === "copied" ? "Copied" : label}
      </Button>
      <p className="text-caption text-fg-muted empty:hidden" aria-live="polite">
        {state === "copied"
          ? "Link copied to your clipboard."
          : state === "failed"
            ? "Couldn't copy. Use your browser's share menu instead."
            : ""}
      </p>
    </div>
  );
}
