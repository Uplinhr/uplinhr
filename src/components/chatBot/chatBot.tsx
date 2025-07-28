"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { chatbotData } from "@/utils/qaBot";
import { IOption } from "@/interfaces/index";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiX } from "react-icons/fi";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<IOption[]>(chatbotData.mainOptions);
  const [history, setHistory] = useState<{ options: IOption[]; question: string }[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const handleOptionClick = (option: IOption) => {
    setTransitionKey((prev) => prev + 1);
    setHistory((prev) => [...prev, { options: currentOptions, question: currentQuestion }]);
    setCurrentQuestion(option.text);

    if (option.response) {
      setCurrentResponse(option.response);
    } else if (option.subOptions) {
      setCurrentOptions(option.subOptions);
      setCurrentResponse("");
    }
  };

  const handleBack = () => {
    setTransitionKey((prev) => prev + 1);
    const previous = history.at(-1);
    if (previous) {
      setCurrentOptions(previous.options);
      setCurrentQuestion(previous.question);
      setHistory((prev) => prev.slice(0, -1));
      setCurrentResponse("");
    }
  };

  const resetChat = () => {
    setIsOpen(false);
    setCurrentOptions(chatbotData.mainOptions);
    setCurrentResponse("");
    setCurrentQuestion("");
    setHistory([]);
  };

  const IconButton = ({
    onClick,
    title,
    Icon,
  }: {
    onClick: () => void;
    title: string;
    Icon: React.ElementType;
  }) => (
    <button
      onClick={onClick}
      className="p-1 rounded-full hover:bg-[#5a3785] transition-colors cursor-pointer"
      title={title}
    >
      <Icon className="w-5 h-5" />
    </button>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 font-poppins">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full border-2 border-[#6C4099] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)]"
      >
        <Image
          src="/Uplinbot.svg"
          alt="UplinBot"
          width={50}
          height={50}
          className="hover:scale-105 transition-transform"
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" />

          <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col z-50">
            <div className="bg-[#6C4099] text-white p-[8px] flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
                  <Image src="/Uplinbot.svg" alt="UplinBot" width={18} height={18} />
                </div>
                <h3 className="font-black text-[14px] ml-2">UplinBot</h3>
              </div>
              <div className="flex space-x-2">
                <IconButton onClick={() => setIsOpen(false)} title="Minimizar" Icon={FiMinus} />
                <IconButton onClick={resetChat} title="Cerrar" Icon={FiX} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 max-h-[60vh]">
              <AnimatePresence mode="wait" key={transitionKey}>
                {currentResponse ? (
                  <motion.div
                    key="response"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      {currentQuestion && (
                        <p className="text-[#6C4099] text-sm mb-2 font-medium">{currentQuestion}</p>
                      )}
                      <p className="text-gray-700 text-sm whitespace-pre-line">{currentResponse}</p>
                    </div>
                    <button
                      onClick={handleBack}
                      className="text-[#6C4099] text-sm font-medium hover:underline flex items-center cursor-pointer"
                    >
                      Volver atrás
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="options"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {history.length === 0 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-700 text-sm mb-4"
                      >
                        {chatbotData.welcomeMessage}
                      </motion.p>
                    )}

                    <div className="space-y-2">
                      {currentOptions.map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => handleOptionClick(option)}
                          className="w-full text-left p-3 bg-gray-50 hover:bg-[#CABBD8] rounded-lg border border-gray-200 transition-colors cursor-pointer text-sm"
                          whileTap={{ scale: 0.98 }}
                        >
                          {option.text}
                        </motion.button>
                      ))}
                    </div>

                    {history.length > 0 && (
                      <button
                        onClick={handleBack}
                        className="mt-4 text-[#6C4099] text-sm font-medium hover:underline flex items-center cursor-pointer"
                      >
                        Volver al menú anterior
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
