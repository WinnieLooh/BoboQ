import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { products } from '../../data/products';
import type { Product } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Language } from '../../i18n';
import './Header.scss';

const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

interface HeaderProps {
  cart: { name: string; price: number; qty: number }[];
  onRemoveFromCart?: (index: number) => void;
  onChangeQty?: (index: number, qty: number) => void;
}

export const Header = ({ cart, onRemoveFromCart, onChangeQty }: HeaderProps) => {
  const navigate = useNavigate();
  const { t, tp, language, setLanguage } = useLanguage();
  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const timeoutRef = useRef<number | null>(null);
  const searchTimeoutRef = useRef<number | null>(null);
  const langTimeoutRef = useRef<number | null>(null);

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
      if (langTimeoutRef.current) {
        clearTimeout(langTimeoutRef.current);
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

  const handleLangMouseEnter = () => {
    if (langTimeoutRef.current) {
      clearTimeout(langTimeoutRef.current);
      langTimeoutRef.current = null;
    }
    setShowLangMenu(true);
  };

  const handleLangMouseLeave = () => {
    langTimeoutRef.current = window.setTimeout(() => {
      setShowLangMenu(false);
    }, 300);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  const languageFlags: Record<Language, string> = {
    de: '🇩🇪',
    en: '🇬🇧',
    vi: '🇻🇳',
    zh: '🇨🇳',
  };

  const languageNames: Record<Language, string> = {
    de: 'Deutsch',
    en: 'English',
    vi: 'Tiếng Việt',
    zh: '中文',
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
          <Link to="/">{t('home')}</Link>
          <Link to="/shop">{t('products')}</Link>
          <Link to="/contact">{t('contact')}</Link>
          <Link to="/faq">{t('faq')}</Link>
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
                  {t('cart')} ({totalItems} {t('articles')})
                </div>
                <div className="cart-preview-items">
                  {cart.map((item, index) => (
                    <div key={index} className="cart-preview-item">
                      <div className="item-info">
                        <div className="item-name">{item.name}</div>
                        <div className="item-controls">
                          <input 
                            type="number" 
                            min="1" 
                            value={item.qty}
                            onChange={(e) => {
                              const newQty = parseInt(e.target.value) || 1;
                              onChangeQty?.(index, newQty);
                            }}
                            className="qty-input"
                          />
                          <span className="item-price">× {item.price.toFixed(2)} €</span>
                          <button 
                            onClick={() => onRemoveFromCart?.(index)}
                            className="remove-btn"
                            aria-label="Aus Warenkorb entfernen"
                            title="Entfernen"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <div className="item-total">
                        {(item.price * item.qty).toFixed(2)} €
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-preview-footer">
                  <div className="preview-total">
                    <span>{t('total')}:</span>
                    <span className="total-price">{totalPrice.toFixed(2)} €</span>
                  </div>
                  <Link to="/cart" className="view-cart-btn">
                    {t('viewCart')}
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="nav-search">
            <input 
              type="search" 
              placeholder={t('search')} 
              aria-label={t('search')}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.trim().length > 0 && setShowSearchResults(true)}
              onBlur={handleSearchBlur}
            />
            {showSearchResults && filteredProducts.length > 0 && (
              <div className="search-results">
                {filteredProducts.slice(0, 5).map((product) => {
                  const translatedName = tp(product.id, product.name);
                  return (
                  <div
                    key={product.id}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(product.id)}
                  >
                    <img src={product.image} alt={translatedName} className="result-image" />
                    <div className="result-info">
                      <div className="result-name">{translatedName}</div>
                      <div className="result-price">{product.price.toFixed(2)} €</div>
                    </div>
                  </div>
                );})}
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
          <div 
            className="lang-selector"
            onMouseEnter={handleLangMouseEnter}
            onMouseLeave={handleLangMouseLeave}
          >
            <button 
              className="lang-toggle"
              aria-label="Sprache wählen"
              title="Sprache"
            >
              {languageFlags[language]}
            </button>
            {showLangMenu && (
              <div className="lang-menu">
                {(['de', 'en', 'vi', 'zh'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    className={`lang-option ${language === lang ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(lang)}
                  >
                    <span className="lang-flag">{languageFlags[lang]}</span>
                    <span className="lang-name">{languageNames[lang]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
