// const fs = require("fs");
// const t = fs.readFileSync(__dirname + "/package.json", { encoding: "utf-8" });

// console.log(JSON.parse(t).version);

const helpManual = {
  "--install": "install npm dependencies",
  "--git": "initialize git",
  "--yes": "skip prompt and set everything to default",
  "--help": "show help manual",
  "--version": "show create-app-now version",
};

for (const key in helpManual) {
  console.log(`${key}: ${helpManual[key]}`);
}
