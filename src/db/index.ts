import { PrismaClient } from './generated'

const prismaClientSingleton = () => new PrismaClient()

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const db = globalThis.prismaGlobal ?? prismaClientSingleton()

if (Bun.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = db
}

export default db
