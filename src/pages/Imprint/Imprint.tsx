import './Imprint.scss';

export const ImprintPage = () => {
  return (
    <div className="imprint-page">
      <div className="imprint-wrapper">
        <h1>Impressum</h1>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>Unternehmensname:</strong> BoboQ Int. GmbH
          <br />
          <strong>Adresse:</strong> Marktstr. 10-E38, 50968 Köln, Deutschland
          <br />
          <strong>Vertretungsberechtigt:</strong> Christian Zhang
        </p>

        <h2>Kontakt</h2>
        <p>
          <strong>Telefon:</strong> +49 1523 476 89 35
          <br />
          <strong>E-Mail:</strong> <a href="mailto:info@boboq-int.com">info@boboq-int.com</a>
        </p>


        <h2>Umsatzsteuer-ID</h2>
        <p>
          <strong>USt-IdNr.:</strong> DE123456789
        </p>

        <h2>Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)</h2>
        <p>
          Christian Zhang, Marktstr. 10-E38, 50968 Köln, Deutschland
        </p>
      </div>
    </div>
  );
};
