'use client';

import { QaCard } from '@/components/qaCard/QaCard';
import { QUESTIONS } from '@/utils/qa';
import SectionTag from '@/components/SectionTag/SectionTag';

export const QAView = () => {
  return (
    <div className="max-w-[820px] mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <SectionTag text="FAQ" />
        <h2
          className="font-bold tracking-[var(--tracking-uplin-h2)] leading-[var(--leading-uplin-title)] mt-4"
          style={{ color: "var(--color-uplin-ink)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
        >
          Preguntas{" "}
          <span style={{
            background: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-orange))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}>
            frecuentes
          </span>
        </h2>
      </div>

      <div className="flex flex-col gap-[0.85rem]">
        {QUESTIONS.map((item, index) => (
          <QaCard key={`general-${index}`} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};
