import { products } from '../../data/products';
import './Home.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero"></div>

      <div className="layout">
        <main className="main">
          <h2 style={{ textAlign: 'center', marginTop: 0 }}>Beliebte Boba</h2>

          <div className="slider card">
            <div className="slide-track">
              {products
                .filter((p) => p.category === 'boba')
                .slice(0, 4)
                .map((product) => (
                  <div key={product.id} className="slide">
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>Fruchtig & frisch</p>
                  </div>
                ))}
            </div>
          </div>

          <section className="products">
            {products
              .filter((p) => p.category === 'boba')
              .slice(0, 3)
              .map((product) => (
                <div key={product.id} className="product">
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                </div>
              ))}
          </section>
        </main>

        <aside className="sidebar">
          <div className="card">
            <h3>Suche</h3>
            <input
              type="text"
              placeholder="Suchen..."
              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #eee' }}
            />
          </div>
          <div className="card">
            <h3>Kategorien</h3>
            <ul style={{ paddingLeft: '18px', color: 'var(--muted)' }}>
              <li>Fruchtig</li>
              <li>Klassiker</li>
              <li>Spezial</li>
            </ul>
          </div>
          <div className="card">
            <h3>Folge uns</h3>
            <div className="icons">
              <a href="#" aria-label="Instagram">
                <img src="/images/instagram.png" alt="Instagram" />
              </a>
              <a href="#" aria-label="TikTok">
                <img src="/images/tiktok.png" alt="TikTok" />
              </a>
              <a href="#" aria-label="WhatsApp">
                <img src="/images/whatsapp.png" alt="WhatsApp" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
