"use client";

import { useRef, type KeyboardEvent } from "react";
import type { DownloadOption } from "@/lib/releases";
import { nextRadioIndex } from "@/lib/theme";

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
      className="platforms"
      role="radiogroup"
      aria-label="Choose your platform"
      onKeyDown={onKeyDown}
    >
      {options.map((option, index) => {
        const checked = option.platformId === selectedId;
        const recommended = option.platformId === recommendedId;
        const note = recommended
          ? "Detected"
          : option.status === "coming-soon"
            ? "Coming soon"
            : option.status === "unavailable"
              ? "Check back soon"
              : "Available now";
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
            className="platform"
            onClick={() => onSelect(option.platformId)}
          >
            <span>{option.label}</span>
            <small>{note}</small>
          </button>
        );
      })}
    </div>
  );
}
