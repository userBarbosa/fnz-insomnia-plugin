// Assuming you have Jest installed and configured in your project

// Import the PersonalNumber function
const { PersonalNumber } = require("../src");

describe("PersonalNumber", () => {
  test("should generate a valid CPF without punctuations", () => {
    const pattern = "|6,6|";
    const punct = false;

    const cpf = PersonalNumber(pattern, punct);

    // Assert that the generated CPF is a string
    expect(typeof cpf).toBe("string");

    // Assert that the generated CPF has the correct length
    expect(cpf.length).toBe(11);

    // Assert that the generated CPF contains only digits
    expect(/^\d+$/.test(cpf)).toBe(true);

    // Assert that the generated CPF is following the rules specified
    expect(cpf.charAt(6)).toMatch(/6/);
  });

  test("should generate a valid CPF with punctuations", () => {
    const pattern = "|6,6|";
    const punct = true;

    const cpf = PersonalNumber(pattern, punct);

    // Assert that the generated CPF is a string
    expect(typeof cpf).toBe("string");

    // Assert that the generated CPF has the correct length
    expect(cpf.length).toBe(14);

    // Assert that the generated CPF has the correct format with punctuations
    expect(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)).toBe(true);

    // Assert that the generated CPF is following the rules specified
    expect(cpf.charAt(8)).toMatch(/6/);
  });
});
