import { CartItemComponent } from '../../components/CartItem/CartItem';
import type { CartItem } from '../../types';
import './Cart.scss';

interface CartPageProps {
  cart: CartItem[];
  onRemove: (index: number) => void;
  onChangeQty: (index: number, qty: number) => void;
}

export const CartPage = ({ cart, onRemove, onChangeQty }: CartPageProps) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-page">
      <div className="cart-inner">
        <h2>Deine Bestellung</h2>
        <div id="cart" className="cart-container">
          {cart.length === 0 ? (
            <p>Der Warenkorb ist leer.</p>
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
                <h3 id="total">Gesamt: {total.toFixed(2)} €</h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
