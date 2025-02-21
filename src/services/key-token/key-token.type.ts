import { Types } from 'mongoose'

export interface IKeyTokenInput {
  userId: Types.ObjectId
  publicKey: string
  privateKey: string
  refreshToken?: string
}
