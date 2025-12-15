import { CartItemComponent } from '../../components/CartItem/CartItem';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../../types';
import './Cart.scss';

const SHIPPING_COST = 5.99;

interface CartPageProps {
  cart: CartItem[];
  onRemove: (index: number) => void;
  onChangeQty: (index: number, qty: number) => void;
}

export const CartPage = ({ cart, onRemove, onChangeQty }: CartPageProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + SHIPPING_COST;


  const handleRequestQuote = () => {
    navigate('/checkout', { replace: true, state: { guest: true, fromQuote: true, forceGuest: true } });
  };

  return (
    <div className="cart-page">
      <div className="cart-inner">
        <h2>{t('yourOrder')}</h2>
        <div id="cart" className="cart-container split-layout">
          <div className="cart-items-left">
            {cart.length === 0 ? (
              <p>{t('emptyCartMessage')}</p>
            ) : (
              <>
                {cart.map((item, index) => (
                  <CartItemComponent
                    key={index}
                    item={item}
                    index={index}
                    onRemove={onRemove}
                    onChangeQty={onChangeQty}
                  />
                ))}
              </>
            )}
          </div>
          <div className="cart-total-right">
            <div className="cart-total">
              <div className="price-breakdown">
                <div className="price-row subtotal">
                  <span>{t('subtotal')}:</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="price-row shipping">
                  <span>{t('shippingCosts')}:</span>
                  <span>{SHIPPING_COST.toFixed(2)} €</span>
                </div>
              </div>
              <h3 id="total" className="total-amount">
                <span>Estimated Total Amount:</span>
                <span className="total-amount-value">{total.toFixed(2)} </span>
              </h3>
              <div className="cart-actions">
                <button className="quote-btn" onClick={handleRequestQuote}>
                  {t('requestQuote')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
