export const THEME_STORAGE_KEY = "eyepause-theme";
export const THEME_OPTIONS = ["system", "light", "dark"] as const;
export type ThemeOption = (typeof THEME_OPTIONS)[number];

export function isThemeOption(value: unknown): value is ThemeOption {
  return THEME_OPTIONS.includes(value as ThemeOption);
}
