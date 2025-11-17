"use client"
import CardSolution from "@/components/CardSolution/CardSolution";
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

const Solutions = () => {
  // Función para el TTS de Solutions
  const handleSolutionsTTS = () => {
    const text = "Soluciones de talento flexibles, con el acompañamiento que necesitás. Flexibilidad: Adaptabilidad a las necesidades cambiantes de la empresa. Ahorro de costos: Más valor, menos costos asociados a consultorías tradicionales. Acceso a expertos: Disponibilidad de un equipo de RRHH especializado. Escalabilidad: Ajuste de servicios según el crecimiento o la necesidad.";
    speakText(text);
  };

  return (
    <div className="mb-16">
      <div className="flex items-center justify-center gap-3 mb-8 mt-8">
        <h1 className="font-poppins text-[28px] text-black font-semibold text-center">
          Soluciones de talento flexibles, con el acompañamiento que necesitás
        </h1>
        <button
          onClick={handleSolutionsTTS}
          className="p-2 hover:bg-[#502B7D]/10 rounded-full transition-colors duration-200 flex-shrink-0"
          aria-label="Escuchar soluciones"
          title="Escuchar texto"
        >
          <PlayCircle size={28} className="text-[#502B7D]" />
        </button>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        <CardSolution
          icon={"/iconFlexibilidad.svg"}
          title={"Flexibilidad"}
          description="Adaptabilidad a las necesidades cambiantes de la empresa."
        />
        <CardSolution
          icon={"/iconAhorroCostos.svg"}
          title={"Ahorro de costos"}
          description="Más valor, menos costos asociados a consultorías tradicionales."
        />
        <CardSolution
          icon={"/iconAccesoExpertos.svg"}
          title={"Acceso a expertos"}
          description="Disponibilidad de un equipo de RRHH especializado."
        />
        <CardSolution
          icon={"/iconEscalabilidad.svg"}
          title={"Escalabilidad"}
          description="Ajuste de servicios según el crecimiento o la necesidad."
        />
      </div>
    </div>
  );
};

export default Solutions;
