import { Schema, Document, model } from 'mongoose'

export interface IKeyToken extends Document {
  user: Schema.Types.ObjectId
  privateKey: string
  publicKey: string
  refreshTokensUsed: string[]
  refreshToken: string
}

const keyTokenSchema = new Schema<IKeyToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Shop'
    },
    privateKey: {
      type: String,
      required: true
    },
    publicKey: {
      type: String,
      required: true
    },
    refreshTokensUsed: {
      type: [String],
      default: []
    },
    refreshToken: {
      type: String,
      required: true
    }
  },
  {
    collection: 'keys',
    timestamps: true
  }
)

export default model<IKeyToken>('key', keyTokenSchema)
