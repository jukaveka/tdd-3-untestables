const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}

// The issue with testing this code is that it uses current time
// This time will change every time test is run, so it's hard to make assertions regarding the result.

// The way to make this testable should be giving the "now" time as a parameter to this method
// That way, we can write tests where the method is called with same time always
// In production, the method can be given the current time instead.

function invalidType(input) {
  return (
    typeof input !== "object" ||
    typeof input.getDate() !== "number" ||
    typeof input.getMonth() !== "number" ||
    typeof input.getFullYear() !== "number"
  );
}

export function testableDaysUntilChristmas(now) {
  if (!now) {
    throw new Error("date missing");
  } else if (invalidType(now)) {
    throw new Error("invalid type of date");
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
