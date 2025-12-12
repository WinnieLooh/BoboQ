import './FAQ.scss';

export const FAQPage = () => {
  return (
    <div className="faq-page">
      <main style={{ maxWidth: '1100px', margin: '28px auto', padding: '16px' }}>
        <h1>FAQ</h1>
        <h3>Wie lange dauert die Lieferung?</h3>
        <p>Standardlieferung dauert 2-4 Werktage.</p>

        <h3>Wie kann ich bestellen?</h3>
        <p>Wähle Produkte im Shop und füge sie dem Warenkorb hinzu.</p>

        <h3>Gibt es Allergene?</h3>
        <p>Bitte kontaktiere uns per E-Mail für Details zu Allergenen.</p>
      </main>
    </div>
  );
};
