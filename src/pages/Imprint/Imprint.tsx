import './Imprint.scss';

export const ImprintPage = () => {
  return (
    <div className="imprint-page">
      <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>BoboQ</strong>
          <br />
          [FIRMENNAME / INHABERNAME]
          <br />
          [STRASSE UND HAUSNUMMER]
          <br />
          [POSTLEITZAHL] [ORT]
          <br />
          Deutschland
        </p>

        <h2>Kontaktinformationen</h2>
        <p>
          <strong>Telefon:</strong> [TELEFONNUMMER]
          <br />
          <strong>E-Mail:</strong> <a href="mailto:[EMAIL-ADRESSE]">[EMAIL-ADRESSE]</a>
        </p>

        <h2>Vertreter und Geschäftsführung</h2>
        <p>
          <strong>Vertreter:</strong> [NAME DES INHABERS / GESCHÄFTSFÜHRERS]
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          <strong>Umsatzsteuer-Identifikationsnummer (USt-ID):</strong> [UST-ID-NUMMER]
        </p>

        <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
        <p>
          [BERUFSBEZEICHNUNG, falls zutreffend]
          <br />
          [ZUSTÄNDIGE KAMMER / BERUFSVERBAND]
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          [NAME DES VERANTWORTLICHEN]
          <br />
          [ADRESSE DES VERANTWORTLICHEN]
        </p>

        <h2>Disclaimer – Haftung für Inhalte</h2>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
          Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1
          TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Unsere Website enthält Links zu externen Webseiten Dritter. Wir sind für die Inhalte dieser fremden Websites
          nicht verantwortlich, da wir keine Kontrolle über deren Inhalte haben.
        </p>

        <h2>Datenschutz</h2>
        <p>
          Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit
          personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies,
          soweit möglich, stets auf freiwilliger Basis.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
          Urheberrecht.
        </p>

        <h2>Streitbeilegung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie hier
          erreichen:{' '}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
      </div>
    </div>
  );
};
