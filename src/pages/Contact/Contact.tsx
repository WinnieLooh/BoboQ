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
              Christian Zhang<br />
              BoboQ Int. GmbH<br />
              Marktstr. 10-E38<br />
              50968 Köln<br />
              {t('germany')}
            </p>
          </div>

          <div className="info-section">
            <h3>{t('email')}</h3>
            <p>
              <a href="mailto:info@boboq-int.com">info@boboq-int.com</a>
            </p>
          </div>
        </div>

        <h3>Schreib uns</h3>
        <div className="icons">
          <a
            href="https://wa.me/4915234768935"
            className="whatsapp"
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            title="+49 1523 476 89 35"
          >
            <img src={img('socials_logo/whatsapp.png')} alt="WhatsApp: +49 1523 476 89 35" />
            <span style={{ marginLeft: 8, fontWeight: 600 }}>+49 1523 476 89 35</span>
          </a>
        </div>
      </main>
    </div>
  );
};
