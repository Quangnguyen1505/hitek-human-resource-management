import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

interface TokenPayload {
  userId: Types.ObjectId
  username: string
}

interface TokenPair {
  accessToken: string
  refreshToken: string
}

const createTokenPair = async (payload: TokenPayload, publicKey: string, privateKey: string): Promise<TokenPair> => {
  try {
    const accessToken = jwt.sign(payload, publicKey, {
      expiresIn: '2d' // 2 days
    })

    const refreshToken = jwt.sign(payload, privateKey, {
      expiresIn: '7d' // 7 days
    })

    jwt.verify(accessToken, publicKey, (err, decoded) => {
      if (err) {
        console.error('AccessToken verification error:', err)
      } else {
        console.log('AccessToken verified successfully:', decoded)
      }
    })

    return { accessToken, refreshToken }
  } catch (error) {
    console.error('Error creating token pair:', error)
    throw new Error('Failed to generate tokens')
  }
}

export default createTokenPair
