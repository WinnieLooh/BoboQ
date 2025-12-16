import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  const products = await prisma.product.findMany();
  console.log(products);
  await prisma.$disconnect(); // Verbindung sauber schließen
}

test();