import Elysia from 'elysia'
import swagger from '@elysiajs/swagger'
import auth from '@/modules/auth/auth.controller'
import user from '@/modules/user/user.controller'

const app = new Elysia()
  .use(swagger())
  .get('/', ({ redirect }) => redirect('/swagger'))
  .use(auth)
  .use(user)
  .listen(3000)

console.info(`🚀 App is running at ${app.server?.hostname}:${app.server?.port}`)

export type App = typeof app
