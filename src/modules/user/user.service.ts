import { db } from '@/db'
import { Prisma } from '@/db/generated'

export default {
  async create(data: Prisma.UserCreateInput) {
    return await db.user.create({
      data: {
        ...data,
        password: await Bun.password.hash(data.password),
      },
    })
  },

  async findMany() {
    return await db.user.findMany()
  },

  async findOne(id: string) {
    return await db.user.findUnique({ where: { id } })
  },

  async update(id: string, data: Prisma.UserUpdateInput) {
    return await db.user.update({
      where: { id },
      data,
    })
  },

  async delete(id: string) {
    return await db.user.delete({ where: { id } })
  },
}
