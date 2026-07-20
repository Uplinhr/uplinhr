import { CardData } from "@/components/Card/Card"
import { Download, FileText, Video } from "lucide-react"

const QueEncontraras: CardData[] = [
  {
    icon: <FileText className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-green)",
    title: "Plantillas accionables",
    description:
      "Documentos listos para adaptar a tu empresa: checklists, guías y marcos de trabajo para liderazgo, talento y procesos.",
  },
  {
    icon: <Video className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-cards)",
    title: "Videos breves y útiles",
    description:
      "Contenido concreto para mejorar gestión, liderazgo y organización del equipo. Sin teoría de manual.",
  },
  {
    icon: <Download className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-orange)",
    title: "Recursos descargables",
    description:
      "Reportes estratégicos, frameworks y herramientas pensadas para aplicar de inmediato en tu operación diaria.",
  },
]

export default QueEncontraras
