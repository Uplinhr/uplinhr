"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Volume2, TrendingUp, Eye, Puzzle, ArrowRight, CoffeeIcon} from "lucide-react"
import { speakText } from "@/utils/textToSpeech"
import SectionTag from "../SectionTag/SectionTag"
import BotonVolume from "../BotonVolume/BotonVolume"

const alliances = [
  {
    id: 1,
    title: "Co-Crecimiento",
    description: "Oportunidades conjuntas de negocio y nuevos proyectos.",
    icon: <TrendingUp className="w-5 h-5" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))",
  },
  {
    id: 2,
    title: "Visibilidad",
    description: "Aparece en nuestro ecosistema y acciones compartidas.",
    icon: <Eye className="w-5 h-5" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
  },
  {
    id: 3,
    title: "Integración",
    description: "Amplía tu portafolio con staffing, créditos y consultoría.",
    icon: <Puzzle className="w-5 h-5" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-orange), var(--color-uplin-orange-dark))",
  },
  {
    id: 4,
    title: "Soporte",
    description: "Materiales, entrenamiento y acompañamiento continuo.",
    icon: <CoffeeIcon className="w-5 h-5" />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-purple-3), var(--color-uplin-purple-2))",
  },
]

export const StrategicAlliances = () => {
  const [isCTAHovered, setIsCTAHovered] = useState(false)

  const handleTTS = () => {
    const text =
      "Programa de alianzas estratégicas. En Uplin creemos en el poder de la colaboración. Nuestro programa de alianzas estratégicas está diseñado para conectar con empresas que, como nosotros, impulsan el crecimiento y la innovación en el talento humano. Buscamos consultoras de Recursos Humanos, empresas de tecnología, agencias de reclutamiento, y proveedores de servicios complementarios que quieran potenciar su propuesta de valor junto a nosotros."
    speakText(text)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      style={{ padding: "var(--spacing-uplin-xl) 0 var(--spacing-uplin-lg)", position: "relative" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1.25rem, 4vw, 3rem)" }}>
        {/* Card glassmorphism principal — grid responsive */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center"
          style={{
            background: "var(--color-uplin-glass-bg-strong)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid var(--color-uplin-glass-border)",
            borderRadius: "var(--radius-uplin-xl)",
            boxShadow: "var(--shadow-uplin-glass)",
            padding: "clamp(2rem, 5vw, 4rem)",
            position: "relative",
            overflow: "hidden",
            gap: "3rem",
          }}
        >
          {/* Blob verde decorativo */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              right: "-20%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(114,191,88,0.3), transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
          {/* Blob naranja decorativo */}
          <div
            style={{
              position: "absolute",
              bottom: "-30%",
              left: "-15%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(248,154,28,0.2), transparent 70%)",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />

          {/* ── Columna izquierda ── */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Eyebrow badge */}
            <div style={{ display: "flex", gap: "0.7rem", marginBottom: "1rem" }}>
              <SectionTag text="PARTNERS" />
              <BotonVolume 
                onClick={handleTTS}
                className="shrink-0"
                aria-label="Escuchar texto de alianzas estratégicas"
              />
              
            </div>

            {/* Título */}
            <h2
              style={{
                fontSize: "var(--text-uplin-h2-sm)",
                fontWeight: 700,
                lineHeight: "var(--leading-uplin-subhead)",
                letterSpacing: "var(--tracking-uplin-h2)",
                color: "var(--color-uplin-ink)",
                marginBottom: "1rem",
              }}
            >
              Programa de alianzas estratégicas
            </h2>

            {/* Párrafo 1 */}
            <p
              style={{
                color: "var(--color-uplin-ink-soft)",
                marginBottom: "0.9rem",
                fontSize: "var(--text-uplin-body)",
              }}
            >
              En Uplin creemos en el poder de la colaboración. Conectamos con empresas que, como nosotros, impulsan el crecimiento y la innovación en el talento humano.
            </p>

            {/* Párrafo 2 */}
            <p
              style={{
                color: "var(--color-uplin-ink-soft)",
                marginBottom: "0.9rem",
                fontSize: "var(--text-uplin-body)",
              }}
            >
              Buscamos consultoras de RRHH, empresas de tecnología, agencias de reclutamiento y proveedores que quieran potenciar su propuesta junto a nosotros.
            </p>


            {/* Botón CTA */}
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc1uYUAIh7E867j83LHlaKAV4ynZFdlZvmHo81JzRodVqExXw/viewform?usp=publish-editor"
              whileHover={{ y: -2 }}
              onHoverStart={() => setIsCTAHovered(true)}
              onHoverEnd={() => setIsCTAHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                marginTop: "1rem",
                padding: "0.75rem 1.4rem",
                fontSize: "var(--text-uplin-sm)",
                fontWeight: 600,
                color: "white",
                background: isCTAHovered
                  ? "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))"
                  : "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
                borderRadius: "var(--radius-uplin-pill)",
                boxShadow: "var(--shadow-uplin-btn-primary)",
                transition: "all var(--transition-uplin-base)",
                textDecoration: "none",
              }}
            >
              Únete como partner
              <motion.span animate={{ x: isCTAHovered ? 3 : 0 }}>
                <ArrowRight size={12} />
              </motion.span>
            </motion.a>
          </div>

          {/* ── Columna derecha: grilla de mini cards ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: "1rem", position: "relative" }}
          >
            {alliances.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{
                  y: -3,
                  background: "rgba(255,255,255,0.65)",
                  boxShadow: "0 14px 28px -8px rgba(60,14,54,0.18)",
                }}
                style={{
                  background: "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  borderRadius: "var(--radius-uplin-md)",
                  padding: "1.2rem",
                  transition: "all var( --transition-uplin-fast)",
                }}
              >
                {/* Contenedor del ícono */}
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    marginBottom: "0.7rem",
                    boxShadow: "0 6px 14px -4px rgba(60,14,54,0.2)",
                    background: item.iconBg,
                  }}
                >
                  {item.icon}
                </div>

                <h5
                  style={{
                    fontSize: "var(--text-uplin-h5)",
                    fontWeight: 700,
                    color: "var(--color-uplin-ink)",
                    marginBottom: "0.3rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h5>

                <p
                  style={{
                    fontSize: "var(--text-uplin-xs)",
                    color: "var(--color-uplin-ink-soft)",
                    lineHeight: "var(--leading-uplin-card)",
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Nuestros partners */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
          marginTop: "2.5rem",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "var(--text-uplin-eyebrow)",
            fontWeight: 600,
            letterSpacing: "var(--tracking-uplin-eyebrow)",
            textTransform: "uppercase",
            color: "var(--color-uplin-ink-muted)",
            marginBottom: "1.5rem",
            display: "block",
          }}
        >
          Nuestros partners
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "var(--color-uplin-glass-bg-strong)",
              backdropFilter: "blur(14px)",
              border: "1px solid var(--color-uplin-glass-border)",
              borderRadius: "var(--radius-uplin-md)",
              padding: "1.2rem 2rem",
              boxShadow: "var(--shadow-uplin-glass)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/TEAMTAILOR_LOGO.png"
              alt="Teamtailor"
              width={160}
              height={48}
              style={{ objectFit: "contain", width: "170px", height: "58px" }}
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "var(--color-uplin-glass-bg-strong)",
              backdropFilter: "blur(14px)",
              border: "1px solid var(--color-uplin-glass-border)",
              borderRadius: "var(--radius-uplin-md)",
              padding: "1.2rem 2rem",
              boxShadow: "var(--shadow-uplin-glass)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/ALKEMY_LOGO.png"
              alt="Alkemy"
              width={160}
              height={48}
              style={{ objectFit: "contain", width: "160px", height: "48px" }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
