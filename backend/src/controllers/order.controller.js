import * as orderService from '../services/order.service.js';

export async function createOrder(req, res, next) {
  try {
    const { userId, items, paymentMethod } = req.body;
    const order = await orderService.createOrder(userId, items, paymentMethod);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

export async function getOrdersByUser(req, res, next) {
  try {
    const orders = await orderService.getOrdersByUser(req.params.userId);
    res.json(orders);
  } catch (err) {
    next(err);
  }
}