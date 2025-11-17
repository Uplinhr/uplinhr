"use client"
import Button from "@/components/Button/Button";
import Image from "next/image";
import { data } from "@/utils/paquetes";
import { CardCreditos } from "@/components/CardServices/CardCreditos";
import CardBeneficiosCreditos from "@/components/CardServices/CardBeneficiosCreditos";
import { Banner2 } from "@/components/banner/banner";
import CreditSimulatorModal from "@/components/simulador/CreditSimulatorModal";
import { QAView } from "../qaView";
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

export default function Creditos() {
  const handleHeaderTTS = () => {
    const text = "Créditos de talento para Startups y Pymes. Un modelo inteligente para optimizar tu reclutamiento. Compra créditos de búsquedas de talento y diseña tu proceso a medida. Sin vencimiento, flexible y con la garantía de Uplin.";
    speakText(text);
  };

  return (
    <main className="min-h-screen">
      {/* HEADER */}
      <section className="bg-[#502B7D] text-white py-16 px-4 relative">
        <button
          onClick={handleHeaderTTS}
          className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200 z-50 cursor-pointer"
          aria-label="Escuchar Créditos de talento"
          title="Escuchar texto"
          type="button"
          style={{ pointerEvents: 'auto' }}
        >
          <PlayCircle size={24} className="text-white" />
        </button>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/C-landing.png"
                  alt="Crédito de talentos"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-balance text-center lg:text-left">
                  Créditos de talento
                  <br />
                  para Startups y Pymes
                </h1>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg lg:text-xl font-semibold text-white">
                  Un modelo inteligente para optimizar tu reclutamiento
                </h2>

                <div className="space-y-2 text-white/90">
                  <p className="text-sm lg:text-base leading-relaxed">
                    Compra créditos de búsquedas de talento y diseña tu proceso
                    a medida.
                  </p>
                  <p className="text-sm lg:text-base leading-relaxed">
                    Sin vencimiento, flexible y con la garantía de Uplin.
                  </p>
                </div>
              </div>
              {/* 🔹 Se quitó el botón del header */}
            </div>
          </div>
        </div>
      </section>

      {/* PAQUETES */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="font-poppins text-[28px] font-semibold text-center mb-8 mt-8">
          <span className="text-black">Encontrá el</span>{" "}
          <span className="text-[#502B7D]">paquete perfecto</span>{" "}
          <span className="text-black">para tu empresa</span>
        </h2>

        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {data.map((paquete) => (
            <CardCreditos key={paquete.id} paquetes={paquete} />
          ))}
        </div>

        {/* 🔹 Botón del simulador movido debajo de los paquetes */}
        <div className="flex justify-center mt-12">
          <CreditSimulatorModal>
            <Button tag="Simulá tu paquete" mode={2} height={46} width={300} />
          </CreditSimulatorModal>
        </div>
      </section>

      {/* CRÉDITOS INDIVIDUALES */}
      <section>
        <div className="bg-[#6C4099] rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto text-white">
          <h2>
            Si tu paquete no se adapta a tus necesidades, comprá créditos
            individuales
          </h2>
          <Button
            link="https://u030x.share.hsforms.com/2dXErlXkESgeW2hE4_Xmnaw"
            tag="Adquirir aquí"
            mode={2}
            height={50}
            width={250}
          />
        </div>
      </section>

      {/* BENEFICIOS + QA + BANNER */}
      <section>
        <h2 className="font-poppins text-[28px] font-semibold text-center mt-8">
          <span className="text-[#502B7D]">Beneficios</span>{" "}
          <span className="text-[#70C157]">+</span>
        </h2>
        <CardBeneficiosCreditos />

        <QAView />

        <Banner2 />
      </section>
    </main>
  );
}
