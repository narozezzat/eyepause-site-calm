import { describe, expect, it } from "vitest";
import { isThemeOption, nextRadioIndex, THEME_OPTIONS, THEME_STORAGE_KEY } from "@/lib/theme";

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

describe("nextRadioIndex", () => {
  it("moves forward with ArrowRight/ArrowDown and wraps", () => {
    expect(nextRadioIndex("ArrowRight", 0, 3)).toBe(1);
    expect(nextRadioIndex("ArrowDown", 1, 3)).toBe(2);
    expect(nextRadioIndex("ArrowRight", 2, 3)).toBe(0);
  });

  it("moves back with ArrowLeft/ArrowUp and wraps", () => {
    expect(nextRadioIndex("ArrowLeft", 2, 3)).toBe(1);
    expect(nextRadioIndex("ArrowUp", 1, 3)).toBe(0);
    expect(nextRadioIndex("ArrowLeft", 0, 3)).toBe(2);
  });

  it("jumps with Home and End", () => {
    expect(nextRadioIndex("Home", 2, 3)).toBe(0);
    expect(nextRadioIndex("End", 0, 3)).toBe(2);
  });

  it("starts from the edges when nothing is selected", () => {
    expect(nextRadioIndex("ArrowRight", -1, 3)).toBe(0);
    expect(nextRadioIndex("ArrowLeft", -1, 3)).toBe(2);
  });

  it("ignores other keys and empty groups", () => {
    expect(nextRadioIndex("Enter", 0, 3)).toBeNull();
    expect(nextRadioIndex("a", 1, 3)).toBeNull();
    expect(nextRadioIndex("ArrowRight", 0, 0)).toBeNull();
  });
});
