import * as React from "react";
let url = "https://wa.me/?text=";
url += encodeURIComponent(
  $.mapLinks
    .map((l, i) => {
      return `Route ${i + 1}\n${l}`;
    })
    .join("\n\n")
);

export default (
  <a href={url} target="_blank">
    Deel routes op WhatsApp
  </a>
);
