const RandomInteger = require("./RandomInteger");

/**
 * Retrieves the first digit of an integer.
 * @param {number} number - The integer number.
 * @returns {number} The first digit of the integer.
 */
function getFirstDigit(number) {
  const numberString = Math.abs(number).toString();
  const firstDigit = parseInt(numberString.charAt(0));
  return firstDigit;
}
/**
 * Builds rules for generating a personal number (CPF) based on the given pattern.
 *
 * @param {string} pattern - The pattern to build the rules.
 * @returns {number[][]} The generated rules for the personal number.
 */
function buildRules(pattern) {
  const patterns = pattern.split("|").filter((p) => p !== "");
  let rules = Array.from({ length: 9 }, () => []);

  for (const p of patterns) {
    const [index, value] = p.split(",");
    if (index && value && !isNaN(Number(value)) && index < 9) {
      const normalizedDigit = getFirstDigit(Number(value));
      rules[index].push(normalizedDigit);
    }
  }
  return rules;
}

/**
 * Builds a personal number (CPF) based on the given rules.
 *
 * @param {number[][]} rules - The rules to generate the personal number.
 * @returns {number[]} The generated personal number.
 */
function buildPersonalNumberByRules(rules) {
  for (const index in rules) {
    if (rules[index].length > 0) {
      const options = rules[index];
      const randomIndex = RandomInteger(options.length - 1);
      rules[index] = Number(options[randomIndex]);
    } else {
      rules[index] = RandomInteger(9);
    }
  }
  return rules;
}

/**
 * Adds the verification digits to the personal number (CPF).
 *
 * @param {number[]} digitsArray - The digits of the personal number.
 * @returns {number[]} The personal number with verification digits.
 */
function addVerificationNumbers(digitsArray) {
  const firstDigit = calculateVerificationDigit(digitsArray);
  digitsArray.push(firstDigit);
  const secondDigit = calculateVerificationDigit(digitsArray);
  digitsArray.push(secondDigit);

  // const formattedDigits = calculateVerificationDigit(
  //   calculateVerificationDigit(digitsArray)
  // );
  return digitsArray;
}

/**
 * Calculates the verification digit for the personal number (CPF).
 *
 * @param {number[]} digitsArray - The digits of the personal number.
 * @returns {number[]} The personal number with the calculated verification digit.
 */
function calculateVerificationDigit(digitsArray) {
  let sum = 0;

  for (
    let weight = digitsArray.length + 1, index = 0;
    weight >= 2;
    weight--, index++
  ) {
    sum += parseInt(digitsArray[index]) * weight;
  }

  const checkDigit = sum % 11 === 0 || sum % 11 === 1 ? 0 : 11 - (sum % 11);
  return checkDigit;
  // digitsArray.push(checkDigit);
  // return digitsArray;
}

/**
 * Formats the personal number (CPF) with the appropriate punctuations.
 *
 * @param {number[]} formattedDigits - The digits of the personal number.
 * @returns {string} The formatted personal number.
 */
function formatCPF(formattedDigits) {
  let cpf = formattedDigits.join("");
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  return cpf;
}

/**
 * Generates a personal number (CPF) based on the given pattern and punctuations.
 *
 * @param {string} pattern - The pattern to generate the personal number.
 * @param {boolean} punct - Flag indicating whether to add punctuations to the personal number.
 * @returns {string} The generated personal number.
 */
function GenerateCPF(pattern, punct) {
  const rules = buildRules(pattern);
  const cpfDigits = buildPersonalNumberByRules(rules);
  let personalNumber = addVerificationNumbers(cpfDigits);

  if (punct) {
    personalNumber = formatCPF(cpfDigits);
  } else {
    personalNumber = personalNumber.join("");
  }
  return personalNumber;
}

module.exports = GenerateCPF;
