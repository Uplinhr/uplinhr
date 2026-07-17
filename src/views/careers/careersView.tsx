"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import BotonVolume from "@/components/BotonVolume/BotonVolume";
import { speakText } from "@/utils/textToSpeech";
import ServiceHero from "@/components/ServiceHero/ServiceHero";
import SectionTag from "@/components/SectionTag/SectionTag";
import { Banner } from "@/components/banner/banner";
import Title from "@/components/Title/Title";
import Card from "@/components/Card/Card";
import { CareersFeatures } from "./careers.utils";
import BotonPrimario from "@/components/BotonPrimario/BotonPrimario";

const CareersView = () => {
  const buttonAnimations = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  // Función TTS para el header
  const handleHeaderTTS = () => {
    const text = "Uplin Careers. Conecta con oportunidades que te impulsen a crecer. Te conectamos con las mejores startups y empresas de tecnología de Latam. Culturas que ponen a las personas en el centro, proyectos que inspiran y retos que impulsan tu desarrollo.";
    speakText(text);
  };

  // Función TTS para base de talentos
  const handleTalentPoolTTS = () => {
    const text = "¿No encontraste una vacante para ti hoy? Déjanos tu CV y únete a nuestra base de talentos. Te consideraremos para futuras oportunidades. Recibí novedades y vacantes relacionadas a tu perfil. Accede a invitaciones de eventos exclusivos de Uplin.";
    speakText(text);
  };

  return (
    <main className="min-h-screen">
      <ServiceHero
      tag="Uplin Careers"
        title={{
          before: "Uplin ",
          gradient: "Careers",
        }}
        description={
          <>
            <p className="lead-intro" style={{ margin: "0 0 0.5rem" }}>
              Conecta con oportunidades que te impulsen a crecer
            </p>
            Te conectamos con las mejores startups y empresas de tecnología de Latam. Culturas que ponen a las personas en el centro, proyectos que inspiran y retos que impulsan tu desarrollo.
          </>
        }
        primaryBtn={{ text: "Ver vacantes →", href: "/careers/jobOpenings" }}
        secondaryBtn={{ text: "Unirme a la base de talentos", href: "https://forms.gle/xoXqjr1dWizknQQTA" }}
        image={{ src: "/busqueda_de_talento.jpeg", alt: "Búsqueda de talento" }}
        onTTS={handleHeaderTTS}
        />
      

      <section className="flex flex-col items-center text-center pt-12 px-4">
        <SectionTag text="TU PROXIMO PASO" />
        <Title before="Lo que vas a " gradient="encontrar" gradientClass="gradient-purple-orange" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto mt-4 mb-7">
          {CareersFeatures.map((feature, index) => (
            <Card key={feature.title} {...feature} tts animationDelay={index * 0.1} />
          ))}
        </div>
        <BotonPrimario text="Ver vacantes Abiertas" href="/careers/jobOpenings" />
      </section>

      <motion.section
        className="py-16 px-[clamp(1.25rem,4vw,3rem)]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div
          className="max-w-[1100px] mx-auto flex items-center justify-between gap-10 flex-wrap rounded-[var(--radius-uplin-lg)] p-[2.6rem_2.8rem] border border-white/70"
          style={{
            background: "var(--color-uplin-glass-bg-strong)",
            backdropFilter: "blur(20px) saturate(160%)",
            boxShadow: "var(--shadow-uplin-glass)",
          }}
        >
          {/* Columna izquierda — info */}
          <div className="flex-1 min-w-[280px]">

            {/* Badge "Base de talentos Uplin" */}
            <div
              className="inline-flex items-center gap-2 px-[0.65rem] py-[0.28rem] rounded-full text-[0.78rem] font-medium mb-3"
              style={{
                background: "rgba(60,14,54,0.06)",
                border: "1px solid rgba(60,14,54,0.14)",
                color: "var(--color-uplin-ink)",
              }}
            >
              {/* Punto verde pulsante */}
              <span
                className="inline-block w-[10px] h-[10px] rounded-full flex-shrink-0"
                style={{
                  background: "var(--color-uplin-green)",
                  boxShadow: "0 0 10px var(--color-uplin-green)",
                  animation: "livePulse 2s ease-in-out infinite",
                }}
              />
              Base de talentos Uplin
            </div>

            {/* Fila título + TTS */}
            <div className="flex items-start gap-[0.6rem] mt-[0.7rem] mb-[0.4rem]">
              <h2
                className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.015em]"
                style={{ color: "var(--color-uplin-ink)" }}
              >
                ¿No encontraste una vacante para ti hoy?
              </h2>
              <BotonVolume
                onClick={handleTalentPoolTTS}
                size={15}
                ariaLabel="Escuchar base de talentos"
              />
            </div>

            {/* Subtítulo */}
            <p
              className="text-[1.05rem] mb-[1.3rem]"
              style={{ color: "var(--color-uplin-ink-soft)" }}
            >
              Déjanos tu CV y únete a nuestra base de talentos.
            </p>

            {/* Lista de beneficios */}
            <ul className="flex flex-col gap-[0.7rem] list-none p-0">
              {[
                "Te consideraremos para futuras oportunidades",
                "Recibí novedades y vacantes relacionadas a tu perfil",
                "Accede a invitaciones de eventos exclusivos de Uplin",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-[0.7rem] text-[1rem] font-medium"
                  style={{ color: "var(--color-uplin-ink-soft)" }}
                >
                  <span
                    className="flex-shrink-0 w-[20px] h-[20px] rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))",
                      padding: "3px",
                    }}
                  >
                    <Check className="text-white" size={12} strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Botón CTA — lado derecho */}
          <div className="flex-shrink-0 w-full lg:w-auto flex lg:block justify-center">
            <BotonPrimario
              text="Unirme a la base de talentos"
              href="https://forms.gle/xoXqjr1dWizknQQTA"
            />
          </div>
        </div>
      </motion.section>

      <Banner />

    </main>
  );
};

export default CareersView;
