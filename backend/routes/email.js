import express from 'express';
import nodemailer from 'nodemailer';
const router = express.Router();

// Configure the email transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_USER, // Email user from environment variables
    pass: process.env.EMAIL_PASS  // Email password from environment variables
  },
  debug: true, // Enable debug mode
  logger: true // Log SMTP communication
});

// Route to send an email
router.post('/send-offer', async (req, res) => {
  const { subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email from environment variables
    to: process.env.RECIPIENT_EMAIL, // Recipient email from environment variables
    subject: subject || 'Angebot angefordert',
    text: message || 'Ein Benutzer hat ein Angebot angefordert.'
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'E-Mail wurde gesendet.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Fehler beim Senden der E-Mail.' });
  }
});

export default router;