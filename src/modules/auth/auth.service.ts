import db from '@/db'
import { Prisma } from '@/db/generated'
import jwt from '@/util/jwt'
import userService from '@/modules/user/user.service'

export default {
  async sign({ password, email }: Prisma.UserCreateInput) {
    const user = await userService.findOne({
      email,
    })

    if (!(await Bun.password.verify(password, user.password))) {
      throw new Error('Invalid credentials')
    }

    const tokens = jwt.generate(user.id, 'web')
    await this.save(tokens.refreshToken, user.id)

    return tokens
  },

  async refresh(refreshToken: string, userAgent: string) {
    const payload = jwt.verify(refreshToken)
    const tokens = jwt.generate(payload.id, userAgent)

    await this.save(tokens.refreshToken, payload.id)
    return tokens
  },

  async delete(refreshToken: string) {
    await db.auth.delete({
      where: {
        token: refreshToken,
      },
    })
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
}
