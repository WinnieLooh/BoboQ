import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="brand">
          <Link to="/">
            <img src="/public/images/logo_cropped.png" alt="BoboQ Logo" />
          </Link>
        </div>
        <nav className="nav-center" aria-label="Hauptnavigation">
          <Link to="/">Home</Link>
          <Link to="/shop">Produkte</Link>
          <Link to="/contact">Kontakt</Link>
          <Link to="/faq">FAQ</Link>
        </nav>
        <div className="nav-right">
          <Link to="/cart" className="cart">
            🛒
          </Link>
          <div className="nav-search">
            <input type="search" placeholder="Suchen..." aria-label="Suche" />
          </div>
          <div className="nav-icons">
            <a href="#" aria-label="Instagram">
              <img src="/public/images/instagram.png" alt="Instagram" />
            </a>
            <a href="#" aria-label="TikTok">
              <img src="/public/images/tiktok.png" alt="TikTok" />
            </a>
            <a href="#" className="whatsapp" aria-label="WhatsApp">
              <img src="/public/images/whatsapp.png" alt="WhatsApp" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
