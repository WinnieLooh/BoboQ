# BoboQ Backend Setup Guide

## Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Environment Setup

Create a `.env` file in the backend folder (already provided):
```
JWT_SECRET=your-super-secret-key-change-this-in-production
PORT=5000
```

## Database

The application uses SQLite3, which automatically creates a database file (`boboq.db`) on first run.

### Database Schema

The database includes three main tables:

**users** - User accounts
- id (INTEGER PRIMARY KEY)
- email (TEXT UNIQUE)
- password (TEXT - hashed with bcryptjs)
- firstName (TEXT)
- lastName (TEXT)
- address (TEXT)
- city (TEXT)
- postalCode (TEXT)
- country (TEXT)
- createdAt (DATETIME)

**orders** - Customer orders
- id (INTEGER PRIMARY KEY)
- userId (INTEGER FOREIGN KEY)
- totalPrice (REAL)
- status (TEXT - 'pending' or 'completed')
- createdAt (DATETIME)

**order_items** - Items in each order
- id (INTEGER PRIMARY KEY)
- orderId (INTEGER FOREIGN KEY)
- productName (TEXT)
- productPrice (REAL)
- quantity (INTEGER)

## Running the Backend

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication

**POST /api/auth/register**
Register a new user.
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**POST /api/auth/login**
Login user and get JWT token.
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**GET /api/auth/profile**
Get user profile (requires JWT token in Authorization header).

**PUT /api/auth/profile**
Update user profile (requires JWT token).

### Orders

**POST /api/orders**
Create a new order (requires JWT token).
```json
{
  "items": [
    { "name": "Product 1", "price": 10.99, "qty": 2 }
  ],
  "totalPrice": 21.98
}
```

**GET /api/orders**
Get all user orders (requires JWT token).

**GET /api/orders/:orderId**
Get specific order details (requires JWT token).

## Security Notes

- **JWT_SECRET**: Change this in production to a strong, random string
- **CORS**: Currently configured for `http://localhost:5173` (frontend dev server)
- **Password Hashing**: Uses bcryptjs with 10 salt rounds
- **Tokens**: JWT tokens expire in 7 days

## Frontend Integration

The frontend (React app at `http://localhost:5173`) connects to this backend at:
- `http://localhost:5000/api`

Make sure both servers are running:
1. Backend: `npm run dev` (in backend folder)
2. Frontend: `npm run dev` (in root folder)

## Troubleshooting

**CORS Error**: Make sure the backend is running and the frontend URL matches the CORS configuration.

**Database Locked**: SQLite is single-user. Ensure only one instance of the backend is running.

**Port Already in Use**: Change the PORT in `.env` file if port 5000 is already in use.
