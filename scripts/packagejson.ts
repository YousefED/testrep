// TODO

import _ = require("lodash");
import cells from "../src/generated/cells";
import {
  getModulesFromDefineCaller,
  unnamedModule,
} from "../src/engine/modules";
import * as fs from "fs";
import * as path from "path";

const modules = _.flatMap(cells as any, getModulesFromDefineCaller);
const dependencies = _.flatMap(
  modules.map((mod) => mod.dependencyArray)
).filter(
  (dep) => dep !== "exports" && dep !== "require" && dep !== "typecellutils"
);

const packageJson = JSON.parse(fs.readFileSync("../package.json", "utf-8"));

packageJson.dependencies = {
  lodash: "^4.17.20",
  loglevel: "^1.7.0",
  "loglevel-plugin-prefix": "^0.8.4",
  mobx: "^6.3.2",
};

dependencies.forEach((dep) => {
  packageJson.dependencies.dep = "latest";
});

fs.writeFileSync("../package.json", JSON.stringify(packageJson));

// fs.writeFileSync(
//   "../src/generated/nodemodules.ts",
//   `${dependencies.map((dep) => `import * as ${dep} from "dep";`).join("\n")}

// export default ${JSON.stringify(dependencies)};`
// );
