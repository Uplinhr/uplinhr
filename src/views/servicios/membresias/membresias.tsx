"use client";
import Card from "@/components/Card/Card";
import { membresiasFeatures } from "./membresias.utils";
import CardsPlan from "@/views/planes/cardsPlan";
import { Banner } from "@/components/banner/banner";
import { speakText } from "@/utils/textToSpeech";
import SectionTag from "@/components/SectionTag/SectionTag";
import BotonVolume from "@/components/BotonVolume/BotonVolume";
import ServiceHero from "@/components/ServiceHero/ServiceHero";

export default function Membresias() {
  const handleHeroTTS = () => {
    speakText(
      "Potenciá tu gestión de talento con nuestras membresías empresariales. Suscribite a nuestras membresías empresariales y accede a todo lo que tu organización necesita para gestionar tu talento."
    );
  };

  return (
    <div>
      <ServiceHero
        tag="Membresías"
        title={{
          before: "Potenciá tu gestión de talento con nuestras ",
          gradient: "membresías empresariales",
        }}
        description="Suscribite a nuestras membresías empresariales y accedé a todo lo que tu organización necesita para gestionar tu talento, en un solo plan mensual que evoluciona con vos."
        primaryBtn={{ text: "Ver planes →", href: "/servicios" }}
        secondaryBtn={{ text: "Habla con un experto", href: "/contacto" }}
        image={{ src: "/membresias-oficina.png", alt: "Membresías Uplin" }}
        onTTS={handleHeroTTS}
      />


      <section>      
        <div className="text-center mb-7">
          <SectionTag text="BENEFICIOS+" />
          <div className="flex items-center justify-center gap-2">
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
              Una sola suscripción,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-green-dark), var(--color-uplin-orange))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                todo el talento cubierto
              </span>{" "}
              
            </h1>
          
          
          </div>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {membresiasFeatures.map((feature, index) => (
              <Card key={feature.title} {...feature} tts animationDelay={index * 0.1} />
            ))}
          </div>
      </section>

      <section className="flex flex-col items-center gap-2 mt-12 p-5">
          <SectionTag text="PLANES" />
          <div className="flex items-center justify-center">
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
              Todo en un plan mensual que{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-green-dark), var(--color-uplin-orange))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                evoluciona con tu empresa
              </span>
            </h1>
        
            <BotonVolume 
              onClick={() => speakText("Todo en un plan mensual que evoluciona con tu empresa. Elegí el plan que mejor se adapte a las necesidades de tu organización.")}
              aria-label="Escuchar título de planes"
            /> 
          </div>
     
        <CardsPlan />
      </section>
      <Banner />
      
    </div>
  );
}
