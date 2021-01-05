// Base code is by Dominik Kundel @DKundel
// Source code: https://www.twilio.com/blog/how-to-build-a-cli-with-node-js?utm_source=youtube&utm_medium=video&utm_campaign=node-cli-howto
"use strict";

import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";

import { createProject } from "./main.js";

function parseArgumentsIntoOptions(rawArgs) {
  let args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "--help": Boolean,
      "--version": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
      "-h": "--help",
      "-v": "--version",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    directoryName: args._[0],
    runInstall: args["--install"] || false,
    help: args["--help"] || false,
    version: args["--version"] || false,
  };
}

async function missingOptions(options) {
  let defaultDirectoryName = "my-great-app";
  let defaultTemplate = "JavaScript";

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
      message: "What's your project name?",
      default: defaultDirectoryName,
    });
  }
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: chalk.yellow.bold("Choose your project template"),
      choices: ["JavaScript", "TypeScript", "React", "Svelte", "Node", "Deno"],
      default: defaultTemplate,
    });
  }
  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: false,
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
    git: options.git || answers.git,
  };
}

const helpManual = {
  "--install": "install npm dependencies",
  "--git": "initialize git",
  "--yes": "skip prompt and set everything to default",
  "--help": "show help manual",
  "--version": "show create-app-now version",
};

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);

  if (options.help) {
    for (const key in helpManual) {
      console.log(`${key}: ${helpManual[key]}`);
    }
  } else if (options.version) {
    const pkgJSON = fs.readFileSync(path.resolve(__dirname + "/package.json"), {
      encoding: "utf-8",
    });
    console.log(JSON.parse(pkgJSON).version);
  } else {
    options = await missingOptions(options);
    await createProject(options);
  }
}
