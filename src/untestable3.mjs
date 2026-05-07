import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

export async function parsePeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}

// The function both reads data and parses CSV based on the data. This makes testing it already weird,
// since you can't really test the file reading based on the return value.

// The file reading should be separated to another function,
// allowing us to test the parsing of CSV without file operations

// For reading the file, I'll go with the suggestion in part 3 and just use a test file
// in this directory.
