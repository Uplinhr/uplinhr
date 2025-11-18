"use client"
import CardBeneficiosMembresia from "@/components/CardServices/CardBeneficiosMembresia";
import CardsPlan from '@/views/cardsPlan';
import { Banner } from "@/components/banner/banner";
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

export default function Membresias() {
  const handleHeroTTS = () => {
    const text = "Potenciá tu gestion de talento con nuestras membresias empresariales. Suscribite a nuestras membresías empresariales y accede a todo lo que tu organización necesita para gestionar tu talento.";
    speakText(text);
  };

  return (
    <div>
      <section className="relative">
        <button
          onClick={handleHeroTTS}
          className="absolute top-4 right-4 p-2 hover:bg-[#502B7D]/10 rounded-full transition-colors duration-200 z-50 cursor-pointer"
          aria-label="Escuchar Membresías"
          title="Escuchar texto"
          type="button"
          style={{ pointerEvents: 'auto' }}
        >
          <PlayCircle size={24} className="text-[#502B7D]" />
        </button>
        <h1 className="font-poppins text-[28px] font-semibold text-center p-5">
          <span className="text-[#000000]">Potenciá tu gestion de talento</span>
          <br />
          <span className="text-[#000000]">con nuestras</span>{" "}
          <span className="text-[#502B7D]">membresias empresariales</span>
        </h1>
        <p className="text-lg text-center lg:text-base leading-relaxed">
          Suscribite a nuestras membresías empresariales
          <br />y accede a todo lo que tu organización necesita para gestionar
          tu talento
        </p>
      </section>

      <section>
        <h2 className="font-poppins text-[28px] font-semibold text-center mt-8 p-3">
          <span className="text-[#502B7D]">Beneficios</span>{" "}
          <span className="text-[#70C157]">+</span>
        </h2>
        <CardBeneficiosMembresia />
      </section>

      <section>
        <h1 className="font-poppins text-[28px] font-semibold text-center mt-12 p-5">
          Todo en un plan mensual que evoluciona con tu empresa 
        </h1>
        <CardsPlan />
      </section>
      <section>
        <Banner />
      </section>
    </div>
  );
}
