"use client"
import { ReactNode, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { speakText } from "@/utils/textToSpeech"
import { motion } from "framer-motion"
import BotonVolume from "@/components/BotonVolume/BotonVolume"

type CardServicesProps = {
  icon: ReactNode
  iconBg?: string
  title: string
  description: string
  linkHref: string
}

export function CardServices({
  icon,
  iconBg = "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
  title,
  description,
  linkHref,
}: CardServicesProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleCardServicesTTS = () => {
    const text = `${title}. ${description}`
    speakText(text)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        background: "rgba(255, 255, 255, 0.70)",
        boxShadow:
          "0 24px 50px -12px rgba(60, 14, 54, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.90)",
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: "rgba(255, 255, 255, 0.45)",
        backdropFilter: "blur(24px) saturate(170%)",
        WebkitBackdropFilter: "blur(24px) saturate(170%)",
        border: "1px solid rgba(255, 255, 255, 0.70)",
        borderRadius: "var(--radius-uplin-lg)",
        boxShadow:
          "0 12px 40px -8px rgba(60, 14, 54, 0.18), 0 2px 6px rgba(60, 14, 54, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.70)",
        overflow: "hidden",
        position: "relative",
        maxWidth: "780px",
        margin: "0 auto",
        marginBottom: "1.5rem",
        padding: "2rem",
      }}
    >
      {/* Barra superior animada */}
      <motion.div
        animate={{ scaleX: isHovered ? 1 : 0 }}
        style={{
          transformOrigin: "left",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background:
            "linear-gradient(90deg, var(--color-uplin-purple-deep), var(--color-uplin-purple), var(--color-uplin-green))",
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Glow decorativo */}
      <motion.div
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          top: "-50%",
          right: "-30%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--color-uplin-purple-6), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Header — icono a la izquierda, BotonVolume arriba a la derecha */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <motion.div
            animate={{ rotate: isHovered ? -6 : 0, scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.35 }}
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: iconBg,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-uplin-icon)",
            }}
          >
            {icon}
          </motion.div>

          <div
            style={{
              marginTop: "0.75rem",
              fontSize: "var(--text-uplin-h3)",
              fontWeight: 700,
              color: "var(--color-uplin-ink)",
              letterSpacing: "-0.015em",
            }}
          >
            {title}
          </div>
        </div>

        <BotonVolume
          onClick={handleCardServicesTTS}
          ariaLabel={`Escuchar ${title}`}
        />
      </div>

      {/* Descripción */}
      <p
        style={{
          fontSize: "var(--text-uplin-body)",
          color: "var(--color-uplin-ink-soft)",
          lineHeight: "var(--leading-uplin-card)",
          margin: "1rem 0 1.5rem",
        }}
      >
        {description}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          href={linkHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.5rem 1rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--color-uplin-purple-deep)",
            background: "rgba(109,64,152,0.08)",
            borderRadius: "var(--radius-uplin-pill)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-uplin-purple)"
            e.currentTarget.style.color = "white"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(109,64,152,0.08)"
            e.currentTarget.style.color = "var(--color-uplin-purple-deep)"
          }}
        >
          Descubrir más
          <motion.span animate={{ x: isHovered ? 3 : 0 }}>
            <ArrowRight className="w-[12px] h-[12px]" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  )
}
