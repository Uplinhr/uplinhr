import type { Metadata } from "next";
import GraciasView from "@/views/biblioteca/GraciasView";

export const metadata: Metadata = {
  title: "¡Ya tienes acceso a los recursos! · Uplin",
  description:
    "Registro confirmado. Descarga el material y empieza a optimizar la gestión de tu equipo con mejores decisiones.",
};

export default function GraciasPage() {
  return <GraciasView />;
}
