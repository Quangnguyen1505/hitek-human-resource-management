import keyTokenModel from '~/models/token.model'
import { IKeyTokenInput } from './key-token.type'

class KeyTokenServices {
  static async createKeyToken({ userId, publicKey, privateKey, refreshToken }: IKeyTokenInput): Promise<string | null> {
    try {
      const filter = { user: userId }
      const update = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken
      }
      const options = { upsert: true, new: true }

      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)
      return tokens ? tokens.publicKey : null
    } catch (error) {
      console.error('Error in createKeyToken:', error)
      throw new Error('Failed to create key token')
    }
  }
}

export default KeyTokenServices
