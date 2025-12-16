# BoboQ Website


A modern React + Vite + TypeScript web app for BoboQ premium bubble tea supplies.
All Frontend-Code befindet sich jetzt im Verzeichnis `/frontend/src`.

## Quick Start

```bash
npm install
npm run dev
# build & preview
npm run build
npm run preview
```

## Screenshots

- Home (Hero + Categories): shows hero banner, B2B intro, and category grid.
- Shop (Filters + Grid): responsive filters and equal-height product cards.
- Product Detail: readable descriptions, highlights, gallery.
- Cart Preview: hover preview with quantities and totals.
- Dark Mode: cohesive darker header/footer and adaptive backgrounds.

## Pages

- Home: Hero, B2B intro, category grid, featured products.
- Shop: Filters, search, product grid, responsive layout.
- Product Detail: Images, descriptions, highlights, translations.
- Cart: Item list, quantities, totals, checkout link.
- Contact: Contact form and details.
- FAQ: Common questions and answers.
- Imprint: Legal information.

## Tech Stack

- React, Vite, TypeScript
- SCSS with CSS variables for theming
- Service Worker + Web App Manifest (PWA)
- React Router

## Development

- Install dependencies: `cd frontend && npm install`
- Run dev server: `cd frontend && npm run dev`
- Build: `cd frontend && npm run build`
- Preview build: `cd frontend && npm run preview`

## Notes

- Dark mode is toggled via a button in the header and persisted in `localStorage`.
- Language selection is accessible in the header; translations live in `/frontend/src/i18n/translations.ts`.
- Product name translation leverages the `LanguageContext` transliteration map.

## Email Functionality Setup

To enable the email functionality for the "Request Offer" feature, follow these steps:

### Backend Setup
1. **Install Dependencies**:
   Ensure the required dependencies are installed in the backend:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**:
   Configure the following environment variables in a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   ```
   Replace `your-email@example.com` and `your-email-password` with the credentials of the email account you want to use for sending emails.

3. **Start the Backend**:
   Run the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. **Install Dependencies**:
   Ensure the required dependencies are installed in the frontend:
   ```bash
   npm install
   ```

2. **Start the Frontend**:
   Run the development server:
   ```bash
   npm run dev
   ```

### Testing the Feature
1. Navigate to the Checkout page in the application.
2. Ensure you are logged in or provide an email address in the designated field.
3. Click the "Request Offer" button to send an email.

### Notes
- The backend must be running on `http://localhost:5000` for the frontend to communicate with it.
- Ensure that the email credentials provided have permission to send emails via the configured service (e.g., Outlook365).
- Check the browser console and backend logs for any errors during testing.

## Backend Funktionen (Stand: Dezember 2025)

Das Backend ist ein Node.js/Express-Server mit folgenden Features:

- **.env-Unterstützung:** Konfiguration über Umgebungsvariablen (z.B. Datenbank, Port)
- **REST API:**
  - Authentifizierung (Login, Registrierung, JWT)
  - Produktverwaltung (CRUD für Produkte)
  - Bestellverwaltung (CRUD für Orders)
  - Angebotsanfrage (Quote-Request)
  - E-Mail-Versand (z.B. für Angebotsanfragen)
  - Health-Check-Route (`/backend/api/health`)
- **Logging:** Request- und Error-Logging über eigenes Logger-Modul
- **CORS & Body Parsing:** Für moderne Web-APIs vorbereitet
- **Fehlerbehandlung:** Zentrale Error-Middleware
- **Datenbankanbindung:** Über Umgebungsvariable `DATABASE_URL` (z.B. PostgreSQL)

### Beispiel-Endpunkte

- `POST   /backend/api/auth/login` – Login
- `POST   /backend/api/auth/register` – Registrierung
- `GET    /backend/api/products` – Alle Produkte abrufen
- `POST   /backend/api/orders` – Neue Bestellung anlegen
- `POST   /backend/api/quote-request` – Angebotsanfrage absenden
- `GET    /backend/api/health` – Statusprüfung

### Starten des Backends

```bash
cd backend
npm install
npm start
```

### .env Beispiel

```env
DATABASE_URL=postgresql://username:password@localhost:5432/boboq
PGSSLMODE=disable
PORT=5000
EMAIL_USER=dein-email@example.com
EMAIL_PASS=dein-passwort
```

Weitere Details siehe Quellcode im Ordner `backend/`.
