export const THEME_STORAGE_KEY = "eyepause-theme";
export const THEME_OPTIONS = ["system", "light", "dark"] as const;
export type ThemeOption = (typeof THEME_OPTIONS)[number];

export function isThemeOption(value: unknown): value is ThemeOption {
  return THEME_OPTIONS.includes(value as ThemeOption);
}

/**
 * Roving-tabindex radio group navigation: the index a key moves to, or null
 * when the key isn't a navigation key. Arrows wrap; Home/End jump to the ends.
 */
export function nextRadioIndex(key: string, current: number, count: number): number | null {
  if (count <= 0) return null;
  const last = count - 1;
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return current >= last || current < 0 ? 0 : current + 1;
    case "ArrowLeft":
    case "ArrowUp":
      return current <= 0 ? last : current - 1;
    case "Home":
      return 0;
    case "End":
      return last;
    default:
      return null;
  }
}
