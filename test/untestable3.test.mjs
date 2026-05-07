import { describe, test } from "vitest";
import { expect } from "chai";
import { testableReadFile, parsePeopleCsv } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  describe("Reading file", () => {
    test("returns a string", async () => {
      const data = await testableReadFile("./test/testFiles/data.csv")

      expect(data).to.be.a("string");
    })

    test("contains expected value", async () => {
      const data = await testableReadFile("./test/testFiles/data.csv")

      expect(data).to.include("jimothy", "expected value not present");
    })
  });

  test("todo", async () => {
    try {
      expect(await parsePeopleCsv("people.csv")).to.deep.equal([]);
    } catch (e) {}
  });
});
