import Elysia from 'elysia'
import { ForbiddenError } from '@/lib/errors/http'
import authGuard from '@/modules/auth/auth.guard'
import $user from './user.service'
import model from './user.model'

export default new Elysia({ prefix: '/user' })
  .model(model)
  .use(authGuard)

  .post(
    '/',
    async ({ body }) => {
      return await $user.create(body)
    },
    {
      body: 'user.body',
      response: {
        200: 'user.response',
      },
    },
  )

  .get(
    '/',
    async () => {
      return await $user.find()
    },
    {
      response: {
        200: 'user.response[]',
      },
    },
  )

  .get(
    '/:id',
    async ({ params: { id } }) => {
      return await $user.findOne({ id })
    },
    {
      params: 'user.params',
      response: {
        200: 'user.response',
      },
    },
  )

  .patch(
    '/:id',
    async ({ body, params: { id }, user }) => {
      if (!user.is(id)) {
        throw new ForbiddenError('Forbidden')
      }

      return await $user.update({ id }, body)
    },
    {
      body: 'user.body.partial',
      params: 'user.params',
      response: {
        200: 'user.response',
      },
    },
  )

  .delete(
    '/:id',
    async ({ params: { id }, user }) => {
      if (!user.is(id)) {
        throw new ForbiddenError('Forbidden')
      }

      return await $user.delete({ id })
    },
    {
      params: 'user.params',
      response: {
        200: 'user.response',
      },
    },
  )
