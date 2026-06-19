"use client"
import Card from "@/components/Card/Card"
import { speakText } from "@/utils/textToSpeech"
import SectionTag from "@/components/SectionTag/SectionTag"
import BotonVolume from "@/components/BotonVolume/BotonVolume"
import { solutionsCards } from "./solutions.utils"
import Title from "@/components/Title/Title"

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
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <SectionTag text="POR QUÉ UPLIN" />

            <BotonVolume
              onClick={handleSolutionsTTS}
              size={20}
              ariaLabel="Escuchar soluciones"
              style={{
                position: "absolute",
                left: "calc(100% + 12px)",
              }}
            />
          </div>
        </div>
        <Title as="h3" before="Soluciones de talento " gradient="flexibles " after="con el acompañamiento que necesitas" gradientClass="gradient-purple-green"  />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {solutionsCards.map((card, index) => (
          <Card key={card.title} {...card} animationDelay={index * 0.1} />
        ))}
      </div>
    </div>
  )
}

export default Solutions
