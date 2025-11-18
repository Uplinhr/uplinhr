"use client"
import CardsPlan from "@/views/cardsPlan";
import Button from "@/components/Button/Button";
import ComparativeCard from "@/views/comparativeCard";
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

const Planes = () => {
  const handleHeaderTTS = () => {
    const text = "Potenciá tu gestión de talento con los planes flexibles de Uplin. La diferencia está en el nivel de profundidad, en la cantidad de asesorías, nivel de acompañamiento y búsquedas de talento que tenés a disposición.";
    speakText(text);
  };

  return (
    <section className="bg-white h-auto relative">
      <button
        onClick={handleHeaderTTS}
        className="absolute top-4 right-4 p-2 hover:bg-[#502B7D]/10 rounded-full transition-colors duration-200 z-50 cursor-pointer"
        aria-label="Escuchar Planes"
        title="Escuchar texto"
        type="button"
        style={{ pointerEvents: 'auto' }}
      >
        <PlayCircle size={24} className="text-[#502B7D]" />
      </button>
      <div className="pt-16 mb-14 font-poppins">
        <h1 className="mb-[30px] text-center font-semibold text-[28px]">
          Potenciá tu gestión de talento con los planes flexibles de Uplin
        </h1>
        <h3 className="text-center font-400 text-[20px]">
          La diferencia está en el nivel de profundidad, en la cantidad de
          asesorías,
          <br /> nivel de acompañamiento y búsquedas de talento que tenés a
          disposición.
        </h3>
      </div>

      <CardsPlan />

      <ComparativeCard />

      <div className="mx-auto mt-10 mb-14 font-poppins w-2/3 h-auto bg-[#FDE6C7] rounded-[20px] px-6 py-10 text-center">
        <h2 className="mb-4 text-black text-[28px] font-stretch-75% leading-10">
          ¿Tenés dudas sobre qué plan elegir?
        </h2>
        <h4 className="text-black text-[18px] font-normal leading-normal mb-2">
          Podés escribirnos con tus dudas o agendar una llamada.
        </h4>
        <a
          href="mailto:contacto@uplinhr.com"
          className="text-black underline font-medium hover:text-[#502B7D] transition-colors duration-200"
        >
          contacto@uplinhr.com
        </a>

        <div className="my-8 flex justify-center">
          <Button
            link="https://outlook.office365.com/book/ConectconUplin1@uplinhr.com/?ismsaljsauthenabled=true"
            tag="Agenda una llamada"
            mode={3}
            height={50}
            width={250}
          />
        </div>
      </div>
    </section>
  );
};

export default Planes;
