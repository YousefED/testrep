import * as React from "react";
export let inputRouteData = `

`;

export default (
  <div>
    <p>RouteXL uitvoer:</p>
    <p>
      <em>(Klik Download -> Clipboard in RouteXL en selecteer "Add Headers")</em>
    </p>
    <textarea
      style={{ width: "500px", height: "200px", marginTop:"1em" }}
      onChange={(e) => ($.inputRouteData = e.target.value)}></textarea>
  </div>
);
