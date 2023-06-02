// For help writing plugins, visit the documentation to get started:
//   https://support.insomnia.rest/article/173-plugins

const RandomInteger = require("./src/RandomInteger");
const PersonalNumber = require("./src/PersonalNumber");

module.exports.templateTags = [
  {
    name: "randomInteger",
    displayName: "Random Integer",
    description: "Generate a random integer.",
    args: [
      {
        displayName: "Minimum",
        description: "Minimum potential value",
        type: "number",
        defaultValue: 0,
      },
      {
        displayName: "Maximum",
        description: "Maximum potential value",
        type: "number",
        defaultValue: 100,
      },
    ],
    async run(context, min, max) {
      return RandomInteger(max, min);
    },
  },
  {
    name: "specificCPF",
    displayName: "Specific CPF",
    description: "Generate a personal number with specific integers.",
    args: [
      {
        displayName: "Filter",
        description: "Filter integers",
        type: "string",
        defaultValue: "|6,9|",
      },
      {
        displayName: "Punctuation",
        description: "Should have punctuation",
        type: "boolean",
        defaultValue: false,
      },
    ],
    run(context, pattern, punct) {
      return PersonalNumber(pattern, punct);
    },
  },
];
