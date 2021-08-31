import * as React from "react";
export const matchedAddresses = $.joined.filter((a) => a["index"]).length;

export const afhaal = $.parsedOrderData.filter((a) =>
  a["Samengesteld Adres"].toLowerCase().includes("afhaal")
).length;

export const error = matchedAddresses + afhaal !== $.parsedOrderData.length;

export default (
  <div>
    {error ? (
      <h1 style={{ color: "red" }}>Adressen komen niet overeen</h1>
    ) : (
      <h1 style={{ color: "green" }}> Adressen komen overeen</h1>
    )}
    <p>Afhaal adressen: {afhaal}</p>
    <p>Bezorg adressen: {matchedAddresses}</p>
  </div>
);
