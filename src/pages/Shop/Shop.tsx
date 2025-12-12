import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import { useLanguage } from '../../contexts/LanguageContext';
import type { FilterCategory } from '../../types';
import './Shop.scss';

interface ShopPageProps {
  onAddToCart: (name: string, price: number, qty: number) => void;
}

export const ShopPage = ({ onAddToCart }: ShopPageProps) => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState<FilterCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const categoryParam = searchParams.get('category') as FilterCategory | null;
    if (categoryParam && ['boba', 'tapioka', 'tee', 'sirup', 'zubehor'].includes(categoryParam)) {
      setCurrentCategory(categoryParam);
    }
  }, [searchParams]);

  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: t('allCategory') },
    { id: 'boba', label: t('boba') },
    { id: 'tapioka', label: t('tapioka') },
    { id: 'tee', label: t('tee') },
    { id: 'sirup', label: t('sirup') },
    { id: 'zubehor', label: t('zubehor') },
  ];

  const parsePrice = (text: string): number => {
    const match = text.replace(/\s/g, '').match(/(\d+[\.,]?\d*)/);
    if (!match) return NaN;
    return parseFloat(match[1].replace(',', '.'));
  };

  const matchesSearch = (productName: string, term: string): boolean => {
    if (!term) return true;
    term = term.trim().toLowerCase();

    // Price comparison: price:<5 or price:>3.5 or price:=4.90
    const priceMatch = term.match(/^price:\s*([<>]=?|=)?\s*([\d\.,]+)$/i);
    if (priceMatch) {
      const op = priceMatch[1] || '=';
      const num = parsePrice(priceMatch[2]);
      const product = products.find((p) => p.name === productName);
      if (!product) return false;
      const p = product.price;

      switch (op) {
        case '<':
          return p < num;
        case '<=':
          return p <= num;
        case '>':
          return p > num;
        case '>=':
          return p >= num;
        case '=':
        default:
          return Math.abs(p - num) < 0.001;
      }
    }

    // Numeric term: try match price equals
    const numeric = term.match(/^([\d\.,]+)$/);
    if (numeric) {
      const num = parsePrice(numeric[1]);
      const product = products.find((p) => p.name === productName);
      if (!product) return false;
      return Math.abs(product.price - num) < 0.001;
    }

    // Text search
    return productName.toLowerCase().includes(term);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = currentCategory === 'all' || product.category === currentCategory;
      const searchMatch = matchesSearch(product.name, searchTerm);
      return categoryMatch && searchMatch;
    });
  }, [currentCategory, searchTerm]);

  return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="card">
          <div className="filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${currentCategory === cat.id ? 'active' : ''}`}
                onClick={() => setCurrentCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="shop-search">
            <input
              type="search"
              placeholder="Suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Produktsuche"
            />
          </div>

          <div className="products" id="products">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))
            ) : (
              <p className="no-products">Keine Produkte gefunden.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
