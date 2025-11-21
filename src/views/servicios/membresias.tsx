"use client";
import CardBeneficiosMembresia from "@/components/CardServices/CardBeneficiosMembresia";
import CardsPlan from "@/views/cardsPlan";
import Image from "next/image";
import { Banner } from "@/components/banner/banner";
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

export default function Membresias() {
  const handleHeroTTS = () => {
    const text =
      "Potenciá tu gestion de talento con nuestras membresias empresariales. Suscribite a nuestras membresías empresariales y accede a todo lo que tu organización necesita para gestionar tu talento.";
    speakText(text);
  };

  return (
    <div>
      <section className="relative w-full max-w-6xl mx-auto px-4 pt-20 pb-10 flex flex-col items-center text-center">
        {/* Botón de audio */}
        <button
          onClick={handleHeroTTS}
          className="absolute top-4 right-4 p-2 hover:bg-[#502B7D]/10 rounded-full transition-colors duration-200 z-50 cursor-pointer"
          aria-label="Escuchar Membresías"
          title="Escuchar texto"
          type="button"
          style={{ pointerEvents: "auto" }}
        >
          <PlayCircle size={28} className="text-[#502B7D]" />
        </button>

        {/* Imagen decorativa de fondo (el óvalo verde) */}
        <div className="absolute pointer-events-none -z-10 opacity-90">
          <Image
            src="/marco.uplin.png"
            alt="Marco decorativo"
            width={1200}
            height={600}
            className="max-w-xl object-contain
              pl-10 ml-[380px]
              md:pl-6 md:ml-[200px]
              sm:pl-2 sm:ml-[60px]"
          />
        </div>

        {/* Texto principal */}
        <h1 className="font-poppins text-[30px] md:text-[36px] font-semibold leading-tight text-[#000000]">
          Potenciá tu gestión de talento
          <br />
          <span>con nuestras membresías empresariales</span>
        </h1>

        <p className="mt-4 text-lg md:text-base max-w-2xl leading-relaxed text-[#333]">
          Suscribite a nuestras membresías empresariales y accedé a todo lo que
          tu organización necesita para gestionar tu talento.
        </p>
      </section>

      <section className="w-ful flex justify-center px-4">
        <div className="relative w-full max-w-5xl flex justify-items-">
          {/* Caja morada */}
          <div
            className="
        absolute 
        top-4 left-1/2 -translate-x-1/2
        sm:top-6
        bg-[#6A33A8] text-white 
        rounded-xl 
        px-3 py-2 
        sm:px-5 sm:py-3
        text-center 
        shadow-lg 
        z-20
      "
          >
            <p className="font-semibold leading-snug text-xs sm:text-sm">
              Soluciones <br /> para tu <br /> empresa
            </p>
          </div>

          {/* Imagen más pequeña */}
          <Image
            src="/mebresias-oficina.png"
            width={1200}
            height={700}
            alt="Equipo trabajando"
            className="
        w-[50%]     /* Imagen al 50% del contenedor */
        sm:w-[55%]  
        h-auto 
        rounded-2xl 
        object-cover
      "
          />
        </div>
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
