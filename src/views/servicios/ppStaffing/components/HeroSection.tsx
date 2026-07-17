"use client";
import { speakText } from "@/utils/textToSpeech";
import ServiceHero from "@/components/ServiceHero/ServiceHero";

const HeroSection = () => {
  const handleHeroTTS = () => {
    speakText(
      "People Partner Staffing. Un experto de RR.HH. dedicado a tu equipo, sin sumarlo a nómina. Un profesional de People 100% dedicado a tu equipo, con el criterio y la experiencia para llevar adelante proyectos estratégicos de personas, en el momento justo, por el tiempo exacto que lo necesitás. People Partner Staffing los resuelve, sin el compromiso ni los costos de una contratación a largo plazo."
    );
  };

  return (
    <ServiceHero
      tag="People Partner Staffing"
      title={{
        before: "Un ",
        gradient: "experto de RR.HH.",
        after: " dedicado a tu equipo, sin sumarlo a nómina",
      }}
      description="Un profesional de People 100% dedicado a tu equipo, con el criterio y la experiencia para llevar adelante proyectos estratégicos de personas, en el momento justo, por el tiempo exacto que lo necesitás. People Partner Staffing los resuelve, sin el compromiso ni los costos de una contratación a largo plazo."
      primaryBtn={{ text: "Agendá una llamada →", href: "https://meetings.hubspot.com/llopez-ramirez" }}
      secondaryBtn={{ text: "Habla con un experto", href: "https://u030x.share.hsforms.com/2kmoJRY33TFChFJbTJ37Mlw" }}
      image={{ src: "/empleados-pyme.jpg.jpeg", alt: "People Partner Staffing" }}
      onTTS={handleHeroTTS}
    />
  );
};

export default HeroSection;
