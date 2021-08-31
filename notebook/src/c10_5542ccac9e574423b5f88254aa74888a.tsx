import * as React from "react";
import * as papa from "papaparse";

export const labelData = [...$.joined].sort((a, b) => a.index - b.index);

const csv = papa.unparse(labelData);

export default (
  <textarea value={csv} style={{ width: "500px", height: "200px" }}></textarea>
);
