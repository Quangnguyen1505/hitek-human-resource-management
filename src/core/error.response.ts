import { ReasonPhrases, StatusCodes } from '../utils/httpStatusCode'

export const StatusCode = {
  FORBIDDEN: 404,
  CONFLICT: 409
} as const

export const ReasonStatusCode = {
  FORBIDDEN: 'Bad Request error',
  CONFLICT: 'Conflict error'
} as const

class ErrorResponse extends Error {
  public status: number
  public now: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.now = Date.now()
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(message: string = ReasonStatusCode.CONFLICT, statusCode: number = StatusCode.CONFLICT) {
    super(message, statusCode)
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(message: string = ReasonStatusCode.FORBIDDEN, statusCode: number = StatusCode.FORBIDDEN) {
    super(message, statusCode)
  }
}

export class AuthFailureError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED, statusCode: number = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode)
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.NOT_FOUND, statusCode: number = StatusCodes.NOT_FOUND) {
    super(message, statusCode)
  }
}

export class ForBiddenError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.FORBIDDEN, statusCode: number = StatusCodes.FORBIDDEN) {
    super(message, statusCode)
  }
}
