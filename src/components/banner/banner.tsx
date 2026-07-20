"use client"
import { useState } from "react"
import Image from "next/image"
import Button from "../Button/Button"
import { ArrowRight, CalendarDays, PlayCircle } from "lucide-react"
import BotonVolume from "@/components/BotonVolume/BotonVolume"
import { speakText } from "@/utils/textToSpeech"
import { motion } from "framer-motion"
import BotonSecundario from "../BotonSecundario/BotonSecundario"

export function Banner() {
  const [isHovered, setIsHovered] = useState(false)

  const handleBannerTTS = () => {
    const text = "¿Necesitás ayuda antes de iniciar? Comunicate gratis con nuestro equipo especializado. ¡Te están esperando!";
    speakText(text);
  };

  return (
    <motion.div className="max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      style={{
        padding: "0 1rem",
        paddingTop: "var(--spacing-uplin-xl)",
        paddingBottom: "var(--spacing-uplin-xl)",
      }}
    >
      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>

      <div
        style={{
          background: "linear-gradient(135deg, var(--color-uplin-purple) 0%, var(--color-uplin-purple-deep) 100%)",
          borderRadius: "var(--radius-uplin-xl)",
          padding: "1.25rem 2rem",
          color: "white",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "0 30px 60px -20px rgba(60,14,54,0.4)",
        }}
      >
        {/* Blob verde */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-30%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(114,191,88,0.35), transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        {/* Blob naranja */}
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-20%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(248,154,28,0.3), transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        {/* Contenido */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Badge "en línea" */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 0.9rem",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "var(--radius-uplin-pill)",
              fontSize: "var(--text-uplin-eyebrow)",
              fontWeight: 500,
              color: "white",
              marginBottom: "1.2rem",
              alignSelf: "flex-start",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--color-uplin-green)",
                boxShadow: "0 0 10px var(--color-uplin-green)",
                animation: "livePulse 2s ease-in-out infinite",
              }}
            />
            Soporte disponible
          </div>

          {/* Fila: bloque texto + CTA alineados al centro */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem" }}>
            {/* Bloque título + descripción */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem" }}>
                <h3
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                    fontWeight: 700,
                    lineHeight: "var(--leading-uplin-subhead)",
                    letterSpacing: "var(--tracking-uplin-h3)",
                    margin: 0,
                  }}
                >
                  ¿Necesitas agendar una llamada?
                </h3>
                <BotonVolume
                  onClick={handleBannerTTS}
                  ariaLabel="Escuchar texto del banner"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "white",
                  }}
                />
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "var(--text-uplin-body)",
                  margin: 0,
                }}
              >
                Comunicate gratis con nuestro equipo especializado. ¡Te están esperando!
              </p>
            </div>

            <BotonSecundario text="Agendar ->" href="https://meetings.hubspot.com/llopez-ramirez" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Banner2() {
  const handleBanner2TTS = () => {
    const text = "¿Necesitás ayuda antes de iniciar? Comunicate gratis con nuestro equipo especializado. ¡Te están esperando! Transformá tu forma de reclutar. Con Uplin pagás solo por lo que necesitás y hacés crecer tu equipo de manera inteligente.";
    speakText(text);
  };

  return (
    <div className="bg-gradient-to-r from-[#8F68AC] to-[#CDBADA] rounded-lg p-6 mb-6 flex flex-col max-w-6xl mx-auto text-white space-y-6">

      {/* Fila con imagen, textos y botón */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
        {/* Imagen + textos */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/llamada.jpg"
              alt="Asesor especialista"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              ¿Necesitás ayuda antes de iniciar?
            </h2>
            <p className="text-sm text-white/90">
              Comunicate gratis con nuestro equipo especializado.
              ¡Te están esperando!
            </p>
          </div>

          <button
            onClick={handleBanner2TTS}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Escuchar texto del banner"
            title="Escuchar texto"
          >
            <PlayCircle size={28} className="text-white" />
          </button>
        </div>

        {/* Botón */}
        <Button
          link="https://meetings.hubspot.com/llopez-ramirez"
          tag="Agendá una llamada"
          mode={3}
          height={50}
          width={250}
        />
      </div>

      {/* Texto inferior */}
      <div className="text-center">
        <h3 className="text-base md:text-sm font-medium">
          “Transformá tu forma de reclutar. Con Uplin pagás solo por lo que necesitás y hacés crecer tu equipo de manera inteligente.”
        </h3>
      </div>
    </div>
  );
}

export function Banner3() {
  return (
    <div className="bg-gradient-to-r from-[#8F68AC] to-[#CDBADA] rounded-lg p-6 mb-6 flex flex-col max-w-6xl mx-auto text-white space-y-6">
      <h1 className="text-center text-[20px] font-semibold text-[#502B7D]">El futuro del trabajo es flexible</h1>
      <p className="text-base text-center md:text-sm font-regular">No dejes que la rigidez de los modelos tradicionales detenga tu crecimiento. Conecta con el talento que necesitas, cuando lo necesitas.</p>
      <h2 className="text-lg text-center text-[#502B7D] font-medium">
              ¿Necesitás ayuda antes de iniciar?
            </h2>
      {/* Botón */}
        <Button
          link="https://meetings.hubspot.com/llopez-ramirez"
          tag="Agendá una llamada"
          mode={3}
          height={50}
          width={250}
        />
    </div>
  );
}

