import * as React from "react";
export let inputRouteData = `

`;

export default (
  <div>
    <p>RouteXL uitvoer:</p>
    <textarea
      style={{ width: "500px", height: "200px" }}
      onChange={(e) => ($.inputRouteData = e.target.value)}></textarea>
  </div>
);
