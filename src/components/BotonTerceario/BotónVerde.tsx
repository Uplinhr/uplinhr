"use client"
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface BotonVerdeProps {
  text: string
  onClick?: () => void
  href?: string
  icon?: ReactNode
}

const BotonVerde = ({ text, onClick, href, icon }: BotonVerdeProps) => {
  const styles = {
    background: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))",
    boxShadow: "0 8px 24px rgba(114,191,88,0.35)",
  }

  const className = "inline-flex items-center gap-[0.55rem] px-[2.2rem] py-[0.95rem] rounded-full text-[1rem] font-semibold text-white border-none cursor-pointer"

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        style={styles}
        whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(114,191,88,0.45)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {icon && icon}
        {text}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      type="button"
      className={className}
      style={styles}
      whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(114,191,88,0.45)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {icon && icon}
      {text}
    </motion.button>
  )
}

export default BotonVerde