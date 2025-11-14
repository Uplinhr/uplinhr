"use client";
import { useEffect } from "react";

export default function BotPenguin() {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "messenger-widget-b";
    script.src = "https://cdn.botpenguin.com/website-bot.js";
    script.defer = true;
    script.innerHTML =
      "69168f84b1cc7221bc302bec,69168daf25ef5190d5330071,agent";
    document.body.appendChild(script);
  }, []);

  return null; // no renderiza nada visible, solo inyecta el script
}

