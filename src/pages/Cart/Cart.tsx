import { CartItemComponent } from '../../components/CartItem/CartItem';
import { useLanguage } from '../../contexts/LanguageContext';
import type { CartItem } from '../../types';
import './Cart.scss';

interface CartPageProps {
  cart: CartItem[];
  onRemove: (index: number) => void;
  onChangeQty: (index: number, qty: number) => void;
}

export const CartPage = ({ cart, onRemove, onChangeQty }: CartPageProps) => {
  const { t } = useLanguage();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-page">
      <div className="cart-inner">
        <h2>{t('yourOrder')}</h2>
        <div id="cart" className="cart-container">
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
              <div className="cart-total">
                <h3 id="total">{t('totalAmount')}: {total.toFixed(2)} €</h3>
                <div className="cart-actions">
                  <button className="checkout-btn" onClick={() => alert(t('checkoutSoon'))}>
                    {t('checkoutBtn')}
                  </button>
                  <button className="quote-btn" onClick={() => alert(t('quoteSent'))}>
                    {t('requestQuote')}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
