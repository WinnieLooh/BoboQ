import { Link } from 'react-router-dom';
import './Footer.scss';

const img = (file: string) => `/images/${file}`;

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="brand">
          <Link to="/">
            <img src={img('logo_cropped.png')} alt="BoboQ Logo" />
          </Link>
        </div>
        <div className="footer-center">
          <p>BoboQ © 2025</p>
          <Link to="/imprint" className="imprint-link">
            Impressum
          </Link>
        </div>
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
      </div>
    </footer>
  );
};
