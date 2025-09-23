'use client';

import { QaCard } from '@/components/qaCard/QaCard';
import { QUESTIONS} from '@/utils/qa';

export const QAView = () => {
  return (
    <div className="container mx-auto px-4 max-w-5xl min-h-screen">
        <section>
          <h2 className="font-poppins text-[28px] font-semibold text-center mb-8 mt-8">
          Preguntas frecuentes
        </h2>
        <div className="space-y-4">
          {QUESTIONS.map((item, index) => (
            <QaCard
              key={`general-${index}`}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
