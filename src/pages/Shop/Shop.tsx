import { useState, useMemo } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import type { FilterCategory } from '../../types';
import './Shop.scss';

interface ShopPageProps {
  onAddToCart: (name: string, price: number, qty: number) => void;
}

export const ShopPage = ({ onAddToCart }: ShopPageProps) => {
  const [currentCategory, setCurrentCategory] = useState<FilterCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'Alle' },
    { id: 'boba', label: 'Boba' },
    { id: 'tapioka', label: 'Tapioka' },
    { id: 'tee', label: 'Tee' },
    { id: 'sirup', label: 'Sirup' },
    { id: 'zubehor', label: 'Zubehör' },
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
      const num = parseFloat(priceMatch[2].replace(',', '.'));
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
      const num = parseFloat(numeric[1].replace(',', '.'));
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
