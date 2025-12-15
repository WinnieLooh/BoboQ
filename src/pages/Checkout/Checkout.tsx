import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import './Checkout.scss';

interface CheckoutProps {
  cart: { productId: string; name: string; price: number; qty: number }[];
  onCheckoutComplete: () => void;
}

const SHIPPING_COST = 5.99;

export const CheckoutPage = ({ cart, onCheckoutComplete }: CheckoutProps) => {
  const { user, token } = useAuth();
  const { t, tp } = useLanguage();
  const [guestEmail] = useState('');
  const [guestFirstName, setGuestFirstName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalPrice = subtotal + SHIPPING_COST;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!address || !city || !postalCode || !country) {
      setError(t('fillAllFields'));
      return;
    }

    if (!isGuestCheckout && !token) {
      setError(t('authOrGuest'));
      return;
    }

    if (isGuestCheckout && (!guestEmail || !guestFirstName || !guestLastName)) {
      setError(t('requiredFields'));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          items: cart,
          subtotal,
          shippingCost: SHIPPING_COST,
          totalPrice,
          ...(isGuestCheckout && {
            guestEmail,
            guestFirstName,
            guestLastName,
            address,
            city,
            postalCode,
            country,
          }),
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout fehlgeschlagen');
      }

      setSuccessMessage('Bestellung erfolgreich aufgegeben!');
      onCheckoutComplete();
      setTimeout(() => navigate('/'), 2000);
    } catch {
      setError(t('orderError'));
    } finally {
      setLoading(false);
    }
  };

  if (!user && !isGuestCheckout) {
    return (
      <div className="checkout-page">
        <main>
          <h1>{t('checkout')}</h1>
          <div className="auth-options">
            <div className="option">
              <h2>{t('registeredCustomer')}</h2>
              <p>{t('registerToOrder')}</p>
              <button onClick={() => navigate('/login')} className="option-btn login-btn">
                {t('selectCheckout')}
              </button>
            </div>
            <div className="divider"></div>
            <div className="option">
              <h2>{t('guestCheckout')}</h2>
              <p>{t('guestCheckoutDesc')}</p>
              <button onClick={() => setIsGuestCheckout(true)} className="option-btn guest-btn">
                {t('orderAsGuest')}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <main>
        <h1>Kasse</h1>

        <div className="checkout-container">
          <div className="checkout-form">
            <h2>{t('shippingAddress')}</h2>

            {isGuestCheckout && (
              <button 
                onClick={() => setIsGuestCheckout(false)}
                className="back-link"
                type="button"
              >
                {t('back')}
              </button>
            )}

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
              {isGuestCheckout ? (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="guestFirstName">{t('firstName')}</label>
                      <input
                        id="guestFirstName"
                        type="text"
                        value={guestFirstName}
                        onChange={(e) => setGuestFirstName(e.target.value)}
                        placeholder="Max"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="guestLastName">{t('lastName')}</label>
                      <input
                        id="guestLastName"
                        type="text"
                        value={guestLastName}
                        onChange={(e) => setGuestLastName(e.target.value)}
                        placeholder="Mustermann"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="form-group">
                  <label htmlFor="name">{t('firstName')} {t('lastName')}</label>
                  <input
                    id="name"
                    type="text"
                    value={user ? `${user.firstName} ${user.lastName}` : ''}
                    disabled
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="address">{t('street')}</label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Beispiel: Hauptstr. 123"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="postalCode">{t('postalCode')}</label>
                  <input
                    id="postalCode"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="10115"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">{t('city')}</label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Berlin"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">{t('country')}</label>
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Deutschland"
                />
              </div>

              <button type="submit" className="checkout-btn" disabled={loading}>
                {loading ? t('processing') : 'Request Quote'}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2>{t('orderSummary')}</h2>

            <div className="items">
              {cart.map((item, index) => {
                const displayName = tp(item.productId, item.name);
                return (
                <div key={index} className="item">
                  <div className="item-info">
                    <span className="item-name">{displayName}</span>
                    <span className="item-qty">x {item.qty}</span>
                  </div>
                  <span className="item-price">{(item.price * item.qty).toFixed(2)} €</span>
                </div>
              );})}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row subtotal">
              <span>{t('subtotalLabel')}:</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>

            <div className="summary-row shipping">
              <span>{t('shippingCosts')}:</span>
              <span>{SHIPPING_COST.toFixed(2)} €</span>
            </div>

            <div className="summary-row total">
              <span>Estimated Total Amount:</span>
              <span className="total-price">{totalPrice.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
