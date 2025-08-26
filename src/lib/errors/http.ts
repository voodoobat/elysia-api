export class ForbiddenError extends Error {
  code = 'FORBIDDEN'
  status = 403
}

export class UnauthorizedError extends Error {
  code = 'UNAUTHORIZED'
  status = 401
}
