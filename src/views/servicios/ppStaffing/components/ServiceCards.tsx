"use client"
import ServiceCard from './ServiceCard';
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

const serviceData = [
  {
    iconSrc: "/PPS-optimizacion.png", 
    title: "Optimización de procesos",
    description: "Mejoramos tus procesos de onboarding, gestión del desempeño y experiencia del empleado.",
    altText: "Icono de optimización"
  },
  {
    iconSrc: "/PPS-gestion.png",
    title: "Gestión de alto volumen",
    description: "Manejamos picos altos de vacantes activas y procesos de selección masivos.",
    altText: "Icono de gestión de alto volumen"
  },
  {
    iconSrc: "/PPS-proyectos.png",
    title: "Proyectos estratégicos",
    description: "Implementamos sistemas de gestión, políticas de RR.HH. y transformación cultural.",
    altText: "Icono de proyectos estratégicos"
  }
];

const ServiceCards = () => {
  const handleTTS = () => {
    const text = "Tu solución: People Partner Staffing de Uplin. Nuestro servicio es simple: Te conectamos con el talento que necesitas, por el tiempo exacto que lo necesitas. Ofrecemos optimización de procesos, gestión de alto volumen y proyectos estratégicos.";
    speakText(text);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-3xl lg:text-4xl font-bold">
           Tu solución: <span className="text-[#502B7D]">People Partner Staffing </span>de Uplin
          </h2>
          <button
            onClick={handleTTS}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Escuchar Tu solución"
            title="Escuchar texto"
          >
            <PlayCircle size={24} className="text-[#502B7D]" />
          </button>
        </div>

        <h3 className="mt-8 text-xl font-semibold text-gray-800">
         Nuestro servicio es simple:
        </h3>

        <p className="mt-2 text-gray-600">
          Te conectamos con el talento que necesitas, por el tiempo exacto que lo necesitas.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <ServiceCard
              key={index}
              iconSrc={service.iconSrc}
              title={service.title}
              description={service.description}
              altText={service.altText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;