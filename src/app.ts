import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
import '~/db/init.mongo'
import routes from '~/routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

interface CustomError extends Error {
  status?: number
  now?: number
}

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error('Not Found')
  error.status = 404
  error.now = Date.now()
  next(error)
})

const errorHandler: ErrorRequestHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 500

  res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    message: error.message || 'Internal Server Error'
  })
}

app.use(errorHandler)

export default app
