import { useState } from 'react';
import type { Product } from '../../types';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
  onAddToCart: (name: string, price: number, qty: number) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product.name, product.price, quantity);
    setQuantity(1);
  };

  return (
    <div className="product" data-category={product.category}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price.toFixed(2)} €</p>
      <div className="qty-wrap">
        <label htmlFor={`qty-${product.id}`}>Anzahl: </label>
        <input
          id={`qty-${product.id}`}
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="qty"
        />
      </div>
      <button onClick={handleAddToCart} className="add-to-cart">
        In den Warenkorb
      </button>
    </div>
  );
};
