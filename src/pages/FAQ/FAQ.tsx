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
  ];

  return (
    <div className="faq-page">
      <main>
        <h1>{t('frequentlyAsked')}</h1>
        {faqs.map((faq, index) => (
          <div key={index}>
            <h3>{t(faq.question as any)}</h3>
            <p>{t(faq.answer as any)}</p>
          </div>
        ))}
      </main>
    </div>
  );
};
