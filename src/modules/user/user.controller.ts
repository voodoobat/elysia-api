import Elysia from 'elysia'
import authGuard from '@/modules/auth/auth.guard'
import service from './user.service'
import model from './user.model'

export default new Elysia({ prefix: '/user' })
  .model(model)
  .use(authGuard)

  .post(
    '/',
    async ({ body }) => {
      return await service.create(body)
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
      return await service.find()
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
      return await service.findOne({ id })
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
        throw new Error('Unauthorized')
      }

      return await service.update({ id }, body)
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
        throw new Error('Unauthorized')
      }

      return await service.delete({ id })
    },
    {
      params: 'user.params',
      response: {
        200: 'user.response',
      },
    },
  )
