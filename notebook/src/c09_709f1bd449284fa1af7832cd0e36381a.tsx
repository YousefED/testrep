import * as React from "react";
export const table = (
  <div>
    {$.routes.map((r, i) => {
      return (
        <>
          <h1>Route {i + 1}</h1>
          <table>
            {r.map((stop) => (
              <tr>
                <td>{stop.Address}</td>
                <td>{stop.Name}</td>
              </tr>
            ))}
          </table>
          <img src={$.qrcodes[i]} />
        </>
      );
    })}
  </div>
);
