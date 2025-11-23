"use client"
import Image from "next/image";
import { Consultorias } from "@/utils/consultorias";
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";

export default function ConsultoriasCard({ consultorias }: { consultorias: Consultorias }) {
  const { name, tags, description, imageUrl} = consultorias;

  const handleTTS = () => {
    const tagsText = tags.join(", ");
    speakText(`${name}. ${tagsText}. ${description}`);
  };

  return (
    <article
      className="
        bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)]
        p-4 md:p-5
        flex flex-col md:flex-row
        items-center md:items-start
        gap-4 md:gap-6
      "
    >
      {/* Foto con fondo morado */}
      <div
        className="
          relative shrink-0
          w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40
          rounded-xl overflow-hidden
          mx-auto md:mx-0
        "
      >
        <div className="absolute inset-0 bg-[#5C2D91]" />
        <Image src={imageUrl} alt={name} fill className="object-contain" />
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0 w-full text-center md:text-left">
        <header className="flex items-start justify-center md:justify-between gap-3">
          <div className="flex items-center gap-2 w-full justify-center md:justify-start">
            <h3 className="text-2xl md:text-2xl font-semibold text-[#4B2C7C]">
              {name}
            </h3>
            <button
              onClick={handleTTS}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0"
              aria-label={`Escuchar ${name}`}
              title="Escuchar texto"
            >
              <PlayCircle size={22} className="text-[#4B2C7C]" />
            </button>
          </div>

        </header>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-block text-sm px-3 py-1 rounded-lg border border-[#5C2D91]/40 text-[#5C2D91] bg-[#F7F2FF]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="mt-3 text-gray-700 leading-relaxed">{description}</p>

      </div>
    </article>
  );
}


