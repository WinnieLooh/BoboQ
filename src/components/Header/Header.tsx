import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.scss';

const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

interface HeaderProps {
  cart: { name: string; price: number; qty: number }[];
}

export const Header = ({ cart }: HeaderProps) => {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [showPreview, setShowPreview] = useState(false);

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
          <div
            className="cart-wrapper"
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={() => setShowPreview(false)}
          >
            <Link to="/cart" className="cart">
              🛒
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
            {showPreview && totalItems > 0 && (
              <div className="cart-preview">
                <div className="cart-preview-header">
                  Warenkorb ({totalItems} {totalItems === 1 ? 'Artikel' : 'Artikel'})
                </div>
                <div className="cart-preview-items">
                  {cart.map((item, index) => (
                    <div key={index} className="cart-preview-item">
                      <div className="item-info">
                        <div className="item-name">{item.name}</div>
                        <div className="item-qty">{item.qty} × {item.price.toFixed(2)} €</div>
                      </div>
                      <div className="item-total">
                        {(item.price * item.qty).toFixed(2)} €
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-preview-footer">
                  <div className="preview-total">
                    <span>Gesamt:</span>
                    <span className="total-price">{totalPrice.toFixed(2)} €</span>
                  </div>
                  <Link to="/cart" className="view-cart-btn">
                    Zum Warenkorb
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="nav-search">
            <input type="search" placeholder="Suchen..." aria-label="Suche" />
          </div>
        </div>
      </div>
    </header>
  );
};
