import { Router } from 'express';
import { createOrder, getOrdersByUser } from '../controllers/order.controller.js';

const router = Router();

// Bestellung erstellen / Checkout
router.post('/', createOrder);
// Alle Bestellungen eines Users abrufen
router.get('/user/:userId', getOrdersByUser);

export default router;