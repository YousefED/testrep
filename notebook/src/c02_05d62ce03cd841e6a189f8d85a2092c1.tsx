import * as React from "react";
export let inputOrderData = "";

export default (
  <div>
    <p>Recente Orders data uit Google Sheets:</p>
    <p>
      <em>(Ctrl+A en dan Ctrl+C in de Recente Orders sheet)</em>
    </p>
    <textarea
      style={{ width: "500px", height: "200px", marginTop: "1em" }}
      onChange={(e) => ($.inputOrderData = e.target.value)}></textarea>
  </div>
);
