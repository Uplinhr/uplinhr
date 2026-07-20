"use client"
import { motion } from "framer-motion";
import { usePaquetes } from "@/hooks/usePaquetes";
import { CardCreditos } from "@/components/CardServices/CardCreditos";
import { TbLoader2 } from "react-icons/tb";
import Card from "@/components/Card/Card";
import { creditosFeatures } from "./creditos.utils";
import { Banner } from "@/components/banner/banner";
import BotonPrimario from "@/components/BotonPrimario/BotonPrimario";
import CreditSimulatorModal from "@/components/simulador/CreditSimulatorModal";
import { QAView } from "@/views/preguntas-frecuentes/qaView";
import { speakText } from "@/utils/textToSpeech";
import BotonVolume from "@/components/BotonVolume/BotonVolume";
import SectionTag from "@/components/SectionTag/SectionTag";
import { fadeUp } from "@/utils/animations";
import BotonVerde from "@/components/BotonTerceario/BotónVerde";
import ServiceHero from "@/components/ServiceHero/ServiceHero";
import Title from "@/components/Title/Title";

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
      <ServiceHero
        tag="Búsqueda de Talento"
        title={{
          gradient: "Vacantes por niveles",
          after: " para Startups y Pymes",
        }}
        description={
          <>
            <p className="lead-intro" style={{ margin: "0 0 0.5rem" }}>
              Un modelo inteligente para optimizar tu reclutamiento
            </p>
            Adquiere paquetes de vacantes por niveles y diseña tu proceso a medida. Sin vencimiento, flexible y con la garantía de Uplin.
          </>
        }
        primaryBtn={{ text: "Ver paquetes →", href: "#paquetes" }}
        secondaryBtn={{ text: "Habla con un experto", href: "https://u030x.share.hsforms.com/2kmoJRY33TFChFJbTJ37Mlw" }}
        image={{ src: "/busqueda_de_talento.jpeg", alt: "Búsqueda de talento" }}
        onTTS={handleHeaderTTS}
      />

      {/* PAQUETES */}
      <section id="paquetes" className="py-16" style={{ scrollMarginTop: "6rem" }}>
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
              <span className="gradient-purple-green"> paquete perfecto</span>
              
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
        <div className="flex justify-center mt-12 mb-12">
          <CreditSimulatorModal>
            <BotonVerde text="Simula tu paquete"/>
          </CreditSimulatorModal>
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
              Si tu paquete no se adapta a tus necesidades, compra créditos
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
          <Title before="Por qué " gradient="elegirnos" gradientClass="gradient-purple-orange" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1280px] mx-auto px-6">
          {creditosFeatures.map((feature, index) => (
            <Card key={feature.title} {...feature} tts animationDelay={index * 0.1} />
          ))}
        </div>

        <QAView />

        <div className="flex justify-center py-10">
          <BotonPrimario text="Conoce las opiniones de nuestros clientes" href="/#testimonios" />
        </div>
        <Banner />
      </section>
    </main>
  );
}
