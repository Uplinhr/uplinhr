"use client"
import { speakText } from "@/utils/textToSpeech";
import SectionTag from "@/components/SectionTag/SectionTag";
import { motion } from "framer-motion";
import { fadeUp } from "@/utils/animations";
import BotonVolume from "@/components/BotonVolume/BotonVolume";
import Card, { CardData } from "@/components/Card/Card";
import { Layers, DollarSign, Check, BrainCog } from "lucide-react";

const benefits: CardData[] = [
  {
    icon: <Layers size={26} />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
    title: "+ Flexibilidad",
    description: "Escala tu equipo de RR.HH. según la demanda, sin contratos a largo plazo.",
  },
  {
    icon: <DollarSign size={26} />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))",
    title: "+ Ahorro de costos",
    description: "Olvídate de los gastos de nómina, beneficios y procesos de contratación.",
  },
  {
    icon: <Check size={26} />,
    iconBg: "linear-gradient(135deg, var(--color-uplin-orange), var(--color-uplin-orange-dark))",
    title: "+ Expertise inmediata",
    description: "Accede al conocimiento especializado de profesionales de alto nivel, listos para empezar desde el primer día.",
  },
  {
    icon: <BrainCog size={26} />,
    title: "+ Enfoque estratégico",
    description: "Dedica tu tiempo a lo importante, mientras un experto se encarga de los proyectos de People Ops que requieren atención.",
  },
];

const BenefitsSection = () => {
  const handleBenefitsTTS = () => {
    const text = "Beneficios claves. Descubre por qué las empresas eligen People Partner Staffing para sus necesidades de RR.HH. Flexibilidad: escala tu equipo de RR.HH. según la demanda, sin contratos a largo plazo. Ahorro de costos: olvídate de los gastos de nómina, beneficios y procesos de contratación. Expertise inmediata: accede al conocimiento especializado de profesionales de alto nivel, listos para empezar desde el primer día. Enfoque estratégico: dedica tu tiempo a lo importante, mientras un experto se encarga de los proyectos de People Ops que requieren atención.";
    speakText(text);
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto py-20 px-6">
      <div className="text-center mb-12">
        <SectionTag text="BENEFICIOS CLAVES" />
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
            Por qué eligen{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span className="gradient-purple-green"> People Partner Staffing</span>   
            </span>
            
          </motion.h3>
          <BotonVolume onClick={handleBenefitsTTS} ariaLabel="Escuchar beneficios" />
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <Card key={benefit.title} {...benefit} animationDelay={i * 0.12} />
          ))}
        </div>
      </div>
       {/* <h2 className="font-poppins text-[28px] font-semibold text-center">
          <span className="text-[#502B7D]">Lidera con agilidad.</span>
          <br />
          <span className="text-[#502B7D]">Gestiona con</span>{" "}
          <span className="text-[#502B7D]">UPLIN</span>
      </h2> */}
    </section>
  );
};

export default BenefitsSection;