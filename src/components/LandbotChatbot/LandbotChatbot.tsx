"use client";
import { useEffect } from "react";

// Extendemos el objeto Window para incluir Landbot
declare global {
  interface Window {
    Landbot?: {
      Popup: new (options: { configUrl: string }) => unknown;
    };
    myLandbot?: unknown;
  }
}

export default function LandbotChat() {
  useEffect(() => {
    const initLandbot = () => {
      if (window.myLandbot || !window) return; // Evita múltiples cargas

      const script = document.createElement("script");
      script.type = "module";
      script.async = true;

      script.addEventListener("load", () => {
        if (window.Landbot) {
          window.myLandbot = new window.Landbot.Popup({
            configUrl:
              "https://storage.googleapis.com/landbot.online/v3/H-3167670-ZYQ1G3238J8T2K8G/index.json",
          });
        }
      });

      script.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs";
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    };

    // Escuchamos la primera interacción del usuario
    window.addEventListener("mouseover", initLandbot, { once: true });
    window.addEventListener("touchstart", initLandbot, { once: true });

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("mouseover", initLandbot);
      window.removeEventListener("touchstart", initLandbot);
    };
  }, []);

  return null; // No renderiza nada en el DOM
}
