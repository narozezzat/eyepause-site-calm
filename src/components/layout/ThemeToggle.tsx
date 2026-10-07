"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";
import {
  setThemeChoice,
  useSystemDark,
  useThemeChoice,
} from "@/hooks/useThemeChoice";
import { resolveTheme, THEME_CHOICES, type ThemeChoice } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

const icons: Record<ThemeChoice, ReactNode> = {
  system: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  dark: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
};

const names: Record<ThemeChoice, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

/** WAI-ARIA radio group: one tab stop, arrows/Home/End move and select. */
export function ThemeToggle() {
  const choice = useThemeChoice();
  const systemDark = useSystemDark();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // Server render and hydration: same-size, inert box, so nothing shifts or mismatches.
  if (choice === null) {
    return <div className={styles.toggle} aria-hidden="true" />;
  }

  const select = (index: number) => {
    setThemeChoice(THEME_CHOICES[index]);
    refs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = THEME_CHOICES.indexOf(choice);
    const last = THEME_CHOICES.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = index >= last ? 0 : index + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = index <= 0 ? last : index - 1;
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
    select(next);
  };

  return (
    <div
      className={styles.toggle}
      role="radiogroup"
      aria-label="Colour theme"
      onKeyDown={onKeyDown}
    >
      {THEME_CHOICES.map((option, index) => {
        const checked = option === choice;
        const label =
          option === "system" && systemDark !== null
            ? `System (currently ${resolveTheme("system", systemDark)})`
            : names[option];
        return (
          <button
            key={option}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={label}
            title={label}
            tabIndex={checked ? 0 : -1}
            className={styles.option}
            onClick={() => select(index)}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              focusable="false"
            >
              {icons[option]}
            </svg>
          </button>
        );
      })}
    </div>
  );
}
