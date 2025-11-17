'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { PlayCircle } from 'lucide-react';
import { QaItem } from '@/interfaces/index';
import { speakText } from '@/utils/textToSpeech';

export const QaCard = ({ question, answer, initialExpanded = false }: QaItem) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  // Función para el TTS de cada pregunta
  const handleQaTTS = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se expanda/colapse la tarjeta
    // Combinar pregunta y respuesta
    const answerText = Array.isArray(answer) ? answer.join('. ') : answer;
    const text = `${question}. ${answerText}`;
    speakText(text);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-4">
      <button
        className={`w-full p-4 flex justify-between items-center cursor-pointer bg-white rounded-lg
                  hover:bg-[#F3EBF8] transition-colors border border-gray-200
                  ${isExpanded ? 'rounded-b-none' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h3 className="text-[#6C4099] text-start font-poppins text-base font-semibold leading-6 w-full">
          {question}
        </h3>
        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          <button
            onClick={handleQaTTS}
            className="p-1.5 hover:bg-[#502B7D]/10 rounded-full transition-colors duration-200"
            aria-label={`Escuchar pregunta: ${question}`}
            title="Escuchar pregunta y respuesta"
          >
            <PlayCircle size={20} className="text-[#6C4099]" />
          </button>
          {isExpanded ? (
            <FaChevronUp className="text-[#6D4098] cursor-pointer" />
          ) : (
            <FaChevronDown className="text-[#6D4098] cursor-pointer" />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-white border border-gray-200 border-t-0 rounded-b-lg">
          {Array.isArray(answer) ? (
            answer.map((paragraph, idx) => (
              <p key={idx} className="text-gray-950 font-poppins text-base font-normal leading-6 mb-2 last:mb-0">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-black font-poppins text-base font-normal leading-6">
              {answer}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
