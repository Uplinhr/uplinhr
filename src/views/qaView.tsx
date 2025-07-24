'use client';

import { QaCard } from '@/components/qaCard/QaCard';
import { QUESTIONS} from '@/utils/qa';

export const QAView = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
        <section>
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
