import { describe, beforeEach, test } from "vitest";
import { expect } from "chai";
import { testableReadFile, testableParsePeopleCsv } from "../src/untestable3.mjs";

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

    test("throws error with non-existent file", async () => {
      await expect(testableReadFile.bind(null, "")).rejects.toThrowError("invalid file path or non-existent file");
    })
  });

  describe("Parsing peoples", () => {
    let csvData;
    beforeEach(async () => {
      csvData = await testableReadFile("./test/testFiles/ostania.csv");
    })

    test("returns an object", () => {
      const peopleCsv = testableParsePeopleCsv(csvData);

      expect(peopleCsv).to.be.a("array");
    })
  })
});
