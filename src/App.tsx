import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import HomePage from './pages/Home/Home';
import ShopPage from './pages/Shop/Shop';
import { CartPage } from './pages/Cart/Cart';
import { ContactPage } from './pages/Contact/Contact';
import { FAQPage } from './pages/FAQ/FAQ';
import { ImprintPage } from './pages/Imprint/Imprint';
import { LoginPage } from './pages/Auth/Login';
import { RegisterPage } from './pages/Auth/Register';
import { CheckoutPage } from './pages/Checkout/Checkout';
import ProductDetailPage from './pages/ProductDetail/ProductDetail';
import { useCart } from './hooks/useCart';
import { AuthProvider } from './contexts/AuthContext';
import './App.scss';

function App() {
  const { cart, addToCart, removeFromCart, changeQty, clearCart } = useCart();

  const handleCheckoutComplete = () => {
    clearCart();
  };

  return (
    <AuthProvider>
      <BrowserRouter basename="/BoboQ">
        <div className="app">
          <Header cart={cart} onRemoveFromCart={removeFromCart} onChangeQty={changeQty} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
              <Route path="/shop" element={<ShopPage onAddToCart={addToCart} />} />
              <Route
                path="/product/:id"
                element={<ProductDetailPage onAddToCart={addToCart} />}
              />
              <Route
                path="/cart"
                element={
                  <CartPage
                    cart={cart}
                    onRemove={removeFromCart}
                    onChangeQty={changeQty}
                  />
                }
              />
              <Route
                path="/checkout"
                element={
                  <CheckoutPage
                    cart={cart}
                    onCheckoutComplete={handleCheckoutComplete}
                  />
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/imprint" element={<ImprintPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
