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
    const isBoboQProduct = product.image.toLowerCase().includes('boboq') || 
                           product.name.toLowerCase().includes('boboq');

  console.log('ProductCard Debug:', {
    productId: product.id,
    productName: product.name,
    translatedName: translatedName,
      category: product.category,
      isBoboQ: isBoboQProduct
  });

  return (
    <div className="product" data-category={product.category}>
      <Link to={`/product/${product.id}`} className="product-link" aria-label={`${translatedName} ${t('description')}`}>
        <img src={product.image} alt={translatedName} />
          {isBoboQProduct && (
            <div style={{ 
              padding: '4px 16px 0', 
              marginTop: '8px', 
              marginBottom: '2px', 
              fontSize: '12px', 
              fontWeight: '700', 
              letterSpacing: '1px', 
              color: '#8DA5FF', 
              textTransform: 'uppercase' 
            }}>
              BOBOQ
            </div>
          )}
        <h3 style={{ color: '#333', fontSize: '16px', fontWeight: '600', padding: '0 16px', marginTop: '8px', marginBottom: '4px' }}>
          {translatedName}
        </h3>
      </Link>
      <p style={{ color: '#8DA5FF', fontSize: '16px', fontWeight: '600', padding: '0 16px', marginBottom: '8px', marginTop: 0 }}>
        {product.price.toFixed(2)} €
      </p>
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
