import { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
// import { products } from '../../data/products';
import { useLanguage } from '../../contexts/LanguageContext';
import './Home.scss';

const hero = `${import.meta.env.BASE_URL}images/display_bilder/hero.jpg`;

interface HomePageProps {
  onAddToCart: (productId: string, name: string, price: number, qty: number) => void;
}
function HomePage({ onAddToCart }: HomePageProps) {
  const { t, tp } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  // Select 2-3 random products per category for the bestseller carousel

  useEffect(() => {
    setLoading(true);
    // ...fetch or other effect logic here...
  }, []);

  // ...existing code...

  if (loading) {
    return <div className="home-page"><p>Lade Produkte...</p></div>;
  }
  if (error) {
    return <div className="home-page"><p className="no-products">{error}</p></div>;
  }

  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <h1>{t('welcomeTitle')}</h1>
          <p>{t('welcomeSubtitle')}</p>
        </div>
      </div>
      <div className="layout">
        <div className="hero-spacer" aria-hidden="true"></div>
        <main className="main">
          <div className="b2b-intro">
            <h3>{t('b2bIntroTitle')}</h3>
            <p>{t('b2bIntroText')}</p>
          </div>
          <h2 className="title-center">{t('productsTitle')}</h2>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/shop?category=${cat.id}`} className="category-card">
                <img src={cat.image} alt={cat.label} />
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
          <div className="featured-spacer" aria-hidden="true"></div>
          <h2 className="title-center featured-title">{t('featuredProducts')}</h2>
          <div className="carousel-container">
            <button className="carousel-arrow left" onClick={goPrev} aria-label={t('backToShop')}>
              ←
            </button>
            <div 
              ref={carouselRef}
              className={`carousel-track ${isResetting ? 'no-transition' : ''}`}
            >
              {[...displayProducts, ...displayProducts].map((product, index) => {
                const translatedName = tp(product.id, product.name);
                const isBoboQProduct = product.image.toLowerCase().includes('boboq') || 
                  product.name.toLowerCase().includes('boboq');
                return (
                  <div key={`${product.id}-${index}`} className="carousel-slide">
                    <Link to={`/product/${product.id}`} className="slide-link" aria-label={`${translatedName} ${t('description')}`}>
                      <img src={product.image} alt={translatedName} />
                      {isBoboQProduct && <div className="product-brand">BOBOQ</div>}
                      <h3 className="carousel-product-title">{translatedName}</h3>
                      <p className="carousel-product-price">{product.price.toFixed(2)} €</p>
                    </Link>
                    <button
                      className={`add-to-cart-btn ${addingId === product.id ? 'adding' : ''}`}
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={addingId === product.id}
                    >
                      {addingId === product.id ? `✓ ${t('added')}` : `🛒 ${t('addToCart')}`}
                    </button>
                  </div>
                );
              })}
            </div>
            <button className="carousel-arrow right" onClick={goNext} aria-label="Nächstes Produkt">
              →
            </button>
          </div>
        </main>
      </div>
    </div>
  );

// ...existing code...
}
export default HomePage;
