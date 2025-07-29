import Elysia from 'elysia'
import service from './user.service'
import model from './user.model'

export default new Elysia({ prefix: '/user' })
  .model(model)

  .post(
    '/',
    async ({ body, set }) => {
      set.status = 201
      return await service.create(body)
    },
    {
      body: 'user.body',
      response: {
        201: 'user.response',
        200: 'user.response', // for treaty (@elysiajs/eden)
      },
    },
  )

  .get(
    '/',
    async () => {
      return await service.findMany()
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
      const user = await service.findOne({ id })

      return user
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
    async ({ body, params: { id } }) => {
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
    async ({ params: { id } }) => {
      return await service.delete({ id })
    },
    {
      params: 'user.params',
      response: {
        200: 'user.response',
      },
    },
  )
