import { CardData } from "@/components/Card/Card"
import { BookOpen, LockKeyholeOpen, TrendingUp, Zap } from "lucide-react"

const Beneficios: CardData[] = [
  {
    icon: <LockKeyholeOpen className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-cards)",
    title: "Acceso gratuito a recursos exclusivos",
    description:
      "Material premium pensado para founders, CEOs y equipos en crecimiento. Sin paywall.",
  },
  {
    icon: <BookOpen className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-orange)",
    title: "Guías prácticas, no teoría",
    description:
      "Documentos y videos para ordenar procesos y tomar mejores decisiones desde el día uno.",
  },
  {
    icon: <TrendingUp className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-green)",
    title: "Pensado para empresas en crecimiento",
    description:
      "Contenido para startups y empresas que necesitan escalar sin sumar fricción interna.",
  },
  {
    icon: <Zap className="w-[22px] h-[22px]" />,
    iconBg: "var(--color-uplin-cards)",
    title: "Aplicable desde el primer día",
    description:
      "Puerta de entrada a servicios más estratégicos: consultoría, acompañamiento y diagnóstico.",
  },
]

export default Beneficios
