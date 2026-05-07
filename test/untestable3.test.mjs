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
      const people = testableParsePeopleCsv(csvData);

      expect(people).to.be.a("array");
    })

    test("returns correct data", () => {
      const people = testableParsePeopleCsv(csvData);
      const expectedPeople = [
        {firstName: "Loid", lastName: "Forger", gender: "m"},
        {firstName: "Anya", lastName: "Forger", gender: "f", age: 6},
        {firstName: "Yor", lastName: "Forger", gender: "f", age: 27}
      ]

      expect(people).to.deep.equal(expectedPeople);
    })


    test("can parse people with no age included", () => {
      const people = testableParsePeopleCsv(csvData);
      const ageless = people.filter((person) => !person.age)

      expect(ageless).to.not.have.key("age");
    })
  })
});
