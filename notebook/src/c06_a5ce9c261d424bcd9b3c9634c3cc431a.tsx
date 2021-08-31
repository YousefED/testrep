import * as React from "react";
function createGoogleMapsUrl(route: any[]) {
  const url = "https://www.google.com/maps/dir/";
  const locations = [$.start, ...route, $.start].map(
    (stop) => stop.Lat + "," + stop.Lng
  );
  return url + locations.join("/");
}

export const mapLinks = $.routes.map((r) => createGoogleMapsUrl(r));
