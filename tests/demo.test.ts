import { describe, expect, it } from "vitest";
import { cycleFraction, formatClock, remainingSeconds } from "../src/lib/demo";

describe("break preview countdown", () => {
  it("keeps a partial second visible", () => {
    expect(remainingSeconds(20000, 0)).toBe(20);
    expect(remainingSeconds(20000, 1001)).toBe(19);
    expect(remainingSeconds(20000, 19999)).toBe(1);
  });
  it("finishes after a delayed background-tab tick without going negative", () => {
    expect(remainingSeconds(20000, 20000)).toBe(0);
    expect(remainingSeconds(20000, 45000)).toBe(0);
  });
});

describe("menu bar clock", () => {
  it("formats seconds as the app's menu bar does", () => {
    expect(formatClock(872)).toBe("14:32");
    expect(formatClock(1200)).toBe("20:00");
    expect(formatClock(5)).toBe("00:05");
  });
  it("never shows a negative or fractional time", () => {
    expect(formatClock(-3)).toBe("00:00");
    expect(formatClock(59.6)).toBe("01:00");
  });
  it("keeps rings and bars within the cycle", () => {
    expect(cycleFraction(600, 1200)).toBe(0.5);
    expect(cycleFraction(1500, 1200)).toBe(1);
    expect(cycleFraction(-1, 1200)).toBe(0);
  });
});
