import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("returns a number", () => {
    const testDate = new Date(2026, 4, 7, 3, 0, 0, 0);
    expect(daysUntilChristmas(testDate)).to.be.a("number");
  });
});
