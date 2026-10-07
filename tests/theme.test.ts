import { describe, expect, it } from "vitest";
import {
  parseStoredTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  themeInitScript,
} from "@/lib/theme";

describe("parseStoredTheme", () => {
  it("keeps explicit light and dark", () => {
    expect(parseStoredTheme("light")).toBe("light");
    expect(parseStoredTheme("dark")).toBe("dark");
  });

  it("falls back to system for missing or unknown values", () => {
    expect(parseStoredTheme(null)).toBe("system");
    expect(parseStoredTheme(undefined)).toBe("system");
    expect(parseStoredTheme("system")).toBe("system");
    expect(parseStoredTheme("DARK")).toBe("system");
    expect(parseStoredTheme("")).toBe("system");
  });
});

describe("resolveTheme", () => {
  it("follows the system only when no explicit choice is made", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });
});

describe("themeInitScript", () => {
  function run(getItem: (key: string) => string | null) {
    const root = { dataset: {} as Record<string, string>, style: {} as Record<string, string> };
    const localStorage = { getItem };
    new Function("document", "localStorage", themeInitScript)(
      { documentElement: root },
      localStorage,
    );
    return root;
  }

  it("applies an explicit stored theme", () => {
    const root = run(() => "dark");
    expect(root.dataset.theme).toBe("dark");
    expect(root.style.colorScheme).toBe("dark");
  });

  it("reads the expected key", () => {
    let key: string | undefined;
    run((k) => {
      key = k;
      return null;
    });
    expect(key).toBe(THEME_STORAGE_KEY);
  });

  it("leaves system and invalid values to the CSS media query", () => {
    for (const value of [null, "system", "purple"]) {
      const root = run(() => value);
      expect(root.dataset.theme).toBeUndefined();
      expect(root.style.colorScheme).toBeUndefined();
    }
  });

  it("does not throw when storage is blocked", () => {
    const root = run(() => {
      throw new Error("SecurityError");
    });
    expect(root.dataset.theme).toBeUndefined();
  });
});
