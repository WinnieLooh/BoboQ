import type { CartItem } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
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
  const { t, tp } = useLanguage();
  const itemTotal = item.price * item.qty;
  const displayName = tp(item.productId, item.name);

  return (
    <div className="cart-item">
      <div className="cart-left">
        <strong>{displayName}</strong>
        <br />
        <small>{t('price')}: {item.price.toFixed(2)} €</small>
        <div className="qty-input-wrap">
          <label htmlFor={`qty-${index}`}>{t('quantity')}: </label>
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
          {t('remove')}
        </button>
        <div className="item-total">
          <div className="item-total-label">{t('itemSum')}:</div>
          <div className="item-total-value">{itemTotal.toFixed(2)} €</div>
        </div>
      </div>
    </div>
  );
};
