import { FaExchangeAlt, FaRegHandshake } from "react-icons/fa"
import { GoShieldCheck } from "react-icons/go"
import { MdOutlineCurrencyExchange } from "react-icons/md"
import { CardData } from "@/components/Card/Card"

export const membresiasFeatures: CardData[] = [
  {
    icon: <FaExchangeAlt className="w-[22px] h-[22px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
    title: "Flexibilidad total",
    description: "Elegís el plan que mejor se adapta a tu empresa, con servicios escalables.",
  },
  {
    icon: <FaRegHandshake className="w-[22px] h-[22px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))",
    title: "People-first mindset",
    description: "Potenciamos la cultura y el talento, sin perder el foco en los resultados.",
  },
  {
    icon: <MdOutlineCurrencyExchange className="w-[22px] h-[22px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-orange), var(--color-uplin-orange-dark))",
    title: "Ahorro inteligente",
    description: "Accedés a múltiples soluciones de HR en una sola suscripción mensual.",
  },
  {
    icon: <GoShieldCheck className="w-[22px] h-[22px]" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-purple-3), var(--color-uplin-purple-2))",
    title: "HR Advisor dedicado",
    description: "Persona experta en HR para brindarte soporte, consultorías y acompañarte en decisiones estratégicas de talento.",
  },
]
