import { describe, test } from "vitest";
import { expect } from "chai";
import { diceRoll, testableDiceHandValue } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  describe("Dice hand value", () => {
    test("returns a number with different dies", () => {
      const die1 = 1;
      const die2 = 2;
      expect(testableDiceHandValue(die1, die2)).to.be.a("number");
    });

    test("returns a number with same dies", () => {
      const die1 = 1;
      const die2 = 1;
      expect(testableDiceHandValue(die1, die2)).to.be.a("number");
    });

    test("returns higher die value with different dies", () => {
      const lower = 1;
      const higher = 5;
      expect(testableDiceHandValue(lower, higher)).to.equal(higher);
    });

    test("returns die value + 100 with same dies", () => {
      const die1 = 1;
      const die2 = 1;
      expect(testableDiceHandValue(die1, die2)).to.equal(die1 + 100);
    });

    test("throws error when die is not a number", () => {
      const die1 = 1;
      const die2 = "kaksi";
      expect(testableDiceHandValue.bind(null, die1, die2)).to.throw("die is not a number");
    });
  });

  describe("Dice roll", () => {
    test("returns a number", () => {
      const die = diceRoll();

      expect(die).to.be.a("number");
    });
  });
});
