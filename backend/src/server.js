// Lädt .env (ESM-konform)
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import orderRoutes from './routes/order.routes.js';
import emailRoutes from './routes/email.routes.js';
import quoteRoutes from './routes/quote.routes.js';
import productRoutes from './routes/product.routes.js';
import logger from './logger.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ==================
// Middleware
// ==================
app.use(cors({
  origin: 'http://localhost:5173', // Vite Frontend
  credentials: true
}));

// Express hat body-parser eingebaut
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// ==================
// Routes
// ==================
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/quote-request', quoteRoutes);
app.use('/api/products', productRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running 🚀' });
});

// ==================
// Error Handler (am ENDE!)

// ==================
app.use((err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.url}`);
  res.status(500).json({ message: 'Internal Server Error' });
});

// ==================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});