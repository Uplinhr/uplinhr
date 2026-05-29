"use client"
import { ReactNode, useState } from "react"
import { motion } from "framer-motion"
import { SolutionProps } from "@/interfaces"

const DEFAULT_ICON_BG = "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))"

const CardSolution = ({
  icon,
  iconBg = DEFAULT_ICON_BG,
  title,
  description,
}: SolutionProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      animate={{
        boxShadow: isHovered
          ? "var(--shadow-uplin-card-hover)"
          : "var(--shadow-uplin-glass)",
        y: isHovered ? -5 : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: "var(--color-uplin-glass-bg-strong)",
        backdropFilter: "blur(24px) saturate(170%)",
        WebkitBackdropFilter: "blur(24px) saturate(170%)",
        border: "1px solid var(--color-uplin-glass-border)",
        borderRadius: "var(--radius-uplin-lg)",
        boxShadow: "var(--shadow-uplin-glass)",
        padding: "1.8rem 1.4rem",
        textAlign: "center",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ rotate: isHovered ? 8 : 0, scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.35 }}
        style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          margin: "0 auto 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          boxShadow: "0 8px 20px -6px rgba(60,14,54,0.2)",
          background: iconBg,
        }}
      >
        {icon}
      </motion.div>

      <div
        style={{
          fontSize: "var(--text-uplin-h4)",
          fontWeight: 700,
          color: "var(--color-uplin-ink)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>

      <p
        style={{
          fontSize: "var(--text-uplin-sm)",
          color: "var(--color-uplin-ink-soft)",
          lineHeight: "var(--leading-uplin-card)",
        }}
      >
        {description}
      </p>
    </motion.div>
  )
}

export default CardSolution
