"use client";

import { useEffect } from "react";

export default function BotPenguin() {
  useEffect(() => {
    // Evitar insertarlo dos veces
    if (document.getElementById("messenger-widget-b")) return;

    const script = document.createElement("script");
    script.id = "messenger-widget-b";
    script.src = "https://cdn.botpenguin.com/website-bot.js";
    script.defer = true;
    // 👇 Esto es el contenido que va dentro del <script> ... </script> que te da botpenguin
    script.text =
      "691d3cc5d8410c919e36233e,69189d9625ef5190d5561c72,agent";

    document.body.appendChild(script);
  }, []);

  return null;
}






