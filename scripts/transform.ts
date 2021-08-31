import * as path from "path";
import * as fs from "fs";

const cellsOutdir = "../src/generated/";

const outDir = "../build/notebook/src";
const sourceDir = "../notebook/src";

type TypeScriptCell = {
  language: "typescript";
  sourcePath: string;
  builtPath: string;
};

type MarkdownCell = {
  language: "markdown";
  sourcePath: string;
};

type CSSCell = {
  language: "css";
  sourcePath: string;
};

type Cell = MarkdownCell | CSSCell | TypeScriptCell;

function relativePathAlwaysDot(from: string, to: string) {
  let ret = path.relative(from, to);
  if (!ret.startsWith(".") && !ret.startsWith(path.sep)) {
    ret = "." + path.sep + ret;
  }
  return ret;
}

export function cellFromFile(sourcePath: string): Cell {
  if (sourcePath.endsWith(".tsx")) {
    return {
      language: "typescript",
      sourcePath,
      builtPath: path.join(outDir, path.parse(sourcePath).name + ".js"),
    };
  } else if (sourcePath.endsWith(".css")) {
    return {
      language: "css",
      sourcePath,
    };
  } else if (sourcePath.endsWith(".md")) {
    return {
      language: "markdown",
      sourcePath,
    };
  } else {
    throw new Error("not supported");
  }
}

export function cellsFromDirectory(dir: string) {
  const files = fs.readdirSync(dir);
  return files.map((file) => cellFromFile(path.join(dir, file)));
}

export function buildMarkdownCell(cell: {
  language: "markdown";
  sourcePath: string;
}) {
  const outPath = path.join(outDir, path.parse(cell.sourcePath).name + ".js");

  let markdown = fs.readFileSync(cell.sourcePath, "utf-8");
  let totalCode = `define(["require", "exports", "marked"], function (require, exports, marked) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // const md = markdown_it_1.default({
    //     html: true,
    //     linkify: true,
    //     typographer: true,
    // });
    const render = marked.default(${JSON.stringify(markdown)});
    const el = document.createElement("div");
    el.className = "markdown-body";
    el.innerHTML = render;
    exports.default = el;
    ;
});`;

  fs.writeFileSync(outPath, totalCode);

  return {
    ...cell,
    builtPath: outPath,
  };
}

export function patchAMDOutput(amdPath: string) {
  let totalCode = fs.readFileSync(amdPath, "utf-8");
  totalCode = `export default function(define) { 
    const $ = this.$;

    ${totalCode.replace(
      /^(define\((".*", )?\[.*\], )function/gm,
      "$1async function"
    )}
}`;
  fs.writeFileSync(amdPath, totalCode);
}

export function getCellsFileCode() {
  const cells = cellsFromDirectory(sourceDir);
  const tsCells = cells.filter(
    (c) => c.language === "typescript"
  ) as TypeScriptCell[];

  const cssCells = cells.filter((c) => c.language === "css");

  const mdCells = cells.filter((c) => c.language === "markdown");

  const builtMDCells = mdCells.map(buildMarkdownCell);

  tsCells.forEach((c) => patchAMDOutput(c.builtPath));
  builtMDCells.forEach((c) => patchAMDOutput(c.builtPath));

  const codeImports = [...tsCells, ...builtMDCells].map((cell) => {
    const name = path.parse(cell.builtPath).name;
    const relPath = relativePathAlwaysDot(cellsOutdir, cell.builtPath);
    const relPathParsed = path.parse(relPath);
    return `import * as ${name} from "${path.join(relPathParsed.dir, name)}";`;
  });

  const cssImports = cssCells.map(
    (cell) => `import "${relativePathAlwaysDot(cellsOutdir, cell.sourcePath)}";`
  );

  if (!cssImports.length) {
    const emptyCSSPath = path.join(outDir, "empty.css");
    fs.writeFileSync(
      emptyCSSPath,
      "/* empty placeholder so we always generate css output */"
    );
    cssImports.push(
      `import "${relativePathAlwaysDot(cellsOutdir, emptyCSSPath)}";`
    );
  }

  const names = cells
    .filter((c) => c.language !== "css")
    .map((c) => path.parse(c.sourcePath).name);
  const exportDefault = `export default [${names.join(
    ","
  )}].map(mod => (mod as any).default);`;

  return `
${[...codeImports, ...cssImports].join("\n")}
  
${exportDefault}`;
}

function generateNotebook() {
  const code = getCellsFileCode();
  fs.writeFileSync(path.join(cellsOutdir, "cells.ts"), code);
}

generateNotebook();
// // generate cell overview
// const names = files.map((file) => path.parse(file).name);
// fs.writeFileSync(
//   "../src/generated/cells.ts",
//   `${names
//     .map((file) => `import * as ${file} from "../../build/notebook/${file}";`)
//     .join("\n")}

//     import "../../notebook/test.css";
//     import "../../notebook/test2.css";

// export default [${names.join(",")}].map(mod => (mod as any).default);`
// );
