import { Repeat2, ShieldCheck, TrendingUp, Layers } from "lucide-react"
import { CardData } from "@/components/Card/Card"

export const creditosFeatures: CardData[] = [
  {
    icon: <Repeat2 className="w-[26px] h-[26px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
    title: "Flexible",
    description: "Armá tu búsqueda combinando perfiles de distintos niveles. Sin vencimientos: usá los créditos cuando quieras.",
  },
  {
    icon: <ShieldCheck className="w-[26px] h-[26px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))",
    title: "Garantía",
    description: "Cada proceso incluye 3 meses de garantía con la flexibilidad de extensión por perfiles.",
  },
  {
    icon: <TrendingUp className="w-[26px] h-[26px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-orange), var(--color-uplin-orange-dark))",
    title: "Ahorro",
    description: "Accedé a descuentos por volumen en planes Pro, Premium y Platinum.",
  },
  {
    icon: <Layers className="w-[26px] h-[26px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-purple-3), var(--color-uplin-purple-2))",
    title: "Escalable y a la medida",
    description: "Avanzá con un proceso mínimo y sumá créditos adicionales para ampliar necesidades.",
  },
]
