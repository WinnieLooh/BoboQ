import { Link } from 'react-router-dom';
import './Header.scss';

const img = (file: string) => `/images/${file}`;

interface HeaderProps {
  cart: { name: string; price: number; qty: number }[];
}

export const Header = ({ cart }: HeaderProps) => {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="header">
      <div className="container">
        <div className="brand">
          <Link to="/">
            <img src={img('logo_cropped.png')} alt="BoboQ Logo" />
          </Link>
        </div>
        <nav className="nav-center" aria-label="Hauptnavigation">
          <div className="nav-icons">
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
          <Link to="/">Home</Link>
          <Link to="/shop">Produkte</Link>
          <Link to="/contact">Kontakt</Link>
          <Link to="/faq">FAQ</Link>
        </nav>
        <div className="nav-right">
          <Link to="/cart" className="cart">
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          <div className="nav-search">
            <input type="search" placeholder="Suchen..." aria-label="Suche" />
          </div>
        </div>
      </div>
    </header>
  );
};
