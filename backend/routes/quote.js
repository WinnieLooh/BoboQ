import express from 'express';
import nodemailer from 'nodemailer';
import pool from '../database.js';
const router = express.Router();

// Email transporter config (reuse from email.js if possible)
const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Ensure quote_requests table exists (PostgreSQL)
async function ensureQuoteTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS quote_requests (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      cart TEXT NOT NULL,
      total REAL NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
ensureQuoteTable();

// POST /api/quote-request
router.post('/', async (req, res) => {
  const { email, cart, total } = req.body;
  if (!email || !cart || !total) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Save to DB
  try {
    await pool.query(
      'INSERT INTO quote_requests (email, cart, total) VALUES ($1, $2, $3)',
      [email, JSON.stringify(cart), total]
    );
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save quote request' });
  }

  // Send email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Neue Angebotsanfrage',
    text: `Neue Angebotsanfrage von: ${email}\n\nWarenkorb: ${JSON.stringify(cart, null, 2)}\n\nGesamtsumme: ${total} €`
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Quote request sent and saved.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email, but request was saved.' });
  }
});

export default router;
