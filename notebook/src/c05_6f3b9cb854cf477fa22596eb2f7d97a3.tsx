import * as React from "react";
import _ from "lodash";

function chunkBy(collection, predicate, context) {
  var chunks = [];
  var prevKey = null;
  var chunkValues = [];
  _.each(collection, function (value) {
    var key = predicate.apply(context, arguments);
    if (key == prevKey) {
      chunkValues.push(value);
    } else {
      // Guard against init values
      if (chunkValues.length) {
        chunks.push([prevKey, chunkValues]);
      }
      prevKey = key;
      chunkValues = [value];
    }
  });
  // Push hanging values
  if (chunkValues.length) {
    chunks.push([prevKey, chunkValues]);
  }
  return chunks;
}

export const start = $.parsedRouteData[0];

export let routes: string = chunkBy(
  $.parsedRouteData,
  (el) => el.Address === start.Address
)
  .filter((c) => c[0] === false)
  .map((c) => c[1]);
