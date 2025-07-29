import jwt from 'jsonwebtoken'

const { JWT_SECRET } = Bun.env

export default {
  generate(userId: string, userAgent: string) {
    const accessToken = jwt.sign({ id: userId }, JWT_SECRET as string, {
      expiresIn: '15m',
    })

    const refreshToken = jwt.sign(
      { id: userId, userAgent },
      JWT_SECRET as string,
      { expiresIn: '7d' },
    )

    return {
      accessToken,
      refreshToken,
    }
  },

  verify(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET as string) as {
        id: string
        userAgent?: string
      }
    } catch {
      throw new Error('Invalid token')
    }
  },
}
