"use client"
import { Repeat2, ShieldCheck, TrendingUp, Layers } from "lucide-react"
import { motion } from "framer-motion"
import BotonVolume from "@/components/BotonVolume/BotonVolume"
import { speakText } from "@/utils/textToSpeech"

const features = [
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

export default function CardBeneficiosCreditos() {
  return (
    <section className="w-full max-w-[1280px] mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center text-center rounded-[var(--radius-uplin-lg)] p-[1.8rem_1.5rem] border border-white/70"
            style={{
              background: "var(--color-uplin-glass-bg-strong)",
              backdropFilter: "blur(24px) saturate(170%)",
              boxShadow: "var(--shadow-uplin-glass)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            whileHover={{ y: -5, scale: 1.02, background: "rgba(255,255,255,0.58)" }}
          >
            <div
              className="w-[54px] h-[54px] rounded-[var(--radius-uplin-md)] flex items-center justify-center text-white mb-4 flex-shrink-0"
              style={{ background: feature.iconBg }}
            >
              {feature.icon}
            </div>

            <h4
              className="text-[1.15rem] font-bold mb-[0.6rem]"
              style={{ color: "var(--color-uplin-ink)" }}
            >
              {feature.title}
            </h4>

            <p
              className="text-[0.9rem] leading-[1.5] mb-[0.8rem]"
              style={{ color: "var(--color-uplin-ink-soft)" }}
            >
              {feature.description}
            </p>

            <div className="mt-auto pt-2">
              <BotonVolume
                onClick={() => speakText(`${feature.title}. ${feature.description}`)}
                ariaLabel={`Escuchar ${feature.title}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
