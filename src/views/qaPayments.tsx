'use client';

import { QaCard } from '@/components/qaCard/QaCard';
import {PAYMENT_QUESTIONS } from '@/utils/qa';

export const QAViewP = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
        <section>
        <div className="space-y-4">
          {PAYMENT_QUESTIONS.map((item, index) => (
            <QaCard
              key={`payment-${index}`}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </section>
    </div>
  );
};