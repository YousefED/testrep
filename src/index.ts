// import type { IContext } from "../notebook/types/index";

import { observable } from "mobx";
import React from "react";
import type UserCode from "../build/notebook/types";
import { createContext } from "./engine/context";
import { runModule } from "./engine/executor";
import {
  createExecutionScope,
  getModulesFromDefineCaller,
} from "./engine/modules";
import userCells from "./generated/cells";
export { toJS } from "mobx";
// TODO: pass in via execution scope
global.fetch = require("node-fetch");

function isReactView(value: any): boolean {
  return React.isValidElement<any>(value) && value.props.__tcObservable;
}

function parseExports(exports: any, context: any) {
  const newExports: any = {};
  for (let propertyName in exports) {
    if (propertyName === "default") {
      // default exports are not on typecellContext.context
      newExports.default = exports[propertyName];
    } else if (isReactView(exports[propertyName])) {
      Object.defineProperty(newExports, propertyName, {
        get: () => {
          return exports[propertyName];
        },
      });
    } else {
      // Create a shallow "getter" that just returns the variable from the typecellContext.
      // This way deep modifications and modifications from other cells ($.x = "val")
      // are reflected in Output
      delete newExports[propertyName];
      Object.defineProperty(newExports, propertyName, {
        get: () => {
          return context[propertyName];
        },
      });
    }
  }
  return newExports;
}

export function getNotebook() {
  const context = createContext<UserCode.IContext>();

  // TODO: executionscope doesn't work well here as it's currently hardcoded in generator script
  const scope = createExecutionScope(context);
  const modules = userCells.flatMap((c) =>
    getModulesFromDefineCaller(c, scope)
  );

  const cells = modules.map((mod) => {
    return observable(
      {
        output: {},
      },
      undefined,
      { deep: false }
    );
  });

  async function initialize() {
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const execution = await runModule(
        module,
        context,
        async (module) => {
          // if (module === "lodash") {
          //   return _;
          // }
          return await import(
            /* webpackIgnore: true */ "https://cdn.skypack.dev/" + module
          );
          //throw new Error("not implemented, import " + module);
        },
        () => {},
        (exports: any) => {
          cells[i].output = parseExports(exports, context.context);
        },
        (error) => {
          console.error(error);
          cells[i].output = error;
        }
      );
      await execution.initialRun;
    }
  }

  return {
    context: context.context,
    initializeResult: initialize(),
    cells,
  };
}

async function start() {
  const nb = await getNotebook();
  console.log(JSON.stringify(nb));
  // setTimeout(() => {
  //   console.log(JSON.stringify(nb));
  //   nb.y = 100;
  //   console.log(JSON.stringify(nb), "after");
  //   setTimeout(() => {
  //     console.log(JSON.stringify(nb));
  //   }, 1000);
  // }, 1000);
}
start();
