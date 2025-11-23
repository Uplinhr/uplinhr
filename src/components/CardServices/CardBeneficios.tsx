"use client"
import { ReactNode } from "react";
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

interface CardBeneficiosProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function CardBeneficios({ icon, title, description }: CardBeneficiosProps) {
  const handleTTS = () => {
    speakText(`${title}. ${description}`);
  };

  return (
    <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-sm shadow-[#502B7D] p-6 border border-[#502B7D] hover:shadow-md transition relative">
      <button
        onClick={handleTTS}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label={`Escuchar ${title}`}
        title="Escuchar texto"
      >
        <PlayCircle size={18} className="text-[#502B7D]" />
      </button>
      <div className="text-[#502B7D] text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-[#502B7D]">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  );
}
