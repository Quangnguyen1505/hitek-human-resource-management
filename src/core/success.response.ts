export const StatusCode = {
  OK: 200,
  CREATED: 201
} as const

export const ReasonStatusCode = {
  CREATED: 'Created!!',
  OK: 'Success!!'
} as const

interface SuccessResponseParams {
  message?: string
  statusCode?: number
  reasonStatusCode?: string
  metadata?: Record<string, any>
}

export class SuccessResponse {
  public message: string
  public status: number
  public metadata: Record<string, any>

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {}
  }: SuccessResponseParams) {
    this.message = message ?? reasonStatusCode
    this.status = statusCode
    this.metadata = metadata
  }

  send(res: any, header: Record<string, any> = {}): any {
    return res.status(this.status).json(this)
  }
}

export class OK extends SuccessResponse {
  constructor({ message, metadata }: SuccessResponseParams) {
    super({ message, metadata })
  }
}

interface CreateParams extends SuccessResponseParams {
  options?: Record<string, any>
}

export class CREATE extends SuccessResponse {
  public options: Record<string, any>

  constructor({
    options = {},
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata
  }: CreateParams) {
    super({ message, statusCode, reasonStatusCode, metadata })
    this.options = options
  }
}
