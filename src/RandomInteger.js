/**
 * Generates a random integer between a minimum and maximum value (inclusive).
 *
 * @param {number} max - The maximum value of the random integer.
 * @param {number} [min=0] - The minimum value of the random integer (default is 0).
 * @returns {number} The randomly generated integer.
 */
function RandomInteger(max, min = 0) {
  return Math.round(min + Math.random() * (max - min));
}

module.exports = RandomInteger