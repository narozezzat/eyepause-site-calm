"use client";

import { useRef, type KeyboardEvent } from "react";
import type { DownloadOption } from "@/lib/releases";
import { PlatformIcon } from "./PlatformIcon";
import styles from "./Download.module.css";

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
    const last = options.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = current >= last ? 0 : current + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = current <= 0 ? last : current - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    move(next);
  };

  return (
    <div
      className={styles.picker}
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
            className={styles.option}
            onClick={() => onSelect(option.platformId)}
          >
            <PlatformIcon platformId={option.platformId} className={styles.optionIcon} />
            <span>{option.label}</span>
            <small className={recommended ? styles.recommended : undefined}>{note}</small>
          </button>
        );
      })}
    </div>
  );
}
