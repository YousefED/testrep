import * as React from "react";
const table = (
  <div id="table" style={{ maxHeight: 500, overflow: "scroll" }}>
    {$.routes.map((r, i) => {
      return (
        <div className="route">
          <h1>Route {i + 1}</h1>
          <table>
            {r.map((stop: any) => {
              // TODO: this can be faster by looping over $.joined instead of $.routes above
              const match = $.joined.find(
                (el) => el.index === parseInt(stop["#"])
              );
              return (
                <tr>
                  <td>{stop.Arrival}</td>
                  {!!match && (
                    <>
                      <td>{match?.["Samengesteld Adres"]}</td>
                      <td>{match?.Telefoonnummer}</td>
                      <td>{match?.aantal}</td>
                      <td>{match?.Order}</td>
                    </>
                  )}
                  {!match && (
                    <>
                      <td>{stop.Address}</td>
                      <td>Not found</td>
                      <td></td>
                      <td></td>
                    </>
                  )}
                </tr>
              );
            })}
          </table>
          <img src={$.qrcodes[i]} />
        </div>
      );
    })}
  </div>
);

function print(e: any) {
  e.preventDefault();

  const wnd = window.open("", "", "width=600,height=600")!;
  wnd.document.write(`<style>
  @media print {
    .route { page-break-after: always; } /* page-break-after works, as well */
  }

  table {
    table-layout: fixed;
    margin: 0;
    border-collapse: collapse;
  }

  td,
th {
  word-wrap: break-word;
  padding: 0.5em !important;
  border: solid 0.05em black !important;
}
  </style>`);
  wnd.document.write(document.getElementById("table")!.innerHTML);
  wnd.document.close(); //missing code

  wnd.focus();
  wnd.print();

  wnd.onafterprint = function () {
    wnd.close();
  };
}

export default (
  <div>
    <p>
      <a href="" onClick={print}>
        Print routes
      </a>
    </p>
    <div style={{ display: "none" }}>{table}</div>
  </div>
);