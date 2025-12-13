import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.scss';

const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

export const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="brand">
          <Link to="/">
            <img src={img('boboq_logo/_cropped.png')} alt="BoboQ Logo" />
          </Link>
        </div>
        <div className="footer-center">
          <p>BoboQ © 2025</p>
          <Link to="/imprint" className="imprint-link">
            {t('imprint')}
          </Link>
        </div>
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
          </a>
        </div>
      </div>
    </footer>
  );
};
