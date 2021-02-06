import chalk from "chalk";
import inquirer from "inquirer";

const execa = require("execa");

async function missingOptions(options) {
  let defaultDirectoryName = "my-app";
  let defaultTemplate = "vanilla";

  if (options.skipPrompts) {
    return {
      ...options,
      directoryName: defaultDirectoryName,
      template: options.template || defaultTemplate,
    };
  }

  let questions = [];
  if (!options.directoryName) {
    questions.push({
      type: "input",
      name: "directoryName",
      message: chalk.green.bold("What's your project name?"),
      default: defaultDirectoryName,
    });
  }
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: chalk.yellow.bold("Choose your project template"),
      choices: [
        "vanilla",
        "vue",
        "vue-ts",
        "react",
        "react-ts",
        "preact",
        "preact-ts",
        "lit-element",
        "lit-element-ts",
      ],
      default: defaultTemplate,
    });
  }

  let answers;
  try {
    answers = await inquirer.prompt(questions);
  } catch (error) {
    throw new Error(error);
  }

  return {
    ...options,
    directoryName: options.directoryName || answers.directoryName,
    template: options.template || answers.template,
  };
}

export async function runVite(opts) {
  const options = await missingOptions(opts);
  await execa("npm", [
    "init",
    "@vitejs/app",
    options.directoryName,
    "--template",
    options.template,
  ]);
}
