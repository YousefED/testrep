import * as React from "react";
import * as qr from "qrcode";

export const qrcodes = await Promise.all(
  $.mapLinks.map((link) => qr.toDataURL(link, { width: 250, height: 250 }))
);
