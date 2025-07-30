import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { faker as f } from '@faker-js/faker'
import { App } from '@/index'

import './auth.controller' // for watch

const api = treaty<App>(`localhost:${Bun.env.SERVER_PORT ?? 3000}`)
const email = `test_${f.internet.email()}`
const password = f.internet.password()

let userId = ''
let refreshToken = ''

beforeAll(async () => {
  const { data: user } = await api.user.post({ email, password })
  userId = user?.id ?? ''
})

afterAll(async () => {
  await api.user({ id: userId }).delete()
})

describe('auth module', async () => {
  it('should sign in a user', async () => {
    const { data: tokens, status } = await api.auth.login.post({
      email,
      password,
    })

    refreshToken = tokens?.refreshToken ?? ''

    expect(status).toBe(200)
    expect(tokens?.accessToken).toBeString()
    expect(tokens?.refreshToken).toBeString()
  })

  it('should refresh a token', async () => {
    const { data: tokens, status } = await api.auth.refresh.post({
      refreshToken,
    })

    expect(status).toBe(200)
    expect(tokens?.accessToken).toBeString()
    expect(tokens?.refreshToken).toBeString()
  })

  it('should sign out a user', async () => {
    const { status } = await api.auth.logout.post({
      refreshToken,
    })

    expect(status).toBe(204)
  })
})
