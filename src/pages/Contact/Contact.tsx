import './Contact.scss';

export const ContactPage = () => {
  return (
    <div className="contact-page">
      <main style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h1>Kontakt</h1>
        <div className="icons">
          <a href="#" aria-label="Instagram">
            <img src="/images/instagram.png" alt="Instagram" />
          </a>
          <a href="#" aria-label="TikTok">
            <img src="/images/tiktok.png" alt="TikTok" />
          </a>
          <a href="#" className="whatsapp" aria-label="WhatsApp">
            <img src="/images/whatsapp.png" alt="WhatsApp" />
          </a>
        </div>
      </main>
    </div>
  );
};
