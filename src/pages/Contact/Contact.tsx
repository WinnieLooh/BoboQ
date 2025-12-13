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
            <div style={{margin: '18px 0'}}>
              <iframe
                title="BoboQ Köln Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.858964232132!2d6.963232315746019!3d50.90938497954509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf25b2e2e2e2e3%3A0x2e2e2e2e2e2e2e2e!2sMarktstr.%2010%2C%2050968%20K%C3%B6ln!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
                width="100%"
                height="220"
                style={{border:0, borderRadius:'12px'}}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="info-section">
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
            <h3 style={{marginTop: '18px'}}>{t('email')}</h3>
            <p>
              <a href="mailto:info@boboq-int.com">info@boboq-int.com</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
