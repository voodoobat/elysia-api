import { t } from 'elysia'

const bodySchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6 }),
  username: t.Optional(t.String({ minLength: 3 })),
})

const responseSchema = t.Object({
  id: t.String(),
  email: t.String({ format: 'email' }),
  username: t.Nullable(t.String({ minLength: 3 })),
  createdAt: t.Date(),
  updatedAt: t.Date(),
})

const paramsSchema = t.Object({
  id: t.String({ format: 'uuid' }),
})

export default {
  'user.body': bodySchema,
  'user.response': responseSchema,
  'user.body.partial': t.Partial(bodySchema),
  'user.params': paramsSchema,
}
