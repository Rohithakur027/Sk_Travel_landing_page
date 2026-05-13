import { PrismaClient } from '@prisma/client';

// Reuse a single PrismaClient across HMR reloads in dev to avoid exhausting
// Postgres connections. In prod (or first dev import) we create one.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
