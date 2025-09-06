import db from '@/db'
import { Prisma } from '@/db/generated'
import jwt from '@/util/jwt'
import $user from '@/modules/user/user.service'

export default {
  async sign({ password, email }: Prisma.UserCreateInput, userAgent: string) {
    const user = await $user.findOne({
      email,
    })

    if (!(await Bun.password.verify(password, user.password))) {
      throw new Error('Invalid credentials')
    }

    const tokens = jwt.generate(user.id, userAgent)
    await this.save(tokens.refreshToken, user.id)

    return tokens
  },

  async refresh(refreshToken: string, userAgent: string) {
    const payload = jwt.verify(refreshToken)
    const tokens = jwt.generate(payload.id, userAgent)

    await this.delete(refreshToken) // delete old token
    await this.save(tokens.refreshToken, payload.id) // create entity with a new token

    return tokens
  },

  async save(refreshToken: string, userId: string) {
    await db.auth.create({
      data: {
        token: refreshToken,
        user: {
          connect: { id: userId },
        },
      },
    })
  },

  async delete(refreshToken: string) {
    await db.auth.delete({
      where: {
        token: refreshToken,
      },
    })
  },
}
