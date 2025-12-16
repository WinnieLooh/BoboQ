import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../database.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Create order (supports both authenticated and guest checkout)
router.post('/', async (req, res) => {
  const { items, totalPrice, guestEmail, guestFirstName, guestLastName, address, city, postalCode, country } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!items || !totalPrice) {
    return res.status(400).json({ error: 'Items and totalPrice are required' });
  }

  if (!token && !guestEmail) {
    return res.status(400).json({ error: 'Either authentication or guest email is required' });
  }

  let userId = null;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.userId;
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  try {
    const orderResult = await pool.query(
      `INSERT INTO orders (userId, totalPrice, status, guestEmail, guestFirstName, guestLastName, address, city, postalCode, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [userId, totalPrice, 'completed', guestEmail || null, guestFirstName || null, guestLastName || null, address || null, city || null, postalCode || null, country || null]
    );
    const orderId = orderResult.rows[0].id;
    for (const item of items) {
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)`,
        [orderId, item.productId, item.qty, item.price]
      );
    }
    res.json({
      message: 'Order created successfully',
      orderId,
      totalPrice,
    });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user orders (authenticated only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM orders WHERE userId = $1 ORDER BY createdAt DESC`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get order details (authenticated only)
router.get('/:orderId', authenticateToken, async (req, res) => {
  const { orderId } = req.params;
  try {
    const orderResult = await pool.query(
      `SELECT * FROM orders WHERE id = $1 AND userId = $2`,
      [orderId, req.userId]
    );
    const order = orderResult.rows[0];
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const itemsResult = await pool.query(
      `SELECT * FROM order_items WHERE order_id = $1`,
      [orderId]
    );
    res.json({ ...order, items: itemsResult.rows });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.userId = decoded.userId;
    next();
  });
}

export default router;
