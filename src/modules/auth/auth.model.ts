import { t } from 'elysia'

const bodySchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6 }),
})

const bodyRefreshSchema = t.Object({
  refreshToken: t.String(),
})

const responseSchema = t.Object({
  accessToken: t.String(),
  refreshToken: t.String(),
})

export default {
  'auth.body': bodySchema,
  'auth.body.refresh': bodyRefreshSchema,
  'auth.response': responseSchema,
}
