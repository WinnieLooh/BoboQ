import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/Home/Home';
import { ShopPage } from './pages/Shop/Shop';
import { CartPage } from './pages/Cart/Cart';
import { ContactPage } from './pages/Contact/Contact';
import { FAQPage } from './pages/FAQ/FAQ';
import { ImprintPage } from './pages/Imprint/Imprint';
import ProductDetailPage from './pages/ProductDetail/ProductDetail';
import { useCart } from './hooks/useCart';
import './App.scss';

function App() {
  const { cart, addToCart, removeFromCart, changeQty } = useCart();

  return (
    <BrowserRouter basename="/BoboQ">
      <div className="app">
        <Header cart={cart} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/imprint" element={<ImprintPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
