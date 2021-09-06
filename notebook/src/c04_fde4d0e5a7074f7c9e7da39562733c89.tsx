import * as React from "react";
export const matchedAddresses = $.joined.filter((a) => a["index"]).length;
const unmatchedAddresses = $.joined.filter(
  (a) =>
    a["index"] === undefined &&
    !a["Samengesteld Adres"].toLowerCase().includes("afhaal")
);

export const afhaal = $.parsedOrderData.filter((a) =>
  a["Samengesteld Adres"].toLowerCase().includes("afhaal")
).length;

export const error = matchedAddresses + afhaal !== $.parsedOrderData.length;

if (
  unmatchedAddresses.length !==
  $.parsedOrderData.length - matchedAddresses - afhaal
) {
  throw new Error("Er lijkt iets mis te gaan met de berekening");
}

export default (
  <div>
    {error ? (
      <h1 style={{ color: "red",marginBottom:".5em" }}>Adressen komen niet overeen</h1>
    ) : (
        <h1 style={{ color: "green", marginBottom: ".5em" }}> Adressen komen overeen</h1>
    )}
    <table>
      <tr>
        <td>Gevonden afhaal adressen</td>
        <td>{afhaal}</td>
      </tr>
      <tr>
        <td>Gevonden bezorg adressen</td>
        <td>{matchedAddresses}</td>
      </tr>
      <tr>
        <td>
          <strong>Totaal</strong>
        </td>
        <td>
          <strong>{afhaal + matchedAddresses}</strong>
        </td>
      </tr>
    </table>
    {error && (
      <div>
        <p>
          <em>
            Verwacht totaal: {$.parsedOrderData.length} op basis van de Recente
            Orders sheet
          </em>
        </p>
        <p>Niet gevonden adressen in RouteXL:</p>
        <ul>
          {unmatchedAddresses.map((a, i) => (
            <li key={i}>{a["Samengesteld Adres"]}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
