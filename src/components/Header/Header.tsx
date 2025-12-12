import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { products } from '../../data/products';
import type { Product } from '../../types';
import './Header.scss';

const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

interface HeaderProps {
  cart: { name: string; price: number; qty: number }[];
}

export const Header = ({ cart }: HeaderProps) => {
  const navigate = useNavigate();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const timeoutRef = useRef<number | null>(null);
  const searchTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShowPreview(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim().length > 0) {
      searchTimeoutRef.current = window.setTimeout(() => {
        const results = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(results);
        setShowSearchResults(true);
      }, 200);
    } else {
      setFilteredProducts([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (productId: string) => {
    setSearchQuery('');
    setShowSearchResults(false);
    navigate(`/product/${productId}`);
  };

  const handleSearchBlur = () => {
    // Delay to allow click on results
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/cart" className="cart">
              🛒
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
            {showPreview && totalItems > 0 && (
              <div 
                className="cart-preview"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
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
            <input 
              type="search" 
              placeholder="Suchen..." 
              aria-label="Suche"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.trim().length > 0 && setShowSearchResults(true)}
              onBlur={handleSearchBlur}
            />
            {showSearchResults && filteredProducts.length > 0 && (
              <div className="search-results">
                {filteredProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(product.id)}
                  >
                    <img src={product.image} alt={product.name} className="result-image" />
                    <div className="result-info">
                      <div className="result-name">{product.name}</div>
                      <div className="result-price">{product.price.toFixed(2)} €</div>
                    </div>
                  </div>
                ))}
                {filteredProducts.length > 5 && (
                  <div className="search-results-more">
                    +{filteredProducts.length - 5} weitere Ergebnisse
                  </div>
                )}
              </div>
            )}
            {showSearchResults && searchQuery.trim().length > 0 && filteredProducts.length === 0 && (
              <div className="search-results">
                <div className="search-no-results">Keine Produkte gefunden</div>
              </div>
            )}
          </div>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Light Mode aktivieren' : 'Dark Mode aktivieren'}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};
