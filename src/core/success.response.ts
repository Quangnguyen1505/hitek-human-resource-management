import { Response } from 'express'

export const StatusCode = {
  OK: 200,
  CREATED: 201
} as const

export const ReasonStatusCode = {
  CREATED: 'Created!!',
  OK: 'Success!!'
} as const

interface SuccessResponseParams<T = unknown> {
  message?: string
  statusCode?: (typeof StatusCode)[keyof typeof StatusCode]
  reasonStatusCode?: (typeof ReasonStatusCode)[keyof typeof ReasonStatusCode]
  metadata?: T | null
}

export class SuccessResponse<T = unknown> {
  public message: string
  public status: number
  public metadata: T

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {} as T
  }: SuccessResponseParams<T>) {
    this.message = message ?? reasonStatusCode
    this.status = statusCode
    this.metadata = metadata ?? ({} as T)
  }

  send(res: Response, header: Record<string, string> = {}): Response {
    Object.entries(header).forEach(([key, value]) => res.setHeader(key, value))
    return res.status(this.status).json(this)
  }
}

export class OK<T = unknown> extends SuccessResponse<T> {
  constructor({ message, metadata }: SuccessResponseParams<T>) {
    super({ message, metadata })
  }
}

interface CreateParams<T = unknown, O = Record<string, unknown>> extends SuccessResponseParams<T> {
  options?: O
}

export class CREATE<T = unknown, O = Record<string, unknown>> extends SuccessResponse<T> {
  public options: O

  constructor({
    options = {} as O,
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata
  }: CreateParams<T, O>) {
    super({ message, statusCode, reasonStatusCode, metadata })
    this.options = options
  }
}
