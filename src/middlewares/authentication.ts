import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'
import { AuthFailureError, NotFoundError } from '~/core/error.response'
import { IKeyToken } from '~/models/token.model'
import { findByUserId } from '~/repository/token.repository'
import asyncHandler from '~/utils/asyncHandle'

const HEADER = {
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESHTOKEN: 'x-rtoken-id'
}

interface DecodedUser {
  userId: string
  username: string
  iat: number
  exp: number
}

interface AuthRequest extends Request {
  keyStore?: IKeyToken
  user?: DecodedUser
  refreshToken?: string
}

const authencation = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.headers[HEADER.CLIENT_ID] as string
  if (!userId) throw new AuthFailureError('Invalid Request')

  const keyStore = await findByUserId(userId)
  if (!keyStore) throw new NotFoundError('Not Found keyStore')

  const refreshToken = req.headers[HEADER.REFRESHTOKEN] as string
  if (refreshToken) {
    const decodeUser = JWT.verify(refreshToken, keyStore.privateKey) as DecodedUser

    if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid UserId')

    req.keyStore = keyStore
    req.user = decodeUser
    req.refreshToken = refreshToken
    return next()
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION] as string
  if (!accessToken) throw new AuthFailureError('Invalid Request')

  const decodeUser = JWT.verify(accessToken, keyStore.publicKey) as DecodedUser

  if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid UserId')

  req.keyStore = keyStore
  req.user = decodeUser
  return next()
})

export default authencation
export { AuthRequest }
