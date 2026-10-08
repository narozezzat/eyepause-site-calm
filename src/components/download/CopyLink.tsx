"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

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

  const CopyIcon = state === "copied" ? Check : Copy;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <Button
        variant="secondary"
        fullWidthOnMobile
        onClick={onCopy}
        icon={
          <CopyIcon
            className="size-4.5 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
            aria-hidden="true"
            focusable="false"
          />
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
