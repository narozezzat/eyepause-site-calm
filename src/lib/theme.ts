export type Theme = "light" | "dark";
/** "system" means no stored value: follow `prefers-color-scheme`. */
export type ThemeChoice = Theme | "system";

export const THEME_STORAGE_KEY = "eyepause-theme";
export const THEME_CHOICES: readonly ThemeChoice[] = ["system", "light", "dark"];

/** Anything other than an explicit "light" or "dark" falls back to the system theme. */
export function parseStoredTheme(value: unknown): ThemeChoice {
  return value === "light" || value === "dark" ? value : "system";
}

export function resolveTheme(choice: ThemeChoice, systemDark: boolean): Theme {
  if (choice === "system") return systemDark ? "dark" : "light";
  return choice;
}

/**
 * Runs synchronously as the first thing in <head>, before any CSS or content
 * paints, so an explicit choice is on <html> before the first frame. System
 * needs no attribute: the CSS media query handles it and follows OS changes.
 * Kept self-contained (no imports at runtime) because it is inlined as text.
 */
export const themeInitScript = `(function(){try{var t=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}if(t==="light"||t==="dark"){var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t}}catch(e){}})()`;
