
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from '../routes/auth.js';
import orderRoutes from '../routes/orders.js';
import emailRoutes from '../routes/email.js';
import quoteRoutes from '../routes/quote.js';
import productRoutes from '../routes/products.js';
import logger from '../logger.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Log errors
app.use((err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.url}`);
  res.status(500).send('Internal Server Error');
});

// Routes
app.use('/backend/api/auth', authRoutes);
app.use('/backend/api/orders', orderRoutes);
app.use('/backend/api/email', emailRoutes);
app.use('/backend/api/quote-request', quoteRoutes);
app.use('/backend/api/products', productRoutes);

// Health check
app.get('/backend/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
