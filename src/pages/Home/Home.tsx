import { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { useLanguage } from '../../contexts/LanguageContext';
import './Home.scss';

const hero = `${import.meta.env.BASE_URL}images/display_bilder/hero.jpg`;

interface HomePageProps {
  onAddToCart: (productId: string, name: string, price: number, qty: number) => void;
}

export const HomePage = ({ onAddToCart }: HomePageProps) => {
  const { t, tp } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  // Select 2-3 random products per category for the bestseller carousel

  function getRandomItems<T>(arr: T[], n: number): T[] {
    if (arr.length <= n) return arr;
    const result = [] as T[];
    const used = new Set<number>();
    while (result.length < n && used.size < arr.length) {
      const idx = Math.floor(Math.random() * arr.length);
      if (!used.has(idx)) {
        used.add(idx);
        result.push(arr[idx]);
      }
    }
    return result;
  }

  const categoryIds = [
    'boba',
    'sirup',
    'tapioka',
    'tee',
    'pulver',
    'jelly',
    'jellyjuice',
    'crystal',
    'diy',
    'zubehor',
  ];

  const displayProducts = useMemo(() => {
    return categoryIds.flatMap(cat => {
      const prods = products.filter(p => p.category === cat);
      return getRandomItems(prods, 2 + Math.floor(Math.random() * 2)); // 2-3 random
    });
  }, [products]);
  const visibleCount = 4;
  const categories = [
    { id: 'boba', label: t('boba') },
    { id: 'sirup', label: t('sirup') },
    { id: 'tapioka', label: t('tapioka') },
    { id: 'tee', label: t('tee') },
    { id: 'pulver', label: t('pulver') },
    { id: 'jelly', label: t('jelly') },
    { id: 'jellyjuice', label: t('jellyjuice') },
    { id: 'crystal', label: t('crystal') },
    { id: 'diy', label: t('diy') },
    { id: 'zubehor', label: t('zubehor') },
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

  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product.id, product.name, product.price, 1);
    setAddingId(product.id);
    setTimeout(() => setAddingId(null), 600);
  };

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

                console.log('Home Carousel Debug', {
                  idx: index,
                  id: product.id,
                  name: product.name,
                  translatedName,
                  image: product.image,
                  isBoboQ: isBoboQProduct,
                });

                return (
                  <div key={`${product.id}-${index}`} className="carousel-slide">
                    <Link to={`/product/${product.id}`} className="slide-link" aria-label={`${translatedName} ${t('description')}`}>
                      <img src={product.image} alt={translatedName} />
                      {isBoboQProduct && <div className="product-brand">BOBOQ</div>}
                      <h3 style={{ color: '#e4e4e4', fontSize: '15px', fontWeight: 600, lineHeight: '1.4', marginBottom: '6px' }}>{translatedName}</h3>
                      <p style={{ color: '#8DA5FF', fontSize: '14px', fontWeight: 600 }}>{product.price.toFixed(2)} €</p>
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
};
