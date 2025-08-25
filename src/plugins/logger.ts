import util from 'node:util'
import type Elysia from 'elysia'

export default (elysia: Elysia) =>
  elysia
    .onStart(({ server }) => {
      const host = util.styleText('blue', `${server?.hostname}:${server?.port}`)
      console.info('🚀', 'App is running at', host)
    })
    .onError(({ code, request: { method, url } }) => {
      console.error('💥', method, url, code)
    })
    .onRequest(({ request: { method, url } }) => {
      console.info('🚀', method, util.styleText('blue', url))
    })
