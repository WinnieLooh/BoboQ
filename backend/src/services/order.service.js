import { prisma } from '../db/prisma.js';

export async function createOrder(userId, items, paymentMethod) {
  // Berechne Gesamtpreis
  let total = 0;
  items.forEach(item => total += item.price * item.quantity);

  // Order erstellen
  const order = await prisma.order.create({
    data: {
      userId,
      status: 'pending',
      total,
      paymentMethod,
      items: {
        create: items.map(i => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
          options: i.options,
          specialInstructions: i.specialInstructions || null
        }))
      }
    },
    include: { items: true }
  });

  return order;
}

export async function getOrdersByUser(userId) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });
}