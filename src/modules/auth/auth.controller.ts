import Elysia from 'elysia'
import $auth from './auth.service'
import model from './auth.model'

export default new Elysia({ prefix: '/auth' })
  .model(model)

  .post(
    '/login',
    async ({ body, request: { headers } }) => {
      const userAgent = headers.get('user-agent') ?? 'not detected'
      return await $auth.sign(body, userAgent)
    },
    {
      body: 'auth.body',
      response: {
        200: 'auth.response',
      },
    },
  )

  .post(
    '/refresh',
    ({ body, request: { headers } }) => {
      const userAgent = headers.get('user-agent') ?? 'not detected'
      return $auth.refresh(body.refreshToken, userAgent)
    },
    {
      body: 'auth.body.refresh',
      response: {
        200: 'auth.response',
      },
    },
  )

  .post(
    '/logout',
    async ({ body, set }) => {
      await $auth.delete(body.refreshToken)
      set.status = 204
    },
    {
      body: 'auth.body.refresh',
    },
  )
