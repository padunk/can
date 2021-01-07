import fs from "fs";
import chalk from "chalk";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import execa from "execa";
import Listr from "listr";
import { projectInstall } from "pkg-install";

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplate(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    filter: (file) => {
      if (!options.git) {
        return !/\.gitignore/.test(file);
      }
      return true;
    },
    clobber: false,
  });
}

async function gitInit(options) {
  let result = await execa("git", ["init"], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    Promise.reject(new Error("Failed to initialize Git"));
  }
  return;
}

function changeTitle(title, filePath) {
  const sourceFilePath = path.join(filePath, "/public/index.html");
  const targetFilePath = path.join(title, "/public/index.html");

  fs.readFile(sourceFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("HTML template file not found.", chalk.red.bold("ERROR"));
    }
    const newFile = data.replace(/My great app/, title);
    fs.writeFile(targetFilePath, newFile, "utf8", (err) => {
      if (err) {
        console.error("Failed to change the HTML title.", chalk.red.bold("ERROR"));
      }
    });
  });
}

export async function createProject(options) {
  let opts = {
    ...options,
    targetDirectory: options.directoryName,
  };
  fs.mkdirSync(opts.directoryName);

  let currentFileUrl = import.meta.url;
  currentFileUrl = currentFileUrl.replace("file:///", "");

  let templateDir = path.resolve(currentFileUrl, "../templates", options.template.toLowerCase());
  opts.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    console.error("Invalid template", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  let tasks = new Listr([
    {
      title: "Copy template files",
      task: () => copyTemplate(opts),
    },
    {
      title: "Change template title",
      task: () => changeTitle(opts.targetDirectory, opts.templateDirectory),
    },
    {
      title: "Initialize git",
      task: () => gitInit(opts),
      enabled: () => options.git,
    },
    {
      title: "Install dependencies",
      task: async () =>
        await projectInstall({
          cwd: opts.targetDirectory,
        }),
      skip: () =>
        !opts.runInstall && "Type --install or / -i to automatically install dependencies.",
    },
  ]);

  await tasks.run();
  console.log("%s project ready", chalk.green.bold("DONE"));
  console.log("---");
  console.log("cd %s", chalk.yellow(options.directoryName));
  console.log("npm run start or npm run dev");
  console.log("%s", chalk.cyan.bold("Happy Hacking!"));
  console.log("---");
  return true;
}
