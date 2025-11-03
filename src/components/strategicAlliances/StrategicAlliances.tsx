import Image from "next/image";

export const StrategicAlliances = () => {
  return (
    <section className="bg-[#F9F8FF] py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Columna izquierda: título, texto y botón */}
        <div className="text-left">
          <h2 className="text-[32px] leading-[40px] font-semibold font-poppins text-black mb-6">
            Programa de<br />
            <span className="text-[#6C4099]">Alianzas</span> Estratégicas
          </h2>
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
            Únete como Partner
          </a>
        </div>

     {/* Columna derecha: tarjetas */}
<div className="grid grid-cols-2 gap-x-6 gap-y-6 ml-auto w-fit">
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
      className="w-[280px] min-h-[140px] bg-white p-5 rounded-[18px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-row items-center gap-4"
    >
      <div className="flex flex-col text-left flex-1">
        <h3 className="text-sm font-semibold mb-2 text-[#6C4099]">{item.title}</h3>
        <p className="text-xs text-[#555] leading-relaxed">{item.description}</p>
      </div>
      <Image src={item.icon} alt={item.title} width={100} height={100} className="flex-shrink-0" />
    </div>
  ))}
</div>


      </div>

      {/* Logos de empresas colaboradoras */}
      <div className="mt-20 text-center">
        <p className="text-base font-semibold mb-6">Las empresas que ya colaboraron con nosotros</p>
        <div className="flex justify-center items-center gap-16">
          <Image src="/teamtailor-logo.png" alt="Teamtailor" width={160} height={50} />
          <Image src="/buk-logo.png" alt="Buk" width={140} height={50} />
        </div>
      </div>
    </section>
  );
};


