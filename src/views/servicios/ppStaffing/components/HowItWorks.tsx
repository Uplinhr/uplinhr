"use client"
import StepCard from './StepCard';
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

const HowItWorks = () => {
  const handleTTS = () => {
    const text = "¿Cómo funciona? Un proceso simple y eficiente para conectarte con el talento que necesitas. Paso 1: Define tu necesidad. Cuéntanos qué proyectos o tareas necesitas resolver. Paso 2: Seleccionamos a tu People Partner. Te asignamos a un experto que se alinea perfectamente con tus objetivos y la cultura de tu empresa. Paso 3: Manos a la obra. El profesional se integra a tu equipo, con acceso a nuestras herramientas y al soporte de toda la red de Uplin.";
    speakText(text);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800">
            ¿Cómo <span className="text-[#502B7D]">funciona</span>?
          </h2>
          <button
            onClick={handleTTS}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Escuchar cómo funciona"
            title="Escuchar texto"
          >
            <PlayCircle size={24} className="text-[#502B7D]" />
          </button>
        </div>
        <p className="text-lg text-center text-gray-600 mb-12">
          Un proceso simple y eficiente para conectarte con el talento que necesitas.
        </p>
        <div className="flex flex-col items-center">
          <StepCard
            stepNumber={1}
            title="Define tu necesidad"
            description="Cuéntanos qué proyectos o tareas necesitas resolver. Por ejemplo: optimizar procesos de onboarding, implementar un sistema de gestión del desempeño, o picos altos de vacantes activas."
          />
          <StepCard
            stepNumber={2}
            title="Seleccionamos a tu People Partner"
            description="Te asignamos a un experto que se alinea perfectamente con tus objetivos y la cultura de tu empresa."
          />
          <StepCard
            stepNumber={3}
            title="Manos a la obra"
            description="El profesional se integra a tu equipo, con acceso a nuestras herramientas y al soporte de toda la red de UPLIN."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;