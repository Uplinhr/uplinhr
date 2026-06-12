"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { speakText } from "@/utils/textToSpeech";
import SectionTag from "@/components/SectionTag/SectionTag";
import BotonVolume from "@/components/BotonVolume/BotonVolume";
import BotonPrimario from "@/components/BotonPrimario/BotonPrimario";
import BotonSecundario from "@/components/BotonSecundario/BotonSecundario";
import { fadeUp } from "@/utils/animations";

const HeroSection = () => {
  const handleHeroTTS = () => {
    const text = "People Partner Staffing. Un experto de RR.HH. dedicado a tu equipo, sin sumarlo a nómina. Un profesional de People 100% dedicado a tu equipo, con el criterio y la experiencia para llevar adelante proyectos estratégicos de personas, en el momento justo, por el tiempo exacto que lo necesitás. People Partner Staffing los resuelve, sin el compromiso ni los costos de una contratación a largo plazo.";
    speakText(text);
  };

  return (
    <>
      <style>{`
        .pps-header {
          position: relative;
          padding: 7rem 0 4rem;
          z-index: 1;
        }
        @media (max-width: 900px) {
          .pps-header { padding-top: 6rem; }
        }
      `}</style>
      <section className="pps-header">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center max-w-[1280px] mx-auto"
          style={{ padding: "0 clamp(1.25rem, 4vw, 3rem)" }}
        >
          {/* Columna izquierda — contenido */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            className="order-1 lg:order-none"
            style={{ position: "relative", zIndex: 2 }}
          >
            {/* Fila SectionTag + TTS */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.5rem" }}>
              <SectionTag text="People Partner Staffing" />
              <BotonVolume
                onClick={handleHeroTTS}
                ariaLabel="Escuchar presentación"
              />
            </div>

            {/* Título */}
            <h1
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: "0 0 1rem",
                color: "var(--color-uplin-ink)",
              }}
            >
              Un{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-green-dark), var(--color-uplin-orange))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                experto de RR.HH.
              </span>{" "}
              dedicado a tu equipo, sin sumarlo a nómina
            </h1>

            {/* Párrafo lead */}
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "var(--color-uplin-ink-soft)",
                maxWidth: 540,
                margin: "0 0 2rem",
              }}
            >
              Un profesional de People 100% dedicado a tu equipo, con el criterio y la experiencia para llevar adelante proyectos estratégicos de personas, en el momento justo, por el tiempo exacto que lo necesitás. People Partner Staffing los resuelve, sin el compromiso ni los costos de una contratación a largo plazo.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
              <motion.div
                custom={3} variants={fadeUp} initial="hidden" animate="visible"
                style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
              >
                <BotonPrimario text="Agendá una llamada →" href="https://meetings.hubspot.com/llopez-ramirez" />
                <BotonSecundario text="Habla con un experto" href="/contacto" />
              </motion.div>
            </div>
          </motion.div>

          {/* Columna derecha — imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
            className="order-2 lg:order-none"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 520,
              marginLeft: "auto",
              pointerEvents: "none",
            }}
          >
            {/* Halo decorativo */}
            <div
              style={{
                position: "absolute",
                inset: "-15% -18% -15% -12%",
                borderRadius: "50%",
                zIndex: -1,
                filter: "blur(40px)",
                background:
                  "radial-gradient(ellipse at 30% 30%, rgba(248,154,28,0.25) 0%, transparent 55%), " +
                  "radial-gradient(ellipse at 70% 75%, rgba(109,64,152,0.28) 0%, transparent 55%), " +
                  "radial-gradient(ellipse at center, rgba(114,191,88,0.15) 0%, transparent 60%)",
                animation: "teamHaloPulse 12s ease-in-out infinite",
              }}
            />

            <Image
              src="/empleados-pyme.jpg.jpeg"
              alt="People Partner Staffing"
              width={520}
              height={347}
              priority
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                aspectRatio: "3/2",
                objectFit: "cover",
                objectPosition: "center",
                filter: "saturate(0.88) contrast(1.04) brightness(1.02)",
                opacity: 0.92,
                WebkitMaskImage:
                  "radial-gradient(ellipse 60% 70% at center, #000 0%, rgba(0,0,0,.92) 25%, rgba(0,0,0,.6) 50%, rgba(0,0,0,.25) 72%, rgba(0,0,0,.05) 88%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 60% 70% at center, #000 0%, rgba(0,0,0,.92) 25%, rgba(0,0,0,.6) 50%, rgba(0,0,0,.25) 72%, rgba(0,0,0,.05) 88%, transparent 100%)",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                animation: "teamFloat 9s ease-in-out infinite",
              }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
