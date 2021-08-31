import * as React from "react";
import * as papa from "papaparse";

export const parsedRouteData = papa.parse($.inputRouteData.trim(), {
  header: true,
  // quoteChar: '"',
  // delimiter: ",",
}).data;

export const parsedOrderData = papa.parse($.inputOrderData.trim(), {
  header: true,
}).data;

// https://stackoverflow.com/questions/17880476/joins-in-javascript
const leftJoin = (objArr1: any[], objArr2: any[], key1: string, key2: string) =>
  objArr1.map((anObj1) => {
    const index = objArr2.findIndex(
      (anObj2) =>
        anObj1[key1].replace(/\s/gi, "").toLowerCase() ===
        anObj2[key2].replace(/\s/gi, "").toLowerCase()
    );
    return {
      index: index > -1 ? index : undefined,
      ...anObj1,
    };
  });

export const joined = leftJoin(
  parsedOrderData,
  parsedRouteData,
  "Samengesteld Adres",
  "Name"
);
