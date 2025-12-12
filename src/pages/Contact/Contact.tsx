import { useLanguage } from '../../contexts/LanguageContext';
import './Contact.scss';

const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

export const ContactPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="contact-page">
      <main>
        <h1>{t('contact')}</h1>
        
        <div className="contact-info">
          <div className="info-section">
            <h3>{t('address')}</h3>
            <p>
              BoboQ Bubble Tea<br />
              Ehrenstraße 42<br />
              50672 Köln<br />
              {t('germany')}
            </p>
          </div>

          <div className="info-section">
            <h3>{t('email')}</h3>
            <p>
              <a href="mailto:info@boboq.de">info@boboq.de</a>
            </p>
          </div>
        </div>

        <h3>{t('followUs')}</h3>
        <div className="icons">
          <a href="#" aria-label="Instagram">
            <img src={img('instagram.png')} alt="Instagram" />
          </a>
          <a href="#" aria-label="TikTok">
            <img src={img('tiktok.png')} alt="TikTok" />
          </a>
          <a href="#" className="whatsapp" aria-label="WhatsApp">
            <img src={img('whatsapp.png')} alt="WhatsApp" />
          </a>
        </div>
      </main>
    </div>
  );
};
