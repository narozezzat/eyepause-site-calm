import { describe, expect, it } from "vitest";
import { isThemeOption, THEME_OPTIONS, THEME_STORAGE_KEY } from "@/lib/theme";

describe("isThemeOption", () => {
  it("accepts every theme option", () => {
    for (const option of THEME_OPTIONS) expect(isThemeOption(option)).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isThemeOption("sepia")).toBe(false);
    expect(isThemeOption("")).toBe(false);
    expect(isThemeOption(undefined)).toBe(false);
    expect(isThemeOption(null)).toBe(false);
    expect(isThemeOption(1)).toBe(false);
  });

  it("keeps the storage key stable", () => {
    expect(THEME_STORAGE_KEY).toBe("eyepause-theme");
  });
});
