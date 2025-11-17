"use client"
import Image from "next/image";
import Button from "@/components/Button/Button";
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

const HeroSection = () => {
  const handleHeroTTS = () => {
    const text = "People Partner Staffing. ¿Necesitas un experto para tu equipo de People pero no quieres sumar a alguien a nómina? Imagina tener a un profesional de recursos humanos 100% dedicado a tu equipo, con el conocimiento y la experiencia para impulsar tus proyectos estratégicos. Todo esto, sin el compromiso ni los costos de una contratación a largo plazo. El desafío de muchas empresas hoy no es solo encontrar talento, sino gestionarlo de forma eficiente y flexible. Los proyectos de alta prioridad, los picos de trabajo o la falta de un rol específico a tiempo completo, pueden detener el crecimiento y la innovación.";
    speakText(text);
  };

  return (
    <section className="bg-white py-16 relative">
      <button
        onClick={handleHeroTTS}
        className="absolute top-4 right-4 p-2 hover:bg-[#502B7D]/10 rounded-full transition-colors duration-200 z-50 cursor-pointer"
        aria-label="Escuchar People Partner Staffing"
        title="Escuchar texto"
        type="button"
        style={{ pointerEvents: 'auto' }}
      >
        <PlayCircle size={24} className="text-[#502B7D]" />
      </button>
      <div className="container mx-auto px-4 lg:flex items-center">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold">
            <span className="text-[#AF93CC]">People Partner</span>
            <br />
            <span className="text-gray-800">Staffing</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-lg">
            ¿Necesitas un experto para tu equipo de People pero no quieres sumar
            a alguien a nómina? Imagina tener a un profesional de recursos
            humanos 100% dedicado a tu equipo, con el conocimiento y la
            experiencia para impulsar tus proyectos estratégicos. Todo esto, sin
            el compromiso ni los costos de una contratación a largo plazo. El
            desafío de muchas empresas hoy no es solo encontrar talento, sino
            gestionarlo de forma eficiente y flexible. Los proyectos de alta
            prioridad, los picos de trabajo o la falta de un rol específico a
            tiempo completo, pueden detener el crecimiento y la innovación.
          </p>
          <div className="mt-6">
            <Button
              link="https://meetings.hubspot.com/llopez-ramirez"
              tag="Agendá una llamada"
              mode={3}
              height={50}
              width={250}
            />
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-[500px] h-[300px] rounded-lg shadow-xl border-4 border-[#AF93CC] overflow-hidden">
            <Image
              src="/PPS-landing.png"
              alt="People Partner Staffing"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
