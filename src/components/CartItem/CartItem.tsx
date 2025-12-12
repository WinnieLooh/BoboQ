import type { CartItem } from '../../types';
import './CartItem.scss';

interface CartItemComponentProps {
  item: CartItem;
  index: number;
  onRemove: (index: number) => void;
  onChangeQty: (index: number, qty: number) => void;
}

export const CartItemComponent = ({
  item,
  index,
  onRemove,
  onChangeQty,
}: CartItemComponentProps) => {
  const itemTotal = item.price * item.qty;

  return (
    <div className="cart-item">
      <div className="cart-left">
        <strong>{item.name}</strong>
        <br />
        <small>Einzelpreis: {item.price.toFixed(2)} €</small>
        <div className="qty-input-wrap">
          <label htmlFor={`qty-${index}`}>Anzahl: </label>
          <input
            id={`qty-${index}`}
            type="number"
            min="0"
            value={item.qty}
            onChange={(e) => onChangeQty(index, parseInt(e.target.value) || 0)}
            className="qty-input"
          />
        </div>
      </div>
      <div className="cart-right">
        <button onClick={() => onRemove(index)} className="remove-btn">
          Entfernen
        </button>
        <div className="item-total">
          <div className="item-total-label">Artikel-Summe:</div>
          <div className="item-total-value">{itemTotal.toFixed(2)} €</div>
        </div>
      </div>
    </div>
  );
};
