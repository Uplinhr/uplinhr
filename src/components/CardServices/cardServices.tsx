"use client"
import { ReactNode } from "react"
import Image from "next/image"
import { PlayCircle } from "lucide-react"
import { speakText } from "@/utils/textToSpeech"

type CardServicesProps = {
  icon: ReactNode
  title: string
  description: string
  linkHref: string
  imageSrc: string
  imageAlt: string
}

export function CardServices({
  icon,
  title,
  description,
  linkHref,
  imageSrc,
  imageAlt,
}: CardServicesProps) {
  // Función para el TTS de CardServices
  const handleCardServicesTTS = () => {
    const text = `${title}. ${description}`;
    speakText(text);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto mb-6">
      {/* Content Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4 order-1">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-[#6C4099] flex-1">{title}</h2>
          <button
            onClick={handleCardServicesTTS}
            className="p-2 hover:bg-[#502B7D]/10 rounded-full transition-colors duration-200"
            aria-label={`Escuchar ${title}`}
            title="Escuchar texto"
          >
            <PlayCircle size={24} className="text-[#6C4099]" />
          </button>
        </div>

        <div className="w-full h-40 relative rounded-lg overflow-hidden mb-4 order-2 md:hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-right"
          />
        </div>

        <p className="text-gray-700 text-sm leading-relaxed mb-4 order-3">
          {description}
        </p>

        <a
          href={linkHref}
          className="text-[#6C4099] text-sm font-medium hover:text-purple-700 transition-colors order-4"
        >
          Descubre mas &gt;
        </a>
      </div>

      {/* Image Section (solo visible en desktop) */}
      <div className="w-48 h-32 relative rounded-lg overflow-hidden hidden md:block">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-right"
        />
      </div>
    </div>
  )
}
