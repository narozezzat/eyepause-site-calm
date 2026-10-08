import { describe, expect, it } from "vitest";
import { remainingSeconds } from "../src/lib/demo";

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
