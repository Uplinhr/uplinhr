"use client"
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

export const StrategicAlliances = () => {
  const handleTTS = () => {
    const text = "Programa de alianzas estratégicas. En Uplin creemos en el poder de la colaboración. Nuestro programa de alianzas estratégicas está diseñado para conectar con empresas que, como nosotros, impulsan el crecimiento y la innovación en el talento humano. Buscamos consultoras de Recursos Humanos, empresas de tecnología, agencias de reclutamiento, y proveedores de servicios complementarios que quieran potenciar su propuesta de valor junto a nosotros.";
    speakText(text);
  };

  return (
    <section className="bg-white py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Columna izquierda: título, texto y botón */}
        <div className="text-left">
          <div className="flex items-start gap-3 mb-6">
            <h2 className="text-2xl md:text-[32px] leading-tight md:leading-[40px] font-semibold font-poppins text-black">
              Programa de<br />
              <span className="text-[#6C4099]">alianzas</span> estratégicas
            </h2>
            <button
              onClick={handleTTS}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0 mt-1"
              aria-label="Escuchar texto de alianzas estratégicas"
              title="Escuchar texto"
            >
              <PlayCircle size={28} className="text-[#6C4099]" />
            </button>
          </div>
          <p className="text-base text-[#333] mb-4 max-w-md">
            En Uplin creemos en el poder de la colaboración. Nuestro programa de alianzas estratégicas
            está diseñado para conectar con empresas que, como nosotros, impulsan el crecimiento y la 
            innovación en el talento humano.
          </p>
          <p className="text-base text-[#333] mb-8 max-w-md">
            Buscamos consultoras de RRHH, empresas de tecnología, agencias de reclutamiento, y proveedores
            de servicios complementarios que quieran potenciar su propuesta de valor junto a nosotros.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc1uYUAIh7E867j83LHlaKAV4ynZFdlZvmHo81JzRodVqExXw/viewform?usp=publish-editor"
            className="bg-[#6C4099] text-white font-semibold py-3 px-6 rounded-lg inline-block hover:bg-[#5a3480] transition-colors"
          >
            Únete como partner
          </a>
        </div>

     {/* Columna derecha: tarjetas */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:ml-auto w-full lg:w-fit">
  {[
    {
      title: "Co-Crecimiento",
      description: "Accede a oportunidades conjuntas de negocio y desarrollo de nuevos proyectos.",
      icon: "/manos.png",
    },
    {
      title: "Visibilidad y posicionamiento",
      description: "Aparece en nuestro ecosistema de partners y participa en acciones de marketing compartidas.",
      icon: "/visibilidad.png",
    },
    {
      title: "Integración de servicios",
      description: "Amplía tu portafolio con soluciones de staffing, créditos de talento y consultoría estratégica.",
      icon: "/integracion.png",
    },
    {
      title: "Soporte y capacitación",
      description: "Recibe materiales, entrenamiento y acompañamiento para potenciar la colaboración.",
      icon: "/soporte.png",
    },
  ].map((item, index) => (
    <div
      key={index}
      className="relative w-full md:w-[280px] min-h-[140px] bg-white p-4 md:p-5 pr-24 md:pr-20 rounded-[18px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row items-center overflow-visible"
    >
      <div className="flex flex-col text-left flex-1 pr-2">
        <div className="flex items-center gap-1 mb-2">
          <h3 className="text-sm font-semibold text-[#6C4099]">{item.title}</h3>
          <button
            onClick={() => speakText(`${item.title}. ${item.description}`)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0"
            aria-label={`Escuchar ${item.title}`}
            title="Escuchar texto"
          >
            <PlayCircle size={18} className="text-[#6C4099]" />
          </button>
        </div>
        <p className="text-xs text-[#555] leading-relaxed">{item.description}</p>
      </div>
      <Image src={item.icon} alt={item.title} width={130} height={130} className="absolute -right-5 md:-right-7 top-1/2 -translate-y-1/2 flex-shrink-0 w-24 h-24 md:w-28 md:h-28 lg:w-[130px] lg:h-[130px]" />
    </div>
  ))}
</div>


      </div>

      {/* Logos de empresas colaboradoras */}
      <div className="mt-12 md:mt-20 text-center px-4">
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6">Nuestros partners</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          <Image src="/teamtailor-logo.png" alt="Teamtailor" width={250} height={100} className="w-40 md:w-48 lg:w-52 h-auto" />
          <Image src="/buk-logo.png" alt="Buk" width={140} height={50} className="w-28 md:w-36 h-auto" />
        </div>
      </div>
    </section>
  );
};


