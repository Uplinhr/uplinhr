import { Layers, PiggyBank, Users, TrendingUp } from "lucide-react"
import { CardData } from "@/components/Card/Card"

export const solutionsCards: CardData[] = [
  {
    icon: <Layers className="w-[28px] h-[28px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
    title: "Flexibilidad",
    description: "Adaptabilidad total a las necesidades cambiantes de la empresa.",
  },
  {
    icon: <PiggyBank className="w-[28px] h-[28px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-orange), var(--color-uplin-orange-dark))",
    title: "Ahorro de costos",
    description: "Más valor, menos costos asociados a consultorías tradicionales.",
  },
  {
    icon: <Users className="w-[28px] h-[28px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))",
    title: "Acceso a expertos",
    description: "Disponibilidad de un equipo de RRHH especializado.",
  },
  {
    icon: <TrendingUp className="w-[28px] h-[28px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-purple-3), var(--color-uplin-purple-2))",
    title: "Escalabilidad",
    description: "Ajuste de servicios según el crecimiento o la necesidad.",
  },
]
