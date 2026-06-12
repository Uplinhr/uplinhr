"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { usePaquetes } from "@/hooks/usePaquetes";
import { CardCreditos } from "@/components/CardServices/CardCreditos";
import { TbLoader2 } from "react-icons/tb";
import Card from "@/components/Card/Card";
import { creditosFeatures } from "./creditos.utils";
import { Banner } from "@/components/banner/banner";
import CreditSimulatorModal from "@/components/simulador/CreditSimulatorModal";
import { QAView } from "@/views/preguntas-frecuentes/qaView";
import { speakText } from "@/utils/textToSpeech";
import EyebrowPill from "@/components/EyebrowPill/EyebrowPill";
import BotonVolume from "@/components/BotonVolume/BotonVolume";
import SectionTag from "@/components/SectionTag/SectionTag";
import BotonPrimario from "@/components/BotonPrimario/BotonPrimario";
import BotonSecundario from "@/components/BotonSecundario/BotonSecundario";
import { fadeUp } from "@/utils/animations";
import BotonVerde from "@/components/BotonTerceario/BotónVerde";

export default function Creditos() {
  const { paquetes, loading, error } = usePaquetes();

  const handleHeaderTTS = () => {
    const text = "Créditos de talento para Startups y Pymes. Un modelo inteligente para optimizar tu reclutamiento. Compra créditos de búsquedas de talento y diseña tu proceso a medida. Sin vencimiento, flexible y con la garantía de Uplin.";
    speakText(text);
  };

  const handlePaquetesTTS = () => {
    const text = "Encontrá el paquete perfecto para tu empresa. Tenemos cuatro opciones: Starter con 50 créditos, Growth con 100 créditos, Scale con 250 créditos y Enterprise con 500 créditos. Simulá tu paquete para encontrar el ideal para vos.";
    speakText(text);
  };

  const handleCreditosIndividualesTTS = () => {
    const text = "Si tu paquete no se adapta a tus necesidades, comprá créditos individuales.";
    speakText(text);
  };

  return (
    <main className="min-h-screen">
      {/* HEADER */}
      <style>{`
        .creditos-header {
          position: relative;
          padding: 7rem 0 4rem;
          z-index: 1;
        }
        @media (max-width: 900px) {
          .creditos-header { padding-top: 6rem; }
        }
      `}</style>
      <section className="creditos-header">
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
            {/* Fila eyebrow + TTS */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.5rem" }}>
            
              <EyebrowPill text="Búsqueda de Talento" />
              
              <BotonVolume
              onClick={handleHeaderTTS}
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
              <span
                style={{
                  background: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-green-dark), var(--color-uplin-orange))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Vacantes por niveles
              </span>{" "}
              para Startups y Pymes
            </h1>

            {/* Párrafo intro */}
            <p
              className="lead-intro"
              style={{ margin: "0 0 0.5rem" }}
            >
              Un modelo inteligente para optimizar tu reclutamiento
            </p>

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
              Adquirí paquetes de vacantes por niveles y diseñá tu proceso a medida. Sin vencimiento, flexible y con la garantía de Uplin.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
              <motion.div
                custom={3} variants={fadeUp} initial="hidden" animate="visible"
                style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
              >
                <BotonPrimario text="Ver paquetes →" href="/servicios" />
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
              src="/busqueda_de_talento.jpeg"
              alt="Búsqueda de talento"
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

      {/* PAQUETES */}
      <section className="py-16">
        <div className="max-w-[780px] mx-auto text-center mb-14">
          <SectionTag text="PAQUETES" />
          <BotonVolume onClick={handlePaquetesTTS} ariaLabel="Escuchar sección de paquetes" size={18} />
          <motion.h1
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
            Encontrá el{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span className="text-gradient-uplin"> paquete perfecto</span>
              
            </span>{" "}para tu empresa
            
          </motion.h1>
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            style={{
              fontSize: "1.07rem",
              lineHeight: 1.6,
              color: "#5A4566",
              margin: "0 0 0.5rem",
            }}
          >
            Cuatro opciones diseñadas para cada etapa de crecimiento. Sin vencimiento, a tu ritmo.
          </motion.p>
          
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <TbLoader2 className="animate-spin text-[#6C4099] text-4xl" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-12">{error}</p>
        ) : (
          <div className="max-w-[1280px] mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {paquetes.map((paquete, index) => (
              <CardCreditos key={paquete.title} paquetes={paquete} index={index} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <CreditSimulatorModal>
            <BotonVerde text="Simula tu paquete"/>
          </CreditSimulatorModal>
        </div>
      </section>

      {/* CRÉDITOS INDIVIDUALES */}
      <section>
        <div
          className="p-5 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto text-white mb-10 mt-10"
          style={{
            background: "linear-gradient(135deg, var(--color-uplin-purple) 0%, var(--color-uplin-purple-deep) 100%)",
            borderRadius: "var(--radius-uplin-xl)",
            boxShadow: "0 30px 60px -20px rgba(60,14,54,0.4)",
            position: "relative",
            overflow: "hidden",
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
          <div className="flex items-center gap-2" style={{ position: "relative", zIndex: 1 }}>
            <h2>
              Si tu paquete no se adapta a tus necesidades, comprá créditos
              individuales
            </h2>
            <BotonVolume
              onClick={handleCreditosIndividualesTTS}
              ariaLabel="Escuchar texto"
            />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <BotonVerde text="Adquirir aquí" href="https://u030x.share.hsforms.com/2dXErlXkESgeW2hE4_Xmnaw"/>
          </div>
        </div>
      </section>

      {/* BENEFICIOS + QA + BANNER */}
      <section>
        
        <div className="text-center mb-10 mt-10">
          <SectionTag text="BENEFICIOS" />
          <h2
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "var(--color-uplin-ink)",
              whiteSpace: "nowrap",
              margin: "0.5rem 0 0",
            }}
          >
            Por qué{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--color-uplin-orange), var(--color-uplin-orange-dark))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              elegirnos
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1280px] mx-auto px-6">
          {creditosFeatures.map((feature, index) => (
            <Card key={feature.title} {...feature} tts animationDelay={index * 0.1} />
          ))}
        </div>

        <QAView />

        <Banner />
      </section>
    </main>
  );
}
