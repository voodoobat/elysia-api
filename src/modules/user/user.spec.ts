import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { faker as f } from '@faker-js/faker'
import { App } from '@/index'

const api = treaty<App>(`localhost:${Bun.env.SERVER_PORT ?? 3000}`)

const email = f.internet.email()
const password = f.internet.password()

let userId = ''

describe('user module', async () => {
  it('should create a user', async () => {
    const { data: user, status } = await api.user.post({
      email,
      password,
    })

    userId = user?.id ?? ''

    expect(status).toBe(201)
    expect(user?.id).toBeString()
    expect(user?.id?.length).toBe(36) // uuid len
    expect(user?.email).toEqual(email)
    expect(user?.createdAt).toBeString()
    expect(user?.updatedAt).toBeString()
  })

  it('should get all users', async () => {
    const { data: users, status } = await api.user.get()

    expect(status).toBe(200)
    expect(users).toBeArray()
    expect(users?.length).toBeGreaterThan(0)

    users?.map((user) => {
      expect(user.id).toBeString()
      expect(user.id.length).toBe(36) // uuid len
      expect(user.email).toBeString()
      expect(user.createdAt).toBeString()
      expect(user.updatedAt).toBeString()
    })
  })

  it('should get a user', async () => {
    const { data: user, status } = await api.user({ id: userId }).get()

    expect(status).toBe(200)
    expect(user?.id).toBeString()
    expect(user?.id.length).toBe(36) // uuid len
    expect(user?.createdAt).toBeString()
    expect(user?.updatedAt).toBeString()
    expect(user?.email).toEqual(email)
  })

  it('should update a user', async () => {
    const username = f.internet.username()
    const email = f.internet.email()

    const { data: user, status } = await api.user({ id: userId }).patch({
      username,
      email,
    })

    expect(status).toBe(200)
    expect(user?.id).toBeString()
    expect(user?.id.length).toBe(36) // uuid len
    expect(user?.createdAt).toBeString()
    expect(user?.updatedAt).toBeString()
    expect(user?.email).toEqual(email)
    expect(user?.username).toEqual(username)
  })

  it('should delete a user', async () => {
    const user = await api.user({ id: userId }).delete()

    expect(user.data?.id).toEqual(userId)
  })
})
