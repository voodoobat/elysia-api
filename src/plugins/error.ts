import { Prisma } from '@/db/generated'
import type Elysia from 'elysia'
import PRISMA_ERRORS from '@/lib/errors/prisma'

export default (elysia: Elysia) =>
  elysia.onError(({ error, set }) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const errorData = PRISMA_ERRORS[error.code] ?? {
        status: 500,
        message: 'Internal Server Error',
      }

      set.status = errorData.status
      return errorData
    }

    if (error instanceof Error) {
      return {
        ...error,
      }
    }
  })
