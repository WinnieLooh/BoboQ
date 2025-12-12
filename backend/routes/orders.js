const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Create order (supports both authenticated and guest checkout)
router.post('/', (req, res) => {
  const { items, totalPrice, guestEmail, guestFirstName, guestLastName, address, city, postalCode, country } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!items || !totalPrice) {
    return res.status(400).json({ error: 'Items and totalPrice are required' });
  }

  // Check if this is guest checkout or authenticated
  if (!token && !guestEmail) {
    return res.status(400).json({ error: 'Either authentication or guest email is required' });
  }

  let userId = null;

  // If authenticated, extract userId from token
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.userId;
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  db.run(
    `INSERT INTO orders (userId, totalPrice, status, guestEmail, guestFirstName, guestLastName, address, city, postalCode, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId, totalPrice, 'completed', guestEmail || null, guestFirstName || null, guestLastName || null, address || null, city || null, postalCode || null, country || null],
    function (err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to create order' });
      }

      const orderId = this.lastID;

      // Insert order items
      items.forEach((item) => {
        db.run(
          `INSERT INTO order_items (orderId, productName, productPrice, quantity) VALUES (?, ?, ?, ?)`,
          [orderId, item.name, item.price, item.qty]
        );
      });

      res.json({
        message: 'Order created successfully',
        orderId,
        totalPrice,
      });
    }
  );
});

// Get user orders (authenticated only)
router.get('/', authenticateToken, (req, res) => {
  db.all(
    `SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC`,
    [req.userId],
    (err, orders) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      res.json(orders);
    }
  );
});

// Get order details (authenticated only)
router.get('/:orderId', authenticateToken, (req, res) => {
  const { orderId } = req.params;

  db.get(
    `SELECT * FROM orders WHERE id = ? AND userId = ?`,
    [orderId, req.userId],
    (err, order) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      db.all(
        `SELECT * FROM order_items WHERE orderId = ?`,
        [orderId],
        (err, items) => {
          if (err) {
            return res.status(500).json({ error: 'Server error' });
          }

          res.json({ ...order, items });
        }
      );
    }
  );
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

module.exports = router;
