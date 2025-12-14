import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../../data/products';
import { useLanguage } from '../../contexts/LanguageContext';
import './ProductDetail.scss';

interface ProductDetailPageProps {
  onAddToCart: (productId: string, name: string, price: number, qty: number) => void;
}

export function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const { t, tp } = useLanguage();

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-card card">
          <div className="info">
            <h1>{t('detailNotFoundTitle')}</h1>
            <p>{t('detailNotFoundBody')}</p>
            <Link to="/shop" className="back-link">{t('backToShop')}</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => onAddToCart(product.id, product.name, product.price, quantity);
  const isBoboQProduct = product.image.toLowerCase().includes('boboq') || 
                         product.name.toLowerCase().includes('boboq');
  const isNestleProduct = product.name.toLowerCase().includes('nestlé');
  const cleanName = product.name.replace(/Nestlé /i, '');
  const translatedName = tp(product.id, cleanName);

  return (
    <div className="product-detail-page">
      <div className="product-detail-card card">
        <div className="gallery">
          <img src={product.image} alt={translatedName} />
          <span className="badge">{t('detailBadge')}</span>
        </div>
        <div className="info">
          {isNestleProduct ? (
            <div className="product-brand">Nestlé</div>
          ) : (
            isBoboQProduct && <div className="product-brand">BOBOQ</div>
          )}
          <h1>{translatedName}</h1>
          <p className="price">{product.price.toFixed(2)} €</p>
          {product.description && (
            <p className="product-description">{product.description}</p>
          )}
          <div className="qty-wrap">
            <label htmlFor="detail-qty">{t('quantityLabel')}:</label>
            <input
              id="detail-qty"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          <div className="actions">
            <button onClick={handleAddToCart}>{t('addToCart')}</button>
            <Link to="/shop" className="back-link">{t('backToShop')}</Link>
          </div>
        </div>
        <div className="bottom-section">
          <p className="lead description-full">
            {t('detailLead')}
          </p>
          <ul className="highlights">
            <li>{t('detailHighlight1')}</li>
            <li>{t('detailHighlight2')}</li>
            <li>{t('detailHighlight3')}</li>
            <li>{t('detailHighlight4')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
