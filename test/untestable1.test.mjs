import { describe, test } from "vitest";
import { expect } from "chai";
import { testableDaysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("returns a number", () => {
    const testDate = new Date(2025, 4, 7, 3, 0, 0, 0);
    expect(testableDaysUntilChristmas(testDate)).to.be.a("number");
  });

  test("returns correct amount of days", () => {
    const testDate = new Date(2025, 12 - 1, 22, 3, 0, 0, 0);
    expect(testableDaysUntilChristmas(testDate)).to.be.equal(3, "kolme yötä jouluun on...");
  });

  test("throws error with no date provided", () => {
    let testDate;
    expect(testableDaysUntilChristmas.bind(testDate)).to.throw("date missing");
  })

  test("throws error with invalid type of input", () => {
    const testDate = "2023/12/01"
    expect(testableDaysUntilChristmas.bind(testDate)).to.throw("invalid date");
  });
});
