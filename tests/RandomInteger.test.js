const { RandomInteger } = require("../src");

describe("RandomInteger", () => {
  test("should generate a random integer within the specified range", () => {
    const min = 5;
    const max = 10;

    const randomInt = RandomInteger(max, min);

    // Assert that the generated random integer is a number
    expect(typeof randomInt).toBe("number");

    // Assert that the generated random integer is greater than or equal to the minimum value
    expect(randomInt).toBeGreaterThanOrEqual(min);

    // Assert that the generated random integer is less than or equal to the maximum value
    expect(randomInt).toBeLessThanOrEqual(max);
  });
});
