"use client";

import { useTheme } from "next-themes";
import { useRef, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { isThemeOption, nextRadioIndex, THEME_OPTIONS, type ThemeOption } from "@/lib/theme";

const labels: Record<ThemeOption, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

const icons: Record<ThemeOption, ReactNode> = {
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

const noop = () => () => {};

/** False during the server render and hydration, true once on the client. */
function useMounted(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/** Fixed size so the placeholder and the control take exactly the same space. */
const groupClass =
  "inline-flex h-[calc(var(--spacing-target)+2px)] w-[calc(var(--spacing-target)*3+2px)] flex-none rounded-full border border-border bg-surface";

/** System / Light / Dark as a WAI-ARIA radio group: one tab stop, arrows/Home/End move and select. */
export function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  if (!mounted) {
    return <div className={groupClass} aria-hidden="true" />;
  }

  const current: ThemeOption = isThemeOption(theme) ? theme : "system";

  const select = (index: number) => {
    setTheme(THEME_OPTIONS[index]);
    refs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = nextRadioIndex(event.key, THEME_OPTIONS.indexOf(current), THEME_OPTIONS.length);
    if (next === null) return;
    event.preventDefault();
    select(next);
  };

  return (
    <div className={groupClass} role="radiogroup" aria-label="Color theme" onKeyDown={onKeyDown}>
      {THEME_OPTIONS.map((option, index) => {
        const checked = option === current;
        return (
          <button
            key={option}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            title={labels[option]}
            onClick={() => select(index)}
            className="relative grid size-target place-items-center rounded-full text-fg-subtle transition-colors duration-200 ease-calm before:absolute before:inset-1.5 before:rounded-full before:transition-colors before:duration-200 hover:text-fg focus-visible:rounded-full focus-visible:-outline-offset-2 aria-checked:text-accent-text aria-checked:before:bg-bg aria-checked:before:ring-1 aria-checked:before:ring-border aria-checked:before:ring-inset"
          >
            <svg
              viewBox="0 0 24 24"
              className="relative size-4.5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] stroke-[1.6]"
              aria-hidden="true"
              focusable="false"
            >
              {icons[option]}
            </svg>
            <span className="sr-only">{labels[option]}</span>
          </button>
        );
      })}
    </div>
  );
}
