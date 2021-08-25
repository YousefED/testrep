import * as React from "react";
export let inputOrderData = "";

export default (
  <div>
    <p>Recente Orders data uit Google Sheets:</p>
    <textarea
      style={{ width: "500px", height: "200px" }}
      onChange={(e) => ($.inputOrderData = e.target.value)}></textarea>
  </div>
);
