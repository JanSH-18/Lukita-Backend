import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

// Una sola instancia compartida por todo el proceso.
// Prisma 7 necesita un adapter; aqui usamos el de Neon.
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })

export const prisma = new PrismaClient({ adapter })
