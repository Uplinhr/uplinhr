"use client"
import Image from "next/image";
import ConsultoriasCard from "@/components/ConsultoriasCard/ConsultoriasCard";
import { consultorias } from "@/utils/consultorias";
import { Banner } from "@/components/banner/banner";
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

export default function ConsultoriasPage() {
  const handleHeroTTS = () => {
    const text = "Las áreas que transforman equipos y potencian organizaciones. Cada empresa enfrenta retos únicos. Por eso, en Uplin agrupamos nuestras soluciones de consultoría en temáticas clave que abordan todo el ciclo de talento: atracción, desarrollo, cultura, tecnología y cumplimiento. Explorá cada área para conocer cómo podemos acompañarte en la evolución de tu equipo y en el fortalecimiento de tu organización.";
    speakText(text);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFB]">
      {/* Hero */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
        <button
          onClick={handleHeroTTS}
          className="absolute top-4 right-4 p-2 hover:bg-[#502B7D]/10 rounded-full transition-colors duration-200 z-50 cursor-pointer"
          aria-label="Escuchar Consultorías"
          title="Escuchar texto"
          type="button"
          style={{ pointerEvents: 'auto' }}
        >
          <PlayCircle size={24} className="text-[#502B7D]" />
        </button>
        <div className="rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100">
          <div className="relative w-full aspect-[16/6] md:aspect-[16/5]">
            <Image
              src="/CS-landing.png"
              alt="Equipo trabajando en pizarra con indicadores"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="px-6 md:px-10 pt-8 pb-10">
            <h1 className="text-center text-3xl md:text-4xl font-extrabold text-[#5C2D91] drop-shadow-sm">
              Las áreas que transforman equipos y potencian organizaciones
            </h1>
            <p className="max-w-3xl mx-auto mt-5 text-center text-gray-700 leading-relaxed">
              Cada empresa enfrenta retos únicos. Por eso, en Uplin agrupamos nuestras soluciones de consultoría en temáticas clave que abordan todo el ciclo de talento: atracción, desarrollo, cultura, tecnología y cumplimiento.
              <br />
Explorá cada área para conocer cómo podemos acompañarte en la evolución de tu equipo y en el fortalecimiento de tu organización.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Cards */}
      <section className="container mx-auto p-10 px-4 sm:px-6 lg:px-8 space-y-6">
        {consultorias.map((e) => (
          <ConsultoriasCard key={e.id} consultorias={e} />
        ))}
      </section>
      <Banner />
    </main>
  );
}
