import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import './Home.scss';

const hero = '/images/logo_becher.png';

export const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const displayProducts = products.slice(0, 8);
  const visibleCount = 4;
  const categories = [
    { id: 'boba', label: 'Boba' },
    { id: 'tapioka', label: 'Tapioka' },
    { id: 'tee', label: 'Tee' },
    { id: 'sirup', label: 'Sirup' },
    { id: 'zubehor', label: 'Zubehör' },
  ];

  const goNext = () => {
    if (isResetting) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (isResetting) return;
    if (currentIndex === 0) {
      setIsResetting(true);
      setCurrentIndex(displayProducts.length - 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--hero-bg', `url(${hero})`);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [displayProducts.length, isResetting]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.setProperty('--carousel-offset', `${currentIndex * (100 / visibleCount)}%`);
    }
  }, [currentIndex]);

  useEffect(() => {
    const track = carouselRef.current;
    if (!track) return;

    const handleTransitionEnd = () => {
      if (currentIndex >= displayProducts.length) {
        setIsResetting(true);
        setCurrentIndex(0);
      }
    };

    track.addEventListener('transitionend', handleTransitionEnd);
    return () => track.removeEventListener('transitionend', handleTransitionEnd);
  }, [currentIndex, displayProducts.length]);

  useEffect(() => {
    if (!isResetting) return;
    const id = requestAnimationFrame(() => setIsResetting(false));
    return () => cancelAnimationFrame(id);
  }, [isResetting]);

  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <h1>Willkommen bei BoboQ</h1>
          <p>Entdecke unsere leckeren Bubble Tea Produkte</p>
        </div>
      </div>

      <div className="layout">
        <main className="main">
          <h2 className="title-center">Produkte</h2>

          <div className="category-grid">
            {categories.map((cat) => {
              const product = products.find((p) => p.category === cat.id);
              if (!product) return null;
              return (
                <Link key={cat.id} to={`/shop?category=${cat.id}`} className="category-card">
                  <img src={product.image} alt={cat.label} />
                  <span>{cat.label}</span>
                </Link>
              );
            })}
          </div>

          <h2 className="title-center">Beliebte Produkte</h2>

          <div className="carousel-container">
            <button className="carousel-arrow left" onClick={goPrev} aria-label="Vorheriges Produkt">
              ←
            </button>
            <div 
              ref={carouselRef}
              className={`carousel-track ${isResetting ? 'no-transition' : ''}`}
            >
              {[...displayProducts, ...displayProducts].map((product, index) => (
                <div key={`${product.id}-${index}`} className="carousel-slide">
                  <Link to={`/product/${product.id}`} className="slide-link" aria-label={`${product.name} Details ansehen`}>
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.price.toFixed(2)} €</p>
                  </Link>
                </div>
              ))}
            </div>
            <button className="carousel-arrow right" onClick={goNext} aria-label="Nächstes Produkt">
              →
            </button>
          </div>

        </main>

      </div>
    </div>
  );
};
