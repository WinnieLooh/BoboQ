import { useState } from 'react';
import type { Product } from '../../types';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, name: string, price: number, qty: number) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { t, tp } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product.id, product.name, product.price, quantity);
    setQuantity(1);
    setTimeout(() => setIsAdding(false), 600);
  };

  const translatedName = tp(product.id, product.name);

  return (
    <div className="product" data-category={product.category}>
      <Link to={`/product/${product.id}`} className="product-link" aria-label={`${translatedName} ${t('description')}`}>
        <img src={product.image} alt={translatedName} />
        <h3>{translatedName}</h3>
        <p>{product.price.toFixed(2)} €</p>
      </Link>
      <div className="qty-wrap">
        <label htmlFor={`qty-${product.id}`}>{t('quantityLabel')}: </label>
        <input
          id={`qty-${product.id}`}
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="qty"
        />
      </div>
      <button onClick={handleAddToCart} className={`add-to-cart ${isAdding ? 'adding' : ''}`}>
        {isAdding ? `✓ ${t('added')}!` : t('addToCart')}
      </button>
    </div>
  );
};
