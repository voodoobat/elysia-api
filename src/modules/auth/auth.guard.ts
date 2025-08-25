import type Elysia from 'elysia'
import jwt from '@/util/jwt'

export default (elysia: Elysia) =>
  elysia.derive(({ request: { headers } }) => {
    const token = headers.get('authorization')?.slice(7)
    const user = token ? jwt.verify(token) : null

    return {
      user: {
        id: user?.id,
        is: (id: string) => id === user?.id,
      },
    }
  })
