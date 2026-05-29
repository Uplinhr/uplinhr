"use client"
import CardSolution from "@/components/CardSolution/CardSolution"
import { Volume2, Layers, PiggyBank, Users, TrendingUp } from "lucide-react"
import { speakText } from "@/utils/textToSpeech"

const Solutions = () => {
  const handleSolutionsTTS = () => {
    const text = "Soluciones de talento flexibles, con el acompañamiento que necesitás. Flexibilidad: Adaptabilidad a las necesidades cambiantes de la empresa. Ahorro de costos: Más valor, menos costos asociados a consultorías tradicionales. Acceso a expertos: Disponibilidad de un equipo de RRHH especializado. Escalabilidad: Ajuste de servicios según el crecimiento o la necesidad."
    speakText(text)
  }

  return (
    <div className="mb-16">
      <div
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          textAlign: "center",
          marginBottom: "2.5rem",
          marginTop: "var(--spacing-uplin-xl)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <span
            style={{
              background: "var(--color-uplin-glass-bg-strong)",
              backdropFilter: "blur(14px)",
              border: "1px solid var(--color-uplin-glass-border)",
              borderRadius: "var(--radius-uplin-pill)",
              padding: "0.35rem 0.9rem",
              fontSize: "var(--text-uplin-eyebrow)",
              fontWeight: 600,
              color: "var(--color-uplin-purple-deep)",
              letterSpacing: "var(--tracking-uplin-eyebrow)",
              textTransform: "uppercase",
              boxShadow: "0 4px 12px -4px rgba(60,14,54,0.1)",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            POR QUÉ UPLIN
          </span>

          <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
            <button
              onClick={handleSolutionsTTS}
              className="uplin-tts-btn"
              aria-label="Escuchar soluciones"
              title="Escuchar texto"
            >
              <Volume2 size={20} />
            </button>
          </div>
        </div>

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
          Soluciones de talento{" "}
          <span className="text-gradient-uplin">flexibles </span>
          con el acompañamiento que necesitas
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <CardSolution
          icon={<Layers className="w-[28px] h-[28px]" />}
          iconBg="linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))"
          title="Flexibilidad"
          description="Adaptabilidad total a las necesidades cambiantes de la empresa."
        />
        <CardSolution
          icon={<PiggyBank className="w-[28px] h-[28px]" />}
          iconBg="linear-gradient(135deg, var(--color-uplin-orange), var(--color-uplin-orange-dark))"
          title="Ahorro de costos"
          description="Más valor, menos costos asociados a consultorías tradicionales."
        />
        <CardSolution
          icon={<Users className="w-[28px] h-[28px]" />}
          iconBg="linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))"
          title="Acceso a expertos"
          description="Disponibilidad de un equipo de RRHH especializado."
        />
        <CardSolution
          icon={<TrendingUp className="w-[28px] h-[28px]" />}
          iconBg="linear-gradient(135deg, var(--color-uplin-purple-3), var(--color-uplin-purple-2))"
          title="Escalabilidad"
          description="Ajuste de servicios según el crecimiento o la necesidad."
        />
      </div>
    </div>
  )
}

export default Solutions
