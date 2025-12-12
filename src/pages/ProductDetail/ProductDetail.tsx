import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../../data/products';
import './ProductDetail.scss';

interface ProductDetailPageProps {
  onAddToCart: (productId: string, name: string, price: number, qty: number) => void;
}

export function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-card card">
          <div className="info">
            <h1>Produkt nicht gefunden</h1>
            <p>Das angeforderte Produkt ist nicht verfügbar. Schau dich im Shop nach weiteren Favoriten um.</p>
            <Link to="/shop" className="back-link">Zurück zum Shop</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => onAddToCart(product.id, product.name, product.price, quantity);

  return (
    <div className="product-detail-page">
      <div className="product-detail-card card">
        <div className="gallery">
          <img src={product.image} alt={product.name} />
          <span className="badge">Mehr erfahren</span>
        </div>
        <div className="info">
          <h1>{product.name}</h1>
          <p className="price">{product.price.toFixed(2)} €</p>
          <div className="qty-wrap">
            <label htmlFor="detail-qty">Anzahl:</label>
            <input
              id="detail-qty"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          <div className="actions">
            <button onClick={handleAddToCart}>In den Warenkorb</button>
            <Link to="/shop" className="back-link">Zurück zum Shop</Link>
          </div>
        </div>
        <div className="bottom-section">
          <p className="lead description-full">
            Hier findest du ein paar zusätzliche Hinweise zu diesem Produkt. Wir achten auf hochwertige Zutaten,
            ausgewogene Süße und einen intensiven Geschmack, der perfekt zu Milch- und Fruchttees passt.
          </p>
          <ul className="highlights">
            <li>Handverlesene Zutaten und frische Verarbeitung</li>
            <li>Ideal zum Kombinieren mit unseren Tees und Sirups</li>
            <li>Schnell zubereitet – perfekt für einen spontanen Bubble-Tea-Moment</li>
            <li>Mehr Ideen gefällig? Sieh dich im Shop um und stell dir deine Lieblingskombination zusammen.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
