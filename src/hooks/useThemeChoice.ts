"use client";

import { useSyncExternalStore } from "react";
import {
  parseStoredTheme,
  THEME_STORAGE_KEY,
  type ThemeChoice,
} from "@/lib/theme";

const darkQuery = "(prefers-color-scheme: dark)";
const listeners = new Set<() => void>();
/** In-memory copy so the toggle still works when storage is blocked. */
let current: ThemeChoice | undefined;

function readStored(): ThemeChoice {
  try {
    return parseStoredTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "system";
  }
}

function writeStored(choice: ThemeChoice) {
  try {
    if (choice === "system") window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the choice lasts for this page view only.
  }
}

/** Mirrors the inline head script, with transitions off for one frame so colours swap at once. */
function applyChoice(choice: ThemeChoice) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  if (choice === "system") {
    delete root.dataset.theme;
    root.style.removeProperty("color-scheme");
  } else {
    root.dataset.theme = choice;
    root.style.colorScheme = choice;
  }
  // Force a style flush with transitions disabled, then re-enable them.
  void window.getComputedStyle(root).color;
  window.requestAnimationFrame(() => root.classList.remove("theme-switching"));
}

function update(choice: ThemeChoice) {
  if (choice === current) return;
  current = choice;
  applyChoice(choice);
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  if (event.key === THEME_STORAGE_KEY || event.key === null) {
    update(parseStoredTheme(event.newValue));
  }
}

function subscribeChoice(onChange: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getChoice(): ThemeChoice {
  current ??= readStored();
  return current;
}

function subscribeSystem(onChange: () => void) {
  const mql = window.matchMedia(darkQuery);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSystemDark = () => window.matchMedia(darkQuery).matches;
const getServerSnapshot = () => null;

export function setThemeChoice(choice: ThemeChoice) {
  writeStored(choice);
  update(choice);
}

/** The stored choice; null until the client knows it (server render and hydration). */
export function useThemeChoice(): ThemeChoice | null {
  return useSyncExternalStore(subscribeChoice, getChoice, getServerSnapshot);
}

/** Live `prefers-color-scheme: dark`; null until the client knows it. */
export function useSystemDark(): boolean | null {
  return useSyncExternalStore(subscribeSystem, getSystemDark, getServerSnapshot);
}
