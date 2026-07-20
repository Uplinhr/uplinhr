import { CardData } from "@/components/Card/Card"
import { FileText, Handshake, SlidersHorizontal, SquarePen, Users, Zap } from "lucide-react"

const Needs: CardData[] = [
  {
    icon: <SquarePen className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-cards)",
    title: "Personalización",
    description: "Consultoría flexible y a medida",
  },
  {
    icon: <Zap className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-cards)",
    title: "Hiring a tu ritmo",
    description: "Vacantes para búsquedas de talento",
  },
  {
    icon: <Handshake className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-cards)",
    title: "Acompañamiento",
    description: "Apoyo profesional de expertos",
  },
  {
    icon: <Users className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-cards)",
    title: "Comunidad",
    description: "Networking y contacto",
  },
  {
    icon: <FileText className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-cards)",
    title: "Herramientas y Formación",
    description: "Recursos prácticos, Workshops y webinars en vivo",
  },
  {
    icon: <SlidersHorizontal className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-cards)",
    title: "Soporte",
    description: "Email y reuniones online",
  },
]

export default Needs
