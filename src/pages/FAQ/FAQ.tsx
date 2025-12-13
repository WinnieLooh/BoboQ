
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './FAQ.scss';

export const FAQPage = () => {
  const { t } = useLanguage();

  const faqs = [
    { question: 'faqQuestion1', answer: 'faqAnswer1' },
    { question: 'faqQuestion2', answer: 'faqAnswer2' },
    { question: 'faqQuestion3', answer: 'faqAnswer3' },
    { question: 'faqQuestion4', answer: 'faqAnswer4' },
    { question: 'faqQuestion5', answer: 'faqAnswer5' },
    { question: 'faqQuestion6', answer: 'faqAnswer6' },
    { question: 'faqQuestion7', answer: 'faqAnswer7' },
  ];

  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="faq-page">
      <main>
        <h1>{t('frequentlyAsked')}</h1>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3
              className="faq-question"
              onClick={() => toggleIndex(index)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              aria-expanded={openIndexes.includes(index)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') toggleIndex(index);
              }}
            >
              {t(faq.question as any)}
            </h3>
            {openIndexes.includes(index) && (
              <p className="faq-answer">{t(faq.answer as any)}</p>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};
