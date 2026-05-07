import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { testableDiceHandValue, testableDiceRoll } from "../src/untestable2.mjs";

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
    let min;
    let max;
    beforeEach(() => {
      min = 1;
      max = 6;
    })

    test("returns a number", () => {
      const die = testableDiceRoll(min, max);

      expect(die).to.be.a("number");
    });

    test("returns a value greater then minimum", () => {
      const die = testableDiceRoll(min, max);

      expect(die).to.be.least(min, "return value is lesser than minimun value given");
    });

    test("returns a value lesser then maximum", () => {
      const die = testableDiceRoll(min, max);

      expect(die).to.be.most(max, "return value is greater than maximum value given");
    });

    test("throws error when minimum is not a number", () => {
      min = "yksi";

      expect(testableDiceRoll.bind(null, min, max)).to.throw("minimum has to be a number");
    })

    test("throws error when maximum is not a number", () => {
      max = "kuusi";

      expect(testableDiceRoll.bind(null, min, max)).to.throw("maximum has to be a number");
    })
  });
});
