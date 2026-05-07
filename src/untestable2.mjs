export function diceRoll() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function diceHandValue() {
  const die1 = diceRoll();
  const die2 = diceRoll();
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}

// I think the core testability issues here are following

// The randomness introduced by diceRoll
//
// diceRoll uses random number between 0 and 1 to imitate dice roll.
// Due to this, we can't control the exact values that diceHandValue receives.
// This makes it impossible to consistently test diceHandValue with specific expected values.

// Things that could be done to address this
//
// 1. Make dies into parameter of diceHandValue
//
//    This would allow us to test specific values for diceHandValue

// 2. Test the randomness of diceRoll with property based testing
//
//    With diceRoll, we can't test specific values, since there are no inputs,
//    and random number is used as multiplier in final calculation
//
//    To address this, we should instead test that the answer contains certain properties.
//    These could be
//    - return value is number
//    - return value is between 1 and 6

// We could test diceHandValue with property based testing, and not change the code.
// However, to me this feels like we are coupling diceHandValue to diceRoll.
// Due to this, I will do both of the suggestions above (unless process makes me change my mind).

export function testableDiceHandValue(die1, die2) {
  if (typeof die1 !== "number" || typeof die2 !== "number") {
    throw new Error("die is not a number");
  }

  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}
