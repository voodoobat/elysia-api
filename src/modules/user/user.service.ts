import { NotFoundError } from 'elysia'
import db from '@/db'
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

  async findOne(where: Prisma.UserWhereUniqueInput) {
    const user = await db.user.findUnique({
      where,
    })

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  },

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    return await db.user.update({
      where,
      data,
    })
  },

  async delete(where: Prisma.UserWhereUniqueInput) {
    return await db.user.delete({
      where,
    })
  },
}
