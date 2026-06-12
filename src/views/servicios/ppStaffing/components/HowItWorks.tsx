"use client"
import Card from "@/components/Card/Card";
import BotonVolume from "@/components/BotonVolume/BotonVolume";
import { speakText } from "@/utils/textToSpeech";
import { motion } from "framer-motion";
import { fadeUp } from "@/utils/animations";
import SectionTag from "@/components/SectionTag/SectionTag";

const StepIcon = ({ number }: { number: number }) => (
  <span className="text-white font-bold text-xl leading-none">{number}</span>
);

const steps = [
  {
    icon: <StepIcon number={1} />,
    title: "Define tu necesidad",
    description: "Cuéntanos qué proyectos o tareas necesitas resolver. Por ejemplo: optimizar procesos de onboarding, implementar un sistema de gestión del desempeño, o picos altos de vacantes activas.",
  },
  {
    icon: <StepIcon number={2} />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))",
    title: "Seleccionamos a tu People Partner",
    description: "Te asignamos a un experto que se alinea perfectamente con tus objetivos y la cultura de tu empresa.",
  },
  {
    icon: <StepIcon number={3} />,
    title: "Manos a la obra",
    description: "El profesional se integra a tu equipo, con acceso a nuestras herramientas y al soporte de toda la red de UPLIN.",
  },
];

const HowItWorks = () => {
  const fullText = "¿Cómo funciona? Un proceso simple y eficiente para conectarte con el talento que necesitas. Paso 1: Define tu necesidad. Cuéntanos qué proyectos o tareas necesitas resolver. Paso 2: Seleccionamos a tu People Partner. Te asignamos a un experto que se alinea perfectamente con tus objetivos y la cultura de tu empresa. Paso 3: Manos a la obra. El profesional se integra a tu equipo, con acceso a nuestras herramientas y al soporte de toda la red de Uplin.";

  return (
    <section className="w-full max-w-[1280px] mx-auto py-20 px-6">
      <div className="text-center mb-12">
        <SectionTag text="CÓMO FUNCIONA" />
        <div className="flex items-center justify-center gap-2 ">
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
            Un proceso{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span className="text-gradient-uplin"> simple y eficiente</span> 
            </span>
            
          </motion.h1>
          <BotonVolume
            onClick={() => speakText(fullText)}
            ariaLabel="Escuchar cómo funciona"
          />
        </div>
        <p className="mt-3 mb-7"  style={{ color: "var(--color-uplin-ink-soft)", fontSize: "1.1rem",}}>
          Un proceso simple y eficiente para conectarte con el talento que necesitas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <Card
              key={i}
              icon={step.icon}
              title={step.title}
              description={step.description}
              tts
              animationDelay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;