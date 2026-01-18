"use client"
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

const BenefitsSection = () => {
  const handleBenefitsTTS = () => {
    const text = "Beneficios claves. Descubre por qué las empresas eligen People Partner Staffing para sus necesidades de RR.HH. Flexibilidad: escala tu equipo de RR.HH. según la demanda, sin contratos a largo plazo. Ahorro de costos: olvídate de los gastos de nómina, beneficios y procesos de contratación. Expertise inmediata: accede al conocimiento especializado de profesionales de alto nivel, listos para empezar desde el primer día. Enfoque estratégico: dedica tu tiempo a lo importante, mientras un experto se encarga de los proyectos de People Ops que requieren atención.";
    speakText(text);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            Beneficios <span className="text-[#502B7D]">claves</span>
          </h2>
          <button
            onClick={handleBenefitsTTS}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Escuchar beneficios"
            title="Escuchar texto"
          >
            <PlayCircle size={24} className="text-[#502B7D]" />
          </button>
        </div>
        <p className="mt-2 text-gray-600 mb-12">
          Descubre por qué las empresas eligen People Partner Staffing para sus necesidades de RR.HH.
        </p>

        <div className="mt-12 text-left max-w-2xl mx-auto">
          <ul className="list-none space-y-6">
            <li>
              <h3 className="text-lg font-semibold text-[#502B7D]">
                + Flexibilidad: <span className="text-gray-600 font-normal">escala tu equipo de RR.HH. según la demanda, sin contratos a largo plazo.</span>
              </h3>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-[#502B7D]">
                + Ahorro de costos: <span className="text-gray-600 font-normal">olvídate de los gastos de nómina, beneficios y procesos de contratación.</span>
              </h3>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-[#502B7D]">
                + Expertise inmediata: <span className="text-gray-600 font-normal">accede al conocimiento especializado de profesionales de alto nivel, listos para empezar desde el primer día.</span>
              </h3>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-[#502B7D]">
                + Enfoque estratégico: <span className="text-gray-600 font-normal">dedica tu tiempo a lo importante, mientras un experto se encarga de los proyectos de People Ops que requieren atención.</span>
              </h3>
            </li>
          </ul>
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