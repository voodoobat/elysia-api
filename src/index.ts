import Elysia from 'elysia'
import swagger from '@elysiajs/swagger'
import error from './plugins/error'
import logger from './plugins/logger'
import auth from './modules/auth/auth.controller'
import user from './modules/user/user.controller'

export const app = new Elysia()
  .use(error)
  .use(logger)
  .use(swagger())
  .get('/', ({ redirect }) => redirect('/swagger'))
  .use(auth)
  .use(user)
  .listen(3000)

export type App = typeof app
