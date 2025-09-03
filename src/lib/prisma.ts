import { PrismaClient } from '@prisma/client'

// PrismaClient yaratishda xato bo'lmasligi uchun 
// try-catch ishlatamiz
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // Development rejimida global obyekt mavjud bo'lsa ishlatamiz
  // Bu Hot Reloading paytida yangi instance yaratilishini oldini oladi
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    })
  }
  prisma = (global as any).prisma
}

export { prisma }