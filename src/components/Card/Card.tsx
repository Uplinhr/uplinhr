"use client"
import { ReactNode } from "react"
import { motion } from "framer-motion"
import BotonVolume from "@/components/BotonVolume/BotonVolume"
import { speakText } from "@/utils/textToSpeech"

export interface CardData {
  icon: ReactNode
  iconBg?: string
  title: string
  description: string
}

interface CardProps extends CardData {
  tts?: boolean
  animationDelay?: number
}

const DEFAULT_ICON_BG = "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))"

export default function Card({
  icon,
  iconBg = DEFAULT_ICON_BG,
  title,
  description,
  tts = false,
  animationDelay = 0,
}: CardProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center rounded-[var(--radius-uplin-lg)] p-[1.8rem_1.5rem] border border-white/70"
      style={{
        background: "var(--color-uplin-glass-bg-strong)",
        backdropFilter: "blur(24px) saturate(170%)",
        boxShadow: "var(--shadow-uplin-glass)",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: animationDelay, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ y: -5, scale: 1.02, background: "rgba(255,255,255,0.58)" }}
    >
      <div
        className="w-[54px] h-[54px] rounded-[var(--radius-uplin-md)] flex items-center justify-center text-white mb-4 flex-shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </div>

      <h4
        className="text-[1.15rem] font-bold mb-[0.6rem]"
        style={{ color: "var(--color-uplin-ink)" }}
      >
        {title}
      </h4>

      <p
        className="text-[0.9rem] leading-[1.5] mb-[0.8rem]"
        style={{ color: "var(--color-uplin-ink-soft)" }}
      >
        {description}
      </p>

      {tts && (
        <div className="mt-auto pt-2">
          <BotonVolume
            onClick={() => speakText(`${title}. ${description}`)}
            ariaLabel={`Escuchar ${title}`}
          />
        </div>
      )}
    </motion.div>
  )
}
