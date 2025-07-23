'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { QaItem } from '@/interfaces/index';

export const QaCard = ({ question, answer, initialExpanded = false }: QaItem) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  return (
    <div className="w-full max-w-4xl mx-auto mb-4">
      <button
        className={`w-full p-4 flex justify-between items-center cursor-pointer bg-white rounded-lg
                  hover:bg-[#F3EBF8] transition-colors border border-gray-200
                  ${isExpanded ? 'rounded-b-none' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h3 className="text-[#1E1E1E] text-start font-poppins text-base font-semibold leading-6 w-full">
          {question}
        </h3>
        {isExpanded ? (
          <FaChevronUp className="text-[#6D4098] ml-2 flex-shrink-0 cursor-pointer" />
        ) : (
          <FaChevronDown className="text-[#6D4098] ml-2 flex-shrink-0 cursor-pointer" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-white border border-gray-200 border-t-0 rounded-b-lg">
          {Array.isArray(answer) ? (
            answer.map((paragraph, idx) => (
              <p key={idx} className="text-black font-poppins text-base font-normal leading-6 mb-2 last:mb-0">
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
