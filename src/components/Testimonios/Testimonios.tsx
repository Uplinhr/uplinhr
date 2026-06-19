"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import SectionTag from "../SectionTag/SectionTag"

const testimonios = [
  {
    id: 1,
    text: "Destaco la rapidez para conseguir candidatos y la calidad de los mismos",
    name: "Nicolás Montoya",
    role: "Engineering Manager - Olaclick",
    initials: "NM",
    avatarBg: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
  },
  {
    id: 2,
    text: "El modelo de créditos nos dio la flexibilidad que necesitábamos. Pagamos solo por lo que usamos y el acompañamiento del equipo fue excepcional en todo momento.",
    name: "Carlos Mendoza",
    role: "CHRO · Retail Group",
    initials: "CM",
    avatarBg: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))",
  },
  {
    id: 3,
    text: "La membresía de Uplin es lo mejor que incorporamos este año. Tenemos soporte de RRHH experto sin necesidad de armar un departamento interno.",
    name: "Laura Sánchez",
    role: "Directora · Consultora PyME",
    initials: "LS",
    avatarBg: "linear-gradient(135deg, var(--color-uplin-orange), var(--color-uplin-orange-dark))",
  },
]

const delays = [0, 0.15, 0.3]

function TestimonioCard({ testimonio, delay }: { testimonio: typeof testimonios[0]; delay: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: "var(--color-uplin-glass-bg-strong)",
        backdropFilter: "blur(24px) saturate(170%)",
        WebkitBackdropFilter: "blur(24px) saturate(170%)",
        border: "1px solid var(--color-uplin-glass-border)",
        borderRadius: "var(--radius-uplin-lg)",
        padding: "2rem",
        boxShadow: isHovered
          ? "var(--shadow-uplin-card-hover)"
          : "var(--shadow-uplin-glass)",
        position: "relative",
        overflow: "hidden",
        minWidth: "280px",
        transition: "box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Estrellas */}
      <div style={{ display: "flex", gap: "0.15rem", marginBottom: "1rem" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={18}
            height={18}
            fill="var(--color-uplin-orange)"
            color="var(--color-uplin-orange)"
          />
        ))}
      </div>

      {/* Texto */}
      <p
        style={{
          fontSize: "var(--text-uplin-body)",
          lineHeight: "var(--leading-uplin-body)",
          color: "var(--color-uplin-ink-soft)",
          marginBottom: "1.5rem",
          fontStyle: "italic",
        }}
      >
        &ldquo;{testimonio.text}&rdquo;
      </p>

      {/* Autor */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: testimonio.avatarBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "1rem",
            color: "white",
            flexShrink: 0,
          }}
        >
          {testimonio.initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: "var(--text-uplin-body)",
              color: "var(--color-uplin-ink)",
            }}
          >
            {testimonio.name}
          </span>
          <span
            style={{
              fontSize: "var(--text-uplin-xs)",
              color: "var(--color-uplin-ink-muted)",
            }}
          >
            {testimonio.role}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonios() {
  return (
    <motion.section
      id="testimonios"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      style={{
        padding: "var(--spacing-uplin-lg) 0",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        {/* Encabezado */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 780,
            margin: "0 auto",
            marginBottom: "3rem",
          }}
        >
          <SectionTag text="TESTIMONIOS" />
          <h2
            style={{
              fontSize: "var(--text-uplin-h2)",
              fontWeight: 700,
              letterSpacing: "var(--tracking-uplin-h2)",
              lineHeight: "var(--leading-uplin-title)",
              color: "var(--color-uplin-ink)",
              marginBottom: "1rem",
            }}
          >
            Lo que dicen{" "}
            <span className="gradient-purple-green">nuestros clientes</span>
          </h2>
          <p
            style={{
              fontSize: "var(--text-uplin-lead)",
              color: "var(--color-uplin-ink-soft)",
              lineHeight: "var(--leading-uplin-body)",
            }}
          >
            Empresas que ya confían en Uplin para gestionar su talento
          </p>
        </div>

        {/* Grilla de cards */}
        <div className="flex lg:grid lg:grid-cols-3 gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
          {testimonios.map((testimonio, i) => (
            <TestimonioCard key={testimonio.id} testimonio={testimonio} delay={delays[i]} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
