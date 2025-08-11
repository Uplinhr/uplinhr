"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { QaItem } from "@/interfaces/index";

export const QaCursosCompletos = ({
  question,
  answer,
  initialExpanded = false,
}: QaItem) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  return (
    <div className="w-full bg-white overflow-hidden rounded-lg shadow-md">
      <motion.button
        type="button"
        className="w-full px-6 py-4 flex justify-between items-center cursor-pointer bg-white"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`answer-${question.replace(/\s+/g, "-").toLowerCase()}`}
        whileHover={{ backgroundColor: "#F9F5FF" }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-[#6D4098] font-poppins text-[16px] font-semibold text-start w-full">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <FaChevronUp className="text-[#6D4098] ml-2 flex-shrink-0" />
          ) : (
            <FaChevronDown className="text-[#6D4098] ml-2 flex-shrink-0" />
          )}
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`answer-${question.replace(/\s+/g, "-").toLowerCase()}`}
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ 
              maxHeight: 500, 
              opacity: 1,
              transition: {
                maxHeight: { duration: 0.3 },
                opacity: { duration: 0.2, delay: 0.1 }
              }
            }}
            exit={{ 
              maxHeight: 0, 
              opacity: 0,
              transition: {
                maxHeight: { duration: 0.2 },
                opacity: { duration: 0.1 }
              }
            }}
            className="w-full bg-[#6C4099] overflow-hidden"
          >
            <div className="py-4 px-6">
              {Array.isArray(answer) ? (
                answer.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="text-[#F5F5F5] font-poppins text-[14px] font-normal leading-[28px] mb-2 last:mb-0"
                  >
                    {paragraph}
                  </motion.p>
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#F5F5F5] font-poppins text-[16px] font-normal leading-[28px]"
                >
                  {answer}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};