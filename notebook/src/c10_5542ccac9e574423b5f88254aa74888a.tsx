import * as React from "react";
import * as papa from "papaparse";

export const labelData = [...$.joined].sort((a, b) => a.index - b.index);

const csv = papa.unparse(labelData);

// export default (
//   <textarea value={csv} style={{ width: "500px", height: "200px" }}></textarea>
// );

function download(e: any) {
  e.preventDefault();
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "labels.csv";
  link.dispatchEvent(new MouseEvent("click"));
}

export default (
  <a href="" onClick={download}>
    Download CSV
  </a>
);
