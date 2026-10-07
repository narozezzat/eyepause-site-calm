"use client";

import { useRef, type KeyboardEvent } from "react";
import type { DownloadOption } from "@/lib/releases";
import { cn } from "@/lib/cn";
import { nextRadioIndex } from "@/lib/theme";
import { PlatformIcon } from "./PlatformIcon";

/** Compact requirement shown under an available platform that isn't the visitor's own. */
const shortRequirement: Record<string, string> = {
  macos: "macOS 14+",
};

interface PlatformPickerProps {
  options: DownloadOption[];
  selectedId: string;
  recommendedId: string | null;
  onSelect: (platformId: string) => void;
}

/** WAI-ARIA radio group: one tab stop, arrows/Home/End move and select. */
export function PlatformPicker({
  options,
  selectedId,
  recommendedId,
  onSelect,
}: PlatformPickerProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (index: number) => {
    const next = options[index];
    onSelect(next.platformId);
    refs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = options.findIndex((o) => o.platformId === selectedId);
    const next = nextRadioIndex(event.key, current, options.length);
    if (next === null) return;
    event.preventDefault();
    move(next);
  };

  return (
    <div
      className="grid gap-1 rounded-2xl border border-border bg-surface p-1 sm:grid-cols-3"
      role="radiogroup"
      aria-label="Choose your platform"
      onKeyDown={onKeyDown}
    >
      {options.map((option, index) => {
        const checked = option.platformId === selectedId;
        const recommended = option.platformId === recommendedId;
        const note = recommended
          ? "Recommended"
          : option.status === "coming-soon"
            ? "Coming soon"
            : (shortRequirement[option.platformId] ?? "Available");
        return (
          <button
            key={option.platformId}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            className="flex min-h-target items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-fg-muted transition-colors duration-200 ease-calm hover:text-fg focus-visible:-outline-offset-2 aria-checked:bg-bg aria-checked:text-fg aria-checked:ring-1 aria-checked:ring-border aria-checked:ring-inset sm:flex-col sm:gap-1.5 sm:px-2 sm:pt-3.5 sm:pb-3 sm:text-center"
            onClick={() => onSelect(option.platformId)}
          >
            <PlatformIcon platformId={option.platformId} className="size-5.5 flex-none fill-current" />
            <span>{option.label}</span>
            <small
              className={cn(
                "ml-auto font-mono text-2xs leading-tight tracking-widest uppercase sm:ml-0",
                recommended ? "text-accent-text" : "text-fg-subtle",
              )}
            >
              {note}
            </small>
          </button>
        );
      })}
    </div>
  );
}
