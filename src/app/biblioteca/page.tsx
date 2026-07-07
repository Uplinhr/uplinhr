import type { Metadata } from "next";
import BibliotecaView from "@/views/biblioteca/BibliotecaView";

export const metadata: Metadata = {
  title: "Uplin · Recursos estratégicos para escalar tu equipo",
  description:
    "Accede gratis a guías, plantillas y webinars exclusivos pensados para founders, CEOs y líderes que quieren ordenar su gestión de talento, optimizar procesos y crecer con más claridad.",
};

export default function BibliotecaPage() {
  return <BibliotecaView />;
}
