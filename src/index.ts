import { Elysia } from 'elysia'
import user from '@/modules/user/user.controller'

const app = new Elysia()
  .get('/', () => 'Hello Elysia')
  .use(user)
  .listen(3000)

console.info(`🚀 App is running at ${app.server?.hostname}:${app.server?.port}`)

export type App = typeof app
