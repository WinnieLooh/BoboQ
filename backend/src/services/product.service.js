 import { prisma } from '../db/prisma.js';
  export function getAll() {
    return prisma.product.findMany({ where: { active: true } });
  }
  export function getById(id) {
    return prisma.product.findUnique({ where: { id } });
  }