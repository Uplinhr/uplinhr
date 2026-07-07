import type { Metadata } from "next";
import RecursosView from "@/views/biblioteca/RecursosView";

export const metadata: Metadata = {
  title: "Tu biblioteca de recursos · Uplin",
  description:
    "Material curado para ordenar tu gestión de talento, optimizar procesos y tomar mejores decisiones desde el primer día.",
};

export default function RecursosPage() {
  return <RecursosView />;
}
