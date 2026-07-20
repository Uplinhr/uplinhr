'use client';

import { useState } from 'react';
import { ChevronDown, Volume2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { QaItem } from '@/interfaces/index';
import { speakText } from '@/utils/textToSpeech';

export const QaCard = ({ question, answer, initialExpanded = false }: QaItem) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const handleQaTTS = () => {
    const answerText = Array.isArray(answer) ? answer.join('. ') : answer;
    const text = `${question}. ${answerText}`;
    speakText(text);
  };

  return (
    <div
      style={{
        background: "var(--color-uplin-glass-bg-strong)",
        backdropFilter: "blur(20px) saturate(170%)",
        border: "1px solid var(--color-uplin-glass-border)",
        borderRadius: "var(--radius-uplin-lg)",
        overflow: "hidden",
        transition: "background 0.2s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.55)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--color-uplin-glass-bg-strong)"; }}
    >
      <button
        type="button"
        style={{
          width: "100%",
          padding: "1.2rem 1.5rem",
          textAlign: "left",
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--color-uplin-ink)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span style={{ flex: 1 }}>{question}</span>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleQaTTS();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                handleQaTTS();
              }
            }}
            className="uplin-tts-btn"
            aria-label={`Escuchar pregunta: ${question}`}
            title="Escuchar pregunta y respuesta"
          >
            <Volume2 size={18} />
          </span>

          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ color: "var(--color-uplin-purple)", display: "flex" }}
          >
            <ChevronDown size={18} />
          </motion.span>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 1.5rem 1.4rem",
                fontSize: "0.93rem",
                lineHeight: 1.6,
                color: "var(--color-uplin-ink-soft)",
              }}
            >
              {Array.isArray(answer) ? (
                answer.map((paragraph, idx) => (
                  <p key={idx} style={{ marginBottom: idx < answer.length - 1 ? "0.5rem" : 0 }}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>{answer}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
