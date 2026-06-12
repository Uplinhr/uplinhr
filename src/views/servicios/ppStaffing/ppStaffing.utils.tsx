import { SlidersHorizontal, Users2, Target } from "lucide-react"
import { CardData } from "@/components/Card/Card"

export const ppStaffingServices: CardData[] = [
  {
    icon: <SlidersHorizontal className="w-[26px] h-[26px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
    title: "Optimización de procesos",
    description: "Mejoramos tus procesos de onboarding, gestión del desempeño y experiencia del empleado.",
  },
  {
    icon: <Users2 className="w-[26px] h-[26px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-orange), var(--color-uplin-orange-dark))",
    title: "Gestión de alto volumen",
    description: "Manejamos picos altos de vacantes activas y procesos de selección masivos.",
  },
  {
    icon: <Target className="w-[26px] h-[26px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))",
    title: "Proyectos estratégicos",
    description: "Implementamos sistemas de gestión, políticas de RR.HH. y transformación cultural.",
  },
]
