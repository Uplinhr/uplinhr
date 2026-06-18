"use client"
import Card from "@/components/Card/Card"
import { speakText } from "@/utils/textToSpeech"
import BotonVolume from "@/components/BotonVolume/BotonVolume"
import { ppStaffingServices } from "../ppStaffing.utils"
import { motion } from "framer-motion"
import { fadeUp } from "@/utils/animations"
import SectionTag from "@/components/SectionTag/SectionTag"

const ServiceCards = () => {
  const handleTTS = () => {
    const text = "Tu solución: People Partner Staffing de Uplin. Nuestro servicio es simple: Te conectamos con el talento que necesitas, por el tiempo exacto que lo necesitas. Ofrecemos optimización de procesos, gestión de alto volumen y proyectos estratégicos."
    speakText(text)
  }

  return (
    <section className="w-full max-w-[1280px] mx-auto py-20 px-6">
      <div className="text-center mb-12">
        <SectionTag text="TU SOLUCIÓN" />
        <div className="flex items-center justify-center gap-2">
          <motion.h3
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "#2A0824",
              margin: "0 0 1rem",
            }}
          >
            People Partner Staffing{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span className="gradient-purple-green"> de Uplin</span>
              
            </span>
            
          </motion.h3>
          
          <BotonVolume onClick={handleTTS} ariaLabel="Escuchar Tu solución" />
        </div>
        <p className="mt-3" style={{ color: "var(--color-uplin-ink-soft)", fontSize: "1.1rem",}}>
          Te conectamos con el talento que necesitas, por el tiempo exacto que lo necesitas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ppStaffingServices.map((service, index) => (
          <Card key={service.title} {...service} tts animationDelay={index * 0.1} />
        ))}
      </div>
    </section>
  )
}

export default ServiceCards
