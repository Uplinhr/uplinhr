"use client"
import ConsultoriasCard from "@/components/ConsultoriasCard/ConsultoriasCard";
import { consultorias } from "@/utils/consultorias";
import { Banner } from "@/components/banner/banner";
import { speakText } from "@/utils/textToSpeech";
import SectionTag from "@/components/SectionTag/SectionTag";
import ServiceHero from "@/components/ServiceHero/ServiceHero";

export default function ConsultoriasPage() {
  const handleHeroTTS = () => {
    speakText(
      "Las áreas que transforman equipos y potencian organizaciones. Cada empresa enfrenta retos únicos. Por eso, en Uplin agrupamos nuestras soluciones de consultoría en temáticas clave que abordan todo el ciclo de talento: atracción, desarrollo, cultura, tecnología y cumplimiento. Explorá cada área para conocer cómo podemos acompañarte en la evolución de tu equipo y en el fortalecimiento de tu organización."
    );
  };

  return (
    <main className="min-h-screen">
      <ServiceHero
        tag="Consultorías"
        title={{
          before: "Las áreas que ",
          gradient: "transforman equipos",
          after: " y potencian organizaciones",
        }}
        description={
          <>
            Cada empresa enfrenta retos únicos. Por eso, en Uplin agrupamos nuestras soluciones de consultoría en temáticas clave que abordan todo el ciclo de talento: atracción, desarrollo, cultura, tecnología y cumplimiento.
            <br /><br />
            Explorá cada área para conocer cómo podemos acompañarte en la evolución de tu equipo y en el fortalecimiento de tu organización.
          </>
        }
        primaryBtn={{ text: "Agendá una llamada →", href: "/servicios" }}
        secondaryBtn={{ text: "Habla con un experto", href: "/contacto" }}
        image={{ src: "/CS-landing.png", alt: "Consultorías Uplin" }}
        onTTS={handleHeroTTS}
      />

      {/* Grid de Cards */}
      <div className="text-center mb-7">
        <SectionTag text="Áreas de consultoría" />
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
              Soluciones que cubren{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-green-dark), var(--color-uplin-orange))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                todo el ciclo de talento
              </span>{" "}
              
            </h1>
          
          
        </div>
        <p className="mt-3" style={{ color: "var(--color-uplin-ink-soft)", fontSize: "1.1rem",}}>
          Agrupamos nuestra consultoría en temáticas clave para acompañarte en cada etapa: 
          atracción, desarrollo, cultura, tecnología y cumplimiento.
        </p>
      </div>
      <section className="container mx-auto p-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-4 max-w-[1060px]">
        {consultorias.map((e) => (
          <ConsultoriasCard key={e.id} consultorias={e} />
        ))}
      </section>
      <Banner />
    </main>
  );
}
